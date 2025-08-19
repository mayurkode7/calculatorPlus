'use client';
import Link from "next/link";
import { useState } from "react";
import Footer from "./components/Footer";

export default function Home() {
  const [query, setQuery] = useState("");
  const upiLink = "upi://pay?pa=mayurkode@icici&pn=Calculator%20Plus&cu=INR";

  const tools = [
    { href: "/percentage", label: "Percentage" },
    { href: "/basic-calculator", label: "Basic Calculator" },
  ];

  const filteredTools = tools.filter((tool) =>
    tool.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20 flex flex-col items-center">
      <main className="flex flex-col gap-[20px] items-center sm:items-start">
        <h1 className="text-4xl font-bold">Calculator Plus</h1>
        <p className="text-lg">
          Set of useful tools for everyday calculations.
        </p>
        <a
          href={upiLink}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 text-sm md:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7.5 7.5 12 3l4.5 4.5M12 3v13.5" />
          </svg>
          Support us
        </a>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter tools..."
          className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col gap-[8px]">
          {filteredTools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="text-blue-600 hover:underline">
              {tool.label}
            </Link>
          ))}
          {filteredTools.length === 0 && (
            <p className="text-gray-500 text-sm">No tools found.</p>
          )}
        </div>
        
      </main>
      <div className="mt-auto w-full flex justify-center">
        <Footer />  
      </div>
    </div>
  );
}
