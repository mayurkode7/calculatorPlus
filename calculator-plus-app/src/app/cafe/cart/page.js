'use client';
import Footer from "../../components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CafeCart() {
  const upiLink = "upi://pay?pa=mayurkode@icici&pn=Mayur%20Kode";
  const [cart, setCart] = useState([]); // [{ name, price, qty }]
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('cafeCart') : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (_) {}
    setDidLoad(true);
  }, []);

  useEffect(() => {
    if (!didLoad) return;
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cafeCart', JSON.stringify(cart));
      }
    } catch (_) {}
  }, [cart, didLoad]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'cafeCart') {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : [];
          if (Array.isArray(parsed)) setCart(parsed);
        } catch (_) {}
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', onStorage);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', onStorage);
      }
    };
  }, []);

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

  const removeItem = (name) => {
    setCart((prev) => prev.filter((x) => x.name !== name));
  };

  const clearCart = () => {
    setCart([]);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('cafeCart');
      }
    } catch (_) {}
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="font-sans min-h-screen p-6 flex flex-col">
      <main className="flex flex-col gap-[16px] w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Cart</h1>
          <Link href="/cafe" className="text-blue-600 hover:underline text-sm">Back to Cafe</Link>
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              {cart.map((ci) => (
                <li key={ci.name} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800">{ci.name}</span>
                    <span className="text-gray-500 text-sm">₹{ci.price} × {ci.qty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-7 w-7 rounded border border-gray-300 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
                      aria-label={`Decrease ${ci.name}`}
                      onClick={() => decrement(ci.name)}
                    >
                      −
                    </button>
                    <span className="min-w-[1.5rem] text-center">{ci.qty}</span>
                    <button
                      type="button"
                      className="h-7 w-7 rounded border border-gray-300 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
                      aria-label={`Increase ${ci.name}`}
                      onClick={() => increment(ci.name)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="h-7 w-7 inline-flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 hover:text-red-700 hover:bg-red-50 focus:outline-none"
                      aria-label={`Remove ${ci.name} from cart`}
                      title="Remove"
                      onClick={() => removeItem(ci.name)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 7h12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-7 0l1 12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2l1-12" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between mt-3">
              <span className="font-medium">Items</span>
              <span className="font-semibold">{cartCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-semibold">₹{cartTotal}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                onClick={clearCart}
                className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Clear cart
              </button>
              <a
                href={upiLink}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Checkout
              </a>
            </div>
          </>
        )}
      </main>
      <div className="mt-auto">
        <Footer text={"© " + new Date().getFullYear() + " Cafe.Inc. Cooked with ❤️ in 🇮🇳"} showHome={false} showAbout={false} />
      </div>
    </div>
  );
}
