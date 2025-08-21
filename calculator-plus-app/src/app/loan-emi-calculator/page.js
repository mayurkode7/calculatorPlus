"use client";
import { useState } from "react";
import ShareButton from "@/components/ShareButton";

function calculateEMI(principal, annualRate, months) {
  const r = annualRate / 12 / 100;
  if (r === 0) return (principal / months).toFixed(2);
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return emi.toFixed(2);
}

function formatIndianNumber(num) {
  const [integer, fraction] = String(num).split(".");
  let lastThree = integer.slice(-3);
  let otherNumbers = integer.slice(0, -3);
  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }
  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    lastThree +
    (fraction ? "." + fraction : "");
  return formatted;
}

export default function LoanEMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [emi, setEmi] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    if (
      !principal ||
      !rate ||
      !months ||
      isNaN(principal) ||
      isNaN(rate) ||
      isNaN(months) ||
      principal <= 0 ||
      rate < 0 ||
      months <= 0
    ) {
      setError("Please enter valid positive numbers for all fields.");
      setEmi(null);
      return;
    }
    setError("");
    setEmi(calculateEMI(parseFloat(principal), parseFloat(rate), parseInt(months)));
  };

  const handleClear = () => {
    setPrincipal("");
    setRate("");
    setMonths("");
    setEmi(null);
    setError("");
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <div className="flex flex-col items-center pt-10">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">Loan EMI Calculator</h1>
        <p className="text-gray-500 text-center mb-10">Calculate your monthly loan EMI easily.</p>
        <div className="flex flex-col gap-4 w-full max-w-md px-2">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Principal Amount</label>
            <input
              type="text"
              value={principal ? formatIndianNumber(principal.replace(/,/g, "")) : ""}
              onChange={e => {
                // Remove commas before storing
                const raw = e.target.value.replace(/[^0-9.]/g, "");
                setPrincipal(raw);
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 100000"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Annual Interest Rate (%)</label>
            <input
              type="text"
              value={rate}
              onChange={e => setRate(e.target.value.replace(/[^0-9.]/g, ""))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 8.5"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Loan Tenure (months)</label>
            <input
              type="text"
              value={months}
              onChange={e => setMonths(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 60"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleCalculate}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Calculate
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Clear
            </button>
          </div>
          {emi !== null && !error && (
            <div className="mt-2 text-lg text-green-700 text-center flex items-center justify-center gap-2">
              EMI: <span className="font-bold">₹{formatIndianNumber(emi)} / month</span>
              <span className="scale-70">
                <ShareButton
                  text={
                    `Loan EMI is ₹${formatIndianNumber(emi)} per month for a principal of ₹${formatIndianNumber(principal)} at ${rate}% annual interest for ${months} months.\n\nCalculated using Calculator Plus App developed by Mayur Kode.\n\nVisit: https://calculator-plus-coral.vercel.app/`
                  }
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}