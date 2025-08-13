"use client";
import { useState } from "react";

export default function ShareButton({ text, disabled = false, children = "Share", className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback - show alert with text
      alert(`Copy this text: ${text}`);
    }
  };

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