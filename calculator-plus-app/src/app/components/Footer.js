import Link from "next/link";

export default function Footer() {
  return (
    <footer className="row-start-3 flex flex-col gap-2 items-center justify-center text-sm text-gray-600">
      <p className="flex items-center gap-1">© {new Date().getFullYear()} Calculator Plus. Made with ❤️ in 🇮🇳</p>
      <div className="flex items-center gap-2">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <span aria-hidden className="text-gray-400">•</span>
        <Link href="/about" className="text-blue-600 hover:underline">About</Link>
        <span aria-hidden className="text-gray-400">•</span>
        <a
          href="upi://pay?pa=mayurkode@icici&pn=Mayur%20Kode"
          className="text-blue-600 hover:underline"
        >
          Support
        </a>
      </div>
    </footer>
  );
}