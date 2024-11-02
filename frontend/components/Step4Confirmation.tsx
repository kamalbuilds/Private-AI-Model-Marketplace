import { useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ModelNFTAbi } from '../../constants/abis';
import { ethers } from 'ethers';

interface ConfirmationProps {
  modelData: {
    name: string;
    description: string;
    modelType: string;
    framework: string;
    price: string;
    ipfsHash: string;
    encryptedKey: string;
  };
  onBack: () => void;
  onComplete: () => void;
}

export default function Step4Confirmation({ modelData, onBack, onComplete }: ConfirmationProps) {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_MODEL_NFT_ADDRESS as `0x${string}`,
    abi: ModelNFTAbi,
    functionName: 'mintModel',
    args: [
      modelData.name,
      modelData.description,
      modelData.modelType,
      modelData.framework,
      ethers.utils.parseEther(modelData.price),
      ethers.utils.formatBytes32String(modelData.ipfsHash),
      ethers.utils.formatBytes32String(modelData.encryptedKey),
      ethers.utils.toUtf8Bytes("{}") // evaluation metrics
    ]
  });

  const { write, isLoading, isSuccess } = useContractWrite(config);

  useEffect(() => {
    if (isSuccess) {
      onComplete();
    }
  }, [isSuccess]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Confirmation</h2>
        <p className="text-gray-600">Review your model details before minting</p>
      </div>

      <div className="border rounded-lg p-6 mb-6">
        <div className="space-y-4">
          <div>
            <div className="font-semibold">Model Name</div>
            <div>{modelData.name}</div>
          </div>
          <div>
            <div className="font-semibold">Description</div>
            <div>{modelData.description}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-semibold">Type</div>
              <div>{modelData.modelType}</div>
            </div>
            <div>
              <div className="font-semibold">Framework</div>
              <div>{modelData.framework}</div>
            </div>
          </div>
          <div>
            <div className="font-semibold">Price</div>
            <div>{modelData.price} ROSE</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => write?.()}
          disabled={isLoading || !write}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Confirming...' : 'Confirm & Mint'}
        </button>
      </div>
    </div>
  );
}