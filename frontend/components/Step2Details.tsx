import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ModelDetails {
  name: string;
  description: string;
  modelType: string;
  framework: string;
  price: string;
}

export default function Step2Details({ 
  onNext, 
  onBack,
  onDataSubmit 
}: { 
  onNext: () => void;
  onBack: () => void;
  onDataSubmit: (data: ModelDetails) => void;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<ModelDetails>();

  const onSubmit = (data: ModelDetails) => {
    onDataSubmit(data);
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Model Details</h2>
        <p className="text-gray-600">Enter information about your AI model</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Model Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full p-2 border rounded"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Model Type</label>
            <select
              {...register("modelType")}
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
              {...register("framework")}
              className="w-full p-2 border rounded"
            >
              <option value="pytorch">PyTorch</option>
              <option value="tensorflow">TensorFlow</option>
              <option value="jax">JAX</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (ROSE)</label>
          <input
            type="number"
            step="0.001"
            {...register("price", { required: "Price is required" })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}