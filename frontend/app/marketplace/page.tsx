import { useState, useEffect } from 'react';
import { useContract, useProvider } from 'wagmi';
import { ModelNFTAbi } from '../../constants/abis';
import ModelCard from '@/components/ModelCard';
import { ethers } from 'ethers';

interface Model {
  tokenId: number;
  name: string;
  description: string;
  modelType: string;
  framework: string;
  price: string;
  image?: string;
}

export default function Marketplace() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const provider = useProvider();

  const contract = useContract({
    address: process.env.NEXT_PUBLIC_MODEL_NFT_ADDRESS as `0x${string}`,
    abi: ModelNFTAbi,
    signerOrProvider: provider,
  });

  const loadModels = async () => {
    try {
      const totalSupply = await contract?.totalSupply();
      const modelPromises = [];

      for (let i = 1; i <= totalSupply.toNumber(); i++) {
        modelPromises.push(contract?.getModel(i));
      }

      const modelData = await Promise.all(modelPromises);
      const formattedModels = modelData.map((data, index) => ({
        tokenId: index + 1,
        name: data.name,
        description: data.description,
        modelType: data.modelType,
        framework: data.framework,
        price: ethers.utils.formatEther(data.price),
        image: data.image || '/default-model-image.png'
      }));

      setModels(formattedModels);
    } catch (error) {
      console.error('Error loading models:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadModels();
  }, [contract]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Model Marketplace</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <ModelCard
            key={model.tokenId}
            {...model}
            onPurchaseSuccess={loadModels}
          />
        ))}
      </div>
    </div>
  );
}