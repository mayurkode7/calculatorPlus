"use client";
import { useState } from "react";
import CalculateButton from "../../components/CalculateButton";

export default function Percentage() {
  const [formData, setFormData] = useState({
    fromValue: "",
    toValue: "",
    result: ""
  });

  const handleCalculate = (e) => {
    e.preventDefault();
    if (formData.fromValue && formData.toValue) {
      const from = parseFloat(formData.fromValue);
      const to = parseFloat(formData.toValue);
      const percentage = ((to - from) / from) * 100;
      setFormData(prev => ({
        ...prev,
        result: `${percentage.toFixed(2)}%`
      }));
    }
  };

  return(
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Percentage</h1>
      <p className="text-lg">
        This page offers simple percentage tools to help you quickly calculate discounts, increases, and proportions.
      </p>
      
      <form className="mt-8 space-y-4" onSubmit={handleCalculate}>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <input
              type="number"
              id="from"
              name="from"
              value={formData.fromValue}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                fromValue: e.target.value
              }))}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              type="number"
              id="to"
              name="to"
              value={formData.toValue}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                toValue: e.target.value
              }))}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>
        <CalculateButton onClick={handleCalculate} disabled={!formData.fromValue || !formData.toValue}>
          Calculate
        </CalculateButton>
      </form>
      
      {formData.result && (
        <div className="mt-6 p-6 bg-green-100 border border-green-300 rounded-md">
          <p className="text-lg font-semibold text-green-800">
            The percentage change from {formData.fromValue} to {formData.toValue} is: {formData.result}
          </p>
        </div>
      )}
    </div>
  );
}