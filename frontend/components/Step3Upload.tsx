'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { NFTStorage } from 'nft.storage';
import { useContract, useSigner } from 'wagmi';

interface UploadProps {
  onNext: () => void;
  onBack: () => void;
  onUploadComplete: (ipfsHash: string, encryptedKey: string) => void;
}

export default function Step3Upload({ onNext, onBack, onUploadComplete }: UploadProps) {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { data: signer } = useSigner();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;
    
    setLoading(true);
    try {
      const modelFile = acceptedFiles[0];
      
      // 1. Generate encryption key using Sapphire
      const response = await fetch('/api/generate-encryption-key');
      const { symmetricKey } = await response.json();
      
      // 2. Encrypt model file
      const encryptedData = await encryptFile(modelFile, symmetricKey);
      
      // 3. Upload to IPFS
      const nftStorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY! });
      const cid = await nftStorage.storeBlob(new Blob([encryptedData]));
      
      onUploadComplete(cid, symmetricKey);
      onNext();
    } catch (error) {
      console.error('Upload error:', error);
    }
    setLoading(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/x-python': ['.pkl', '.pt', '.pth', '.h5'],
    }
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Upload Model</h2>
        <p className="text-gray-600">Upload your AI model file (supported formats: .pkl, .pt, .pth, .h5)</p>
      </div>

      <div 
        {...getRootProps()} 
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500"
      >
        <input {...getInputProps()} />
        {loading ? (
          <div>
            <div className="mb-2">Uploading... {uploadProgress}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <p>Drag and drop your model file here, or click to select file</p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
}