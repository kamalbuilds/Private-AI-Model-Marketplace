import { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';

interface ModelUploadProps {
  contractAddress: string;
  onSuccess?: () => void;
}

export default function ModelUpload({ contractAddress, onSuccess }: ModelUploadProps) {
  const { data: signer } = useSigner();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    modelType: 'classification',
    framework: 'pytorch',
    price: '',
    modelFile: null as File | null,
    sampleData: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer) return;

    setLoading(true);
    try {
      // Upload to IPFS logic here
      // Mint NFT logic here
      onSuccess?.();
    } catch (error) {
      console.error('Upload error:', error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">Model Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Model Type</label>
          <select
            value={formData.modelType}
            onChange={(e) => setFormData({ ...formData, modelType: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="classification">Classification</option>
            <option value="nlp">NLP</option>
            <option value="vision">Computer Vision</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Framework</label>
          <select
            value={formData.framework}
            onChange={(e) => setFormData({ ...formData, framework: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="pytorch">PyTorch</option>
            <option value="tensorflow">TensorFlow</option>
            <option value="jax">JAX</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price (ETH)</label>
        <input
          type="number"
          step="0.001"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Uploading...' : 'Upload Model'}
      </button>
    </form>
  );
}