"use client";
import { useState } from "react";
import CalculateButton from "../../components/CalculateButton";
import ClearButton from "../../components/ClearButton";
import ShareButton from "../../components/ShareButton";

export default function Percentage() {
  const [formData, setFormData] = useState({
    fromValue: "",
    toValue: "",
    result: "",
  });

  const handleCalculate = (e) => {
    e.preventDefault();
    if (formData.fromValue && formData.toValue) {
      const from = parseFloat(formData.fromValue);
      const to = parseFloat(formData.toValue);
      const percentage = ((to - from) / from) * 100;
      setFormData((prev) => ({
        ...prev,
        result: `${percentage.toFixed(2)}%`,
      }));
    }
  };

  const handleClear = () => {
    setFormData({
      fromValue: "",
      toValue: "",
      result: "",
    });
  };

  return (
    <div className="flex flex-col items-center  min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-left mb-2">Percentage</h1>
        <p className="text-base md:text-lg text-gray-600 mb-4 text-left">
          Calculate percentage increase or decrease between two values
        </p>
      </div>

      <form className="w-full max-w-md" onSubmit={handleCalculate}>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter two values to calculate the percentage change between them
        </p>

        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                From
              </label>
              <input
                type="number"
                id="from"
                name="from"
                value={formData.fromValue}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fromValue: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                To
              </label>
              <input
                type="number"
                id="to"
                name="to"
                value={formData.toValue}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    toValue: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <CalculateButton
              onClick={handleCalculate}
              disabled={!formData.fromValue || !formData.toValue}
            >
              Calculate
            </CalculateButton>
            <ClearButton
              onClick={handleClear}
              disabled={
                !formData.fromValue && !formData.toValue && !formData.result
              }
            >
              Clear
            </ClearButton>
          </div>
        </div>
      </form>

      {formData.result && (
        <div className="w-full max-w-md mt-6 p-4 md:p-6 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-base md:text-lg text-green-800 text-center mb-4">
            The percentage change from {formData.fromValue} to{" "}
            {formData.toValue} is: <span className="font-bold text-xl">{formData.result}</span>
          </p>
          <div className="flex justify-center">
            <ShareButton
              text={`🔣 Calculator Plus Result\n\nPercentage change from ${formData.fromValue} to ${formData.toValue} is: ${formData.result}\n\nCalculated using Calculator Plus App developed by Mayur Kode.`}
              disabled={false}
            >
              Share Result
            </ShareButton>
          </div>
        </div>
      )}

      


    </div>
  );
}
