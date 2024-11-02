import { useState, useEffect } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const NETWORKS = {
  sapphire_testnet: {
    id: "0x5aff",
    name: "Sapphire Testnet",
    logo: "/networks/sapphire.svg",
    currency: "ROSE"
  }
};

export default function Step1Network({ onNext }: { onNext: () => void }) {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(chain?.id === parseInt(NETWORKS.sapphire_testnet.id));
  }, [chain]);

  const handleNetworkSwitch = async () => {
    await switchNetwork?.(parseInt(NETWORKS.sapphire_testnet.id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Network Selection</h2>
        <p className="text-gray-600">Select the network for your AI model deployment</p>
      </div>

      <div className="border rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <img 
            src={NETWORKS.sapphire_testnet.logo} 
            alt={NETWORKS.sapphire_testnet.name}
            className="w-8 h-8"
          />
          <div>
            <div className="font-semibold">{NETWORKS.sapphire_testnet.name}</div>
            <div className="text-sm text-gray-500">Privacy-Preserving Network</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        {chain?.id !== parseInt(NETWORKS.sapphire_testnet.id) ? (
          <button
            onClick={handleNetworkSwitch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Switch Network
          </button>
        ) : (
          <button
            onClick={onNext}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}