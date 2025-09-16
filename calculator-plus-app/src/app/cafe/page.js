'use client';
import Footer from "../components/Footer";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Cafe() {
  const upiLink = "upi://pay?pa=mayurkode@icici&pn=Mayur%20Kode";
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]); // [{ name, price, qty }]
  const [toastMessage, setToastMessage] = useState("");
  const toastRef = useRef(null);
  const [toastPos, setToastPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('cafeCart') : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (_) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cafeCart', JSON.stringify(cart));
      }
    } catch (_) {
      // ignore
    }
  }, [cart]);

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

  const getEmoji = (name) => {
    const n = name.toLowerCase();
    if (n.includes("espresso") || n.includes("cappuccino") || n.includes("latte") || n.includes("coffee")) return "☕";
    if (n.includes("chai") || n.includes("tea")) return "🍵";
    if (n.includes("sandwich")) return "🥪";
    if (n.includes("cheese")) return "🧀";
    if (n.includes("fries")) return "🍟";
    if (n.includes("brownie") || n.includes("chocolate")) return "🍫";
    if (n.includes("muffin")) return "🧁";
    return "🍽️";
  };

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const showToast = (msg, anchorEl) => {
    if (anchorEl && anchorEl.getBoundingClientRect) {
      const rect = anchorEl.getBoundingClientRect();
      setToastPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
    } else if (typeof window !== 'undefined') {
      setToastPos({ top: 24, left: window.innerWidth / 2 });
    }
    setToastMessage(msg);
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToastMessage(""), 1500);
  };

  const addToCart = (menuItem, anchorEl) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.name === menuItem.name);
      let next;
      if (idx !== -1) {
        next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
      } else {
        next = [...prev, { name: menuItem.name, price: menuItem.price, qty: 1 }];
      }
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('cafeCart', JSON.stringify(next));
        }
      } catch (_) {}
      return next;
    });
    showToast(`${menuItem.name} added to cart`, anchorEl);
  };

  const increment = (name) => {
    setCart((prev) => prev.map((x) => (x.name === name ? { ...x, qty: x.qty + 1 } : x)));
  };

  const decrement = (name) => {
    setCart((prev) => {
      const next = prev
        .map((x) => (x.name === name ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0);
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('cafeCart');
      }
    } catch (_) {
      // ignore
    }
  };

  const removeItem = (name) => {
    setCart((prev) => prev.filter((x) => x.name !== name));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="font-sans min-h-screen p-6 flex flex-col">
      <main className="flex flex-col gap-[16px] w-full max-w-sm mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-bold text-center">Cafe</h1>
          {cartCount > 0 && (
            <span
              aria-label={`${cartCount} items in cart`}
              className="inline-flex items-center justify-center text-xs font-semibold bg-blue-600 text-white rounded-full h-5 min-w-[1.25rem] px-2"
            >
              {cartCount}
            </span>
          )}
          <Link href="/cafe/cart" className="ml-2 text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            View cart
          </Link>
        </div>
        
        <p className="text-base text-gray-700 text-center">From fiery Chinese stir-fries to soulful coastal Konkani classics, our cafe serves bold flavors with homely warmth — perfect with a hot brew.</p>
        
        <section className="mt-2 w-full">
          <h2 className="text-2xl font-semibold mb-2">Menu</h2>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search menu..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          />
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            {filteredItems.length === 0 ? (
              <li className="list-none text-gray-500">No items found.</li>
            ) : (
              filteredItems.map((item) => (
                <li key={item.name} className="flex items-center justify-between pr-2">
                  <span><span className="mr-2" aria-hidden>{getEmoji(item.name)}</span>{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">₹{item.price}</span>
                    <button
                      type="button"
                      className="h-7 w-7 inline-flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Add ${item.name} to cart`}
                      title="Add to cart"
                      onClick={(e) => addToCart(item, e.currentTarget)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13l-1.2 6H19M7 13l-3-8" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 17.5h4M12 15.5v4" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))
            )}  
          </ul>
        </section>

        {/* Cart content moved to /cafe/cart page */}
        
      </main>
      {toastMessage && (
        <div role="status" aria-live="polite" className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-3 py-2 rounded shadow animate-in fade-in duration-200">
          {toastMessage}
        </div>
      )}
      {cartCount > 0 && (
        <Link
          href="/cafe/cart"
          className="fixed md:hidden bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-4 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="View cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13l-1.2 6H19M7 13l-3-8" />
          </svg>
          <span className="text-sm font-semibold">Cart</span>
          <span className="ml-1 inline-flex items-center justify-center text-xs font-semibold bg-white text-blue-700 rounded-full h-5 min-w-[1.25rem] px-1">{cartCount}</span>
        </Link>
      )}
      <div className="mt-auto">
        <Footer text={"© " + new Date().getFullYear() + " Cafe.Inc. Cooked with ❤️ in 🇮🇳"}
          showHome={false}
          showAbout={false}          
        />
      </div>
    </div>
  );
} 