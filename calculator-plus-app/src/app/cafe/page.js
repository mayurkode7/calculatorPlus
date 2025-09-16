'use client';
import Footer from "../components/Footer";
import { useState } from "react";

export default function Cafe() {
  const upiLink = "upi://pay?pa=mayurkode@icici&pn=Mayur%20Kode";
  const [query, setQuery] = useState("");

  const menuItems = [
    { name: "Espresso", price: 120 },
    { name: "Cappuccino", price: 160 },
    { name: "Latte", price: 180 },
    { name: "Masala Chai", price: 90 },
    { name: "Cold Coffee", price: 150 },
    { name: "Veg Sandwich", price: 140 },
    { name: "Grilled Cheese", price: 160 },
    { name: "French Fries", price: 130 },
    { name: "Chocolate Brownie", price: 110 },
    { name: "Blueberry Muffin", price: 100 },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="font-sans min-h-screen p-6 flex flex-col">
      <main className="flex flex-col gap-[16px] w-full max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-center">Cafe</h1>
        <p className="text-lg text-center">Calculator Plus is a simple, fast, and modern calculator built with Next.js.</p>
        
        <section className="mt-2 w-full">
          <h2 className="text-2xl font-semibold mb-2">Menu</h2>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search menu..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            {filteredItems.length === 0 ? (
              <li className="list-none text-gray-500">No items found.</li>
            ) : (
              filteredItems.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between pr-2">
                  <span>{item.name}</span>
                  <span className="text-gray-700">₹{item.price}</span>
                </li>
              ))
            )}
          </ul>
        </section>
        
      </main>
      <div className="mt-auto">
        <Footer showHome={false} showAbout={false} text={"© " + new Date().getFullYear() + " Cafe. Made with ❤️ in 🇮🇳"}  />
      </div>
    </div>
  );
} 