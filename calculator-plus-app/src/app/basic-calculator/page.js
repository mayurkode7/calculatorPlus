'use client';
import Footer from "../components/Footer";
import { useState, useRef, useEffect } from "react";

export default function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [pendingOperator, setPendingOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [expressionParts, setExpressionParts] = useState([]);
  const [expressionText, setExpressionText] = useState("");
  const [lastActionWasEquals, setLastActionWasEquals] = useState(false);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toastItemIndex, setToastItemIndex] = useState(null);

  const showToast = (message, itemIndex) => {
    setToastMessage(message);
    setToastItemIndex(itemIndex);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      setToastItemIndex(null);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

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
    if (lastActionWasEquals) {
      setExpressionParts([]);
      setExpressionText("");
      setLastActionWasEquals(false);
      setPreviousValue(null);
      setPendingOperator(null);
    }
    if (waitingForNewValue) {
      setDisplayValue(digit);
      setWaitingForNewValue(false);
      return;
    }
    setDisplayValue((prev) => (prev === "0" ? digit : prev + digit));
  };

  const inputDecimal = () => {
    if (lastActionWasEquals) {
      setExpressionParts([]);
      setExpressionText("");
      setLastActionWasEquals(false);
      setPreviousValue(null);
      setPendingOperator(null);
    }
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
    setExpressionParts([]);
    setExpressionText("");
    setLastActionWasEquals(false);
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

    if (lastActionWasEquals) {
      setExpressionParts([displayValue, symbol]);
      setExpressionText("");
      setLastActionWasEquals(false);
    } else if (waitingForNewValue) {
      setExpressionParts((prev) => (prev.length > 0 ? [...prev.slice(0, -1), symbol] : prev));
    } else if (previousValue === null) {
      setExpressionParts([displayValue, symbol]);
    } else if (pendingOperator) {
      setExpressionParts((prev) => [...prev, displayValue, symbol]);
    }

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

    const fullExpressionParts = [...expressionParts, displayValue];
    const fullExpressionStr = fullExpressionParts.join(" ");
    if (fullExpressionParts.length >= 3) {
      setExpressionText(fullExpressionStr + " =");
      setHistory((prev) => [
        { expression: fullExpressionStr, result: String(result) },
        ...prev,
      ]);
    } else {
      setExpressionText("");
    }

    setDisplayValue(String(result));
    setPreviousValue(null);
    setPendingOperator(null);
    setWaitingForNewValue(true);
    setExpressionParts([]);
    setLastActionWasEquals(true);
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

  const copyToClipboard = async (text, anchorEl, itemIndex) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showToast("Copied to clipboard", itemIndex);
    } catch (_) {
      // no-op
    }
  };

  const liveExpression = lastActionWasEquals
    ? expressionText
    : expressionParts.length > 0
    ? expressionParts.join(" ") + (!waitingForNewValue && pendingOperator ? " " + displayValue : "")
    : "";

  const clearHistory = () => {
    setHistory([]);
    showToast("History cleared");
  };

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 flex flex-col">
      <div className="flex items-center justify-end md:hidden mb-2">
        <button
          type="button"
          onClick={() => setIsHistoryOpen(true)}
          className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          History
        </button>
      </div>
      <main className="flex-1 w-full flex flex-col md:flex-row gap-6 md:gap-8">
        <section className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-black rounded-3xl p-4">
            <div className="text-right text-gray-400 text-sm pr-2 h-5 truncate">{liveExpression}</div>
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
        </section>
        <aside className="hidden md:block w-full md:w-80 lg:w-96">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-600">History</h2>
            <button
              type="button"
              onClick={clearHistory}
              disabled={history.length === 0}
              className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Clear
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden h-full">
            <ul className="divide-y divide-gray-200 max-h-full overflow-y-auto">
              {history.length === 0 ? (
                <li className="text-gray-400 p-3">No history yet.</li>
              ) : (
                history.map((item, index) => (
                  <li key={index} className="flex flex-col">
                    <div className="flex items-center justify-between gap-2 p-3">
                      <span className="text-gray-600 truncate">{item.expression} =</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-medium text-gray-900">{item.result}</span>
                        <button
                          type="button"
                          aria-label={`Copy ${item.expression} equals ${item.result}`}
                          title="Copy to clipboard"
                          className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={(e) => copyToClipboard(`${item.expression} = ${item.result}`, e.currentTarget, index)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1z" />
                            <path d="M8 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v12h12V7H8z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {toastItemIndex === index && toastMessage && (
                      <div className="px-3 pb-2">
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded animate-in fade-in slide-in-from-top-1 duration-200">
                          {toastMessage}
                        </div>
                      </div>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </aside>
      </main>
      <div
        className={`fixed inset-0 z-50 md:hidden ${isHistoryOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isHistoryOpen}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isHistoryOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsHistoryOpen(false)}
        ></div>
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ${isHistoryOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-3 border-b">
            <h2 className="text-sm font-medium text-gray-700">History</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={clearHistory}
                disabled={history.length === 0}
                className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsHistoryOpen(false)}
                aria-label="Close history"
                className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200 max-h-full overflow-y-auto">
              {history.length === 0 ? (
                <li className="text-gray-400 p-3">No history yet.</li>
              ) : (
                history.map((item, index) => (
                  <li key={index} className="flex flex-col">
                    <div className="flex items-center justify-between gap-2 p-3">
                      <span className="text-gray-600 truncate">{item.expression} =</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-medium text-gray-900">{item.result}</span>
                        <button
                          type="button"
                          aria-label={`Copy ${item.expression} equals ${item.result}`}
                          title="Copy to clipboard"
                          className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={(e) => copyToClipboard(`${item.expression} = ${item.result}`, e.currentTarget, index)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1z" />
                            <path d="M8 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v12h12V7H8z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {toastItemIndex === index && toastMessage && (
                      <div className="px-3 pb-2">
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded animate-in fade-in slide-in-from-top-1 duration-200">
                          {toastMessage}
                        </div>
                      </div>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
} 