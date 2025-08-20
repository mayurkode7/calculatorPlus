"use client";
import { useState } from "react";
import CalculateButton from "../../components/CalculateButton";
import ClearButton from "../../components/ClearButton";
import ShareButton from "../../components/ShareButton";
import Footer from "../components/Footer";

export default function Percentage() {
  const [formData, setFormData] = useState({
    fromValue: "",
    toValue: "",
    result: "",
  });
  const [history, setHistory] = useState([]);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (formData.fromValue && formData.toValue) {
      const from = parseFloat(formData.fromValue);
      const to = parseFloat(formData.toValue);
      const percentage = ((to - from) / from) * 100;
      const formatted = `${percentage.toFixed(2)}%`;
      setFormData((prev) => ({
        ...prev,
        result: formatted,
      }));
      setHistory((prev) => [
        { from, to, result: formatted },
        ...prev,
      ]);
    }
  };

  const handleClear = () => {
    setFormData({
      fromValue: "",
      toValue: "",
      result: "",
    });
  };

  const clearHistory = () => {
    if (history.length === 0) return;
    const ok = window.confirm("Clear all recent operations?");
    if (ok) setHistory([]);
  };

  return (
    <>
    <div className="flex flex-col items-center  min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-left mb-2">Percentage</h1>
        <p className="text-base md:text-lg text-gray-600 mb-4 text-left">
          Calculate percentage increase or decrease between two values
        </p>
      </div>

      <form className="w-full max-w-md" onSubmit={handleCalculate}>

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

      <div className="w-full max-w-md mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium text-gray-600">Recent operations</h2>
          <button
            type="button"
            onClick={clearHistory}
            disabled={history.length === 0}
            className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear operations
          </button>
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200 max-h-56 overflow-y-auto text-sm">
            {history.length === 0 ? (
              <li className="p-3 text-gray-400">No history yet.</li>
            ) : (
              history.map((item, idx) => (
                <li key={idx} className="p-3 flex items-center justify-between gap-2">
                  <span className="text-gray-600 truncate">{item.from} → {item.to}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-medium text-gray-900">{item.result}</span>
                    <ShareButton
                      text={`🔣 Calculator Plus Result\n\nPercentage change from ${item.from} to ${item.to} is: ${item.result}\n\nCalculated using Calculator Plus App developed by Mayur Kode.\n\nVisit: https://calculator-plus-coral.vercel.app/`}
                      disabled={false}
                      variant="icon"
                      ariaLabel={`Share result ${item.result} for ${item.from} to ${item.to}`}
                    />
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="mt-auto w-full flex justify-center">
        <Footer/>
      </div>

    
    </div>
    </>
  );
}
