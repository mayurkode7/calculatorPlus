'use client';
import Link from "next/link";
import { useState } from "react";
import Footer from "./components/Footer";

export default function Home() {
  const [query, setQuery] = useState("");

  const tools = [
    { href: "/about", label: "About" },
    { href: "/percentage", label: "Percentage" },
  ];

  const filteredTools = tools.filter((tool) =>
    tool.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[20px] items-center sm:items-start">
        <h1 className="text-4xl font-bold">Simplified Tools</h1>
        <p className="text-lg">
          Set of useful tools for everyday use.
        </p>
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
      <Footer />
    </div>
  );
}
