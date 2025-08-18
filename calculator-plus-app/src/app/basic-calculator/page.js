'use client';
import Footer from "../components/Footer";
import { useState } from "react";

export default function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [pendingOperator, setPendingOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const buttons = [
    { label: "AC", type: "function" },
    { label: "+/-", type: "function" },
    { label: "%", type: "function" },
    { label: "÷", type: "operator" },

    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "×", type: "operator" },

    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "−", type: "operator" },

    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },

    { label: "0", type: "number", colSpan: 2 },
    { label: ".", type: "number" },
    { label: "=", type: "operator" },
  ];

  const getButtonClasses = (button) => {
    const base = "flex items-center justify-center rounded-full text-2xl h-16 sm:h-20 hover:brightness-110 active:brightness-90 select-none";
    const tone =
      button.type === "operator"
        ? "bg-orange-500 text-white"
        : button.type === "function"
        ? "bg-gray-300 text-black"
        : "bg-gray-700 text-white"; // number

    if (button.colSpan === 2) {
      return `${base} ${tone} col-span-2 w-full justify-start px-6`;
    }

    return `${base} ${tone}`;
  };

  const performCalculation = (a, b, operator) => {
    if (operator === "+") return a + b;
    if (operator === "-") return a - b;
    if (operator === "*") return a * b;
    if (operator === "/") return b === 0 ? NaN : a / b;
    return b;
  };

  const mapSymbolToOperator = (symbol) => {
    if (symbol === "+") return "+";
    if (symbol === "−") return "-";
    if (symbol === "×") return "*";
    if (symbol === "÷") return "/";
    return null;
  };

  const inputDigit = (digit) => {
    if (waitingForNewValue) {
      setDisplayValue(digit);
      setWaitingForNewValue(false);
      return;
    }
    setDisplayValue((prev) => (prev === "0" ? digit : prev + digit));
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplayValue("0.");
      setWaitingForNewValue(false);
      return;
    }
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const clearAll = () => {
    setDisplayValue("0");
    setPreviousValue(null);
    setPendingOperator(null);
    setWaitingForNewValue(false);
  };

  const toggleSign = () => {
    if (displayValue === "0") return;
    if (displayValue.startsWith("-")) {
      setDisplayValue(displayValue.slice(1));
    } else {
      setDisplayValue("-" + displayValue);
    }
  };

  const inputPercent = () => {
    const current = parseFloat(displayValue);
    if (isNaN(current)) return;
    const next = current / 100;
    setDisplayValue(String(next));
  };

  const handleOperator = (symbol) => {
    const operator = mapSymbolToOperator(symbol);
    if (!operator) return;

    const currentValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (!waitingForNewValue && pendingOperator) {
      const result = performCalculation(previousValue, currentValue, pendingOperator);
      setPreviousValue(result);
      setDisplayValue(String(result));
    }

    setPendingOperator(operator);
    setWaitingForNewValue(true);
  };

  const handleEquals = () => {
    if (pendingOperator === null || previousValue === null || waitingForNewValue) {
      return;
    }
    const currentValue = parseFloat(displayValue);
    const result = performCalculation(previousValue, currentValue, pendingOperator);
    setDisplayValue(String(result));
    setPreviousValue(null);
    setPendingOperator(null);
    setWaitingForNewValue(true);
  };

  const handleButtonPress = (label, type) => {
    if (type === "number") {
      if (label === ".") {
        inputDecimal();
      } else {
        inputDigit(label);
      }
      return;
    }

    if (type === "function") {
      if (label === "AC") return clearAll();
      if (label === "+/-") return toggleSign();
      if (label === "%") return inputPercent();
      return;
    }

    if (type === "operator") {
      if (label === "=") return handleEquals();
      return handleOperator(label);
    }
  };

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 flex flex-col">
      <main className="w-full flex justify-center">
        <div className="w-full max-w-xs sm:max-w-sm bg-black rounded-3xl p-4">
          <div className="text-right text-white text-6xl font-light leading-none py-6 pr-2">{displayValue}</div>
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn) => (
              <button
                key={btn.label}
                type="button"
                aria-label={btn.label}
                className={getButtonClasses(btn)}
                onClick={() => handleButtonPress(btn.label, btn.type)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
} 