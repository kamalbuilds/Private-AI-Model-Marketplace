import { useState } from 'react';
import { useAtom } from 'jotai';
import { modelUploadAtom } from '@/app/store/modelUpload';
import Step1Network from '@/components/Step1Network';
import Step2Details from '@/components/Step2Details';
import Step3Upload from '@/components/Step3Upload';
import Step4Confirmation from '@/components/Step4Confirmation';

export default function ModelUpload() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedStep, setCompletedStep] = useState(0);
  const [modelData, setModelData] = useAtom(modelUploadAtom);

  const steps = [
    { number: 1, title: "Network Selection" },
    { number: 2, title: "Model Details" },
    { number: 3, title: "Upload Model" },
    { number: 4, title: "Confirmation" }
  ];

  const handleStepClick = (step: number) => {
    if (completedStep + 1 >= step) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    setCompletedStep(currentStep);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    // Reset form and redirect
    setModelData({});
    window.location.href = '/marketplace';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div 
              key={step.number}
              onClick={() => handleStepClick(step.number)}
              className={`
                cursor-pointer flex-1 text-center relative
                ${currentStep === step.number ? 'text-blue-600 font-bold' : ''}
                ${completedStep >= step.number ? 'text-green-600' : 'text-gray-500'}
              `}
            >
              <div className="mb-2">
                <span className={`
                  w-8 h-8 rounded-full inline-flex items-center justify-center
                  ${currentStep === step.number ? 'bg-blue-100 text-blue-600' : ''}
                  ${completedStep >= step.number ? 'bg-green-100 text-green-600' : 'bg-gray-100'}
                `}>
                  {step.number}
                </span>
              </div>
              <div className="text-sm">{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="transition-all duration-300">
        {currentStep === 1 && (
          <Step1Network onNext={handleNext} />
        )}

        {currentStep === 2 && (
          <Step2Details 
            onNext={handleNext}
            onBack={handleBack}
            onDataSubmit={(data) => setModelData({ ...modelData, ...data })}
          />
        )}

        {currentStep === 3 && (
          <Step3Upload 
            onNext={handleNext}
            onBack={handleBack}
            onUploadComplete={(ipfsHash, encryptedKey) => 
              setModelData({ ...modelData, ipfsHash, encryptedKey })}
          />
        )}

        {currentStep === 4 && (
          <Step4Confirmation
            modelData={modelData}
            onBack={handleBack}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  );
}