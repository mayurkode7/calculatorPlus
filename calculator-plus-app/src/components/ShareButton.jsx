"use client";
import { useState } from "react";

export default function ShareButton({ text, disabled = false, 
  children = "Share", className = "", 
  variant = "default", 
  ariaLabel = "Share" }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert(`Copy this text: ${text}`);
    }
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleShare}
        disabled={disabled}
        aria-label={ariaLabel}
        title={ariaLabel}
        className={`p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M10 15.172l9.192-9.193 1.415 1.415L10 18 3.879 11.879l1.415-1.415z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7.5 7.5 12 3l4.5 4.5M12 3v13.5" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={disabled}
      className={`bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {copied ? "Copied!" : children}
    </button>
  );
} 