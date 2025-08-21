"use client";
import { useState } from "react";
import ShareButton from "@/components/ShareButton";

function ShareButton2({ text }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };
  return (
    <button
      type="button"
      onClick={handleShare}
      className="ml-2 text-xs px-2 py-1 rounded border border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Share
    </button>
  );
}

export default function MileageCalculator() {
  const [distance, setDistance] = useState("");
  const [fuel, setFuel] = useState("");
  const [mileage, setMileage] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleDistanceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setDistance(value);
      setError("");
    } else {
      setError("Please enter only numeric values for distance.");
    }
  };

  const handleFuelChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFuel(value);
      setError("");
    } else {
      setError("Please enter only numeric values for fuel.");
    }
  };

  const calculateMileage = () => {
    if (!distance || !fuel || isNaN(distance) || isNaN(fuel) || fuel == 0) {
      setMileage(null);
      setError("Please enter valid numeric values for both fields.");
      return;
    }
    const result = (parseFloat(distance) / parseFloat(fuel)).toFixed(2);
    setMileage(result);
    setError("");
    setHistory([
      {
        distance,
        fuel,
        mileage: result,
        id: Date.now()
      },
      ...history
    ].slice(0, 5)); // restrict history to max 5 items
  };

  const clearAll = () => {
    setDistance("");
    setFuel("");
    setMileage(null);
    setError("");
  };

  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">Mileage Calculator</h1>
        <p className="text-gray-500 text-center mb-4">Calculate your vehicle's mileage easily.</p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Distance Travelled (km)</label>
            <input
              type="text"
              value={distance}
              onChange={handleDistanceChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 120"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Fuel Consumed (litres)</label>
            <input
              type="text"
              value={fuel}
              onChange={handleFuelChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 8"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <div className="flex gap-2 justify-center">
            <button
              onClick={calculateMileage}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Calculate
            </button>
            <button
              onClick={clearAll}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Clear
            </button>
          </div>
          {mileage !== null && !error && (
            <div className="mt-2 text-lg text-green-700 text-center">
              Mileage: <span className="font-bold">{mileage} km/l</span>
            </div>
          )}
        </div>
        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-md font-semibold mb-2 text-gray-700 text-center">Recent Operations (last 5)</h2>
            <ul className="space-y-2">
              {history.map((item) => (
                <li key={item.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <span className="text-gray-800 text-sm">
                    Distance: <b>{item.distance}</b> km, Fuel: <b>{item.fuel}</b> l, Mileage: <b>{item.mileage} km/l</b>
                  </span>
                  {/* <ShareButton
                    text={`Mileage Calculation:\nDistance: ${item.distance} km\nFuel: ${item.fuel} liters \nMileage: ${item.mileage} km/l\n\nCalculated using Calculator Plus App developed by Mayur Kode.\n\nVisit: https://calculator-plus-coral.vercel.app/`}
                  /> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}