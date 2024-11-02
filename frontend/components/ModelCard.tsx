import { useState } from 'react';
import Image from 'next/image';
import { ethers } from 'ethers';

interface ModelMetadata {
  name: string;
  description: string;
  modelType: string;
  framework: string;
  price: string;
  evaluationMetrics: string;
  image?: string;
}

interface ModelCardProps {
  tokenId: number;
  metadata: ModelMetadata;
  onPurchase?: (tokenId: number) => void;
}

export default function ModelCard({ tokenId, metadata, onPurchase }: ModelCardProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!onPurchase) return;
    setLoading(true);
    try {
      await onPurchase(tokenId);
    } catch (error) {
      console.error('Purchase error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      {metadata.image && (
        <div className="relative h-48 w-full mb-4">
          <Image
            src={metadata.image}
            alt={metadata.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{metadata.name}</h3>
      <p className="text-gray-600 mb-2">{metadata.description}</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <span className="font-semibold">Type:</span> {metadata.modelType}
        </div>
        <div>
          <span className="font-semibold">Framework:</span> {metadata.framework}
        </div>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Metrics:</span>
        <pre className="bg-gray-100 p-2 rounded mt-1 text-sm">
          {metadata.evaluationMetrics}
        </pre>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">
          {ethers.utils.formatEther(metadata.price)} ETH
        </div>
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Purchase'}
        </button>
      </div>
    </div>
  );
}