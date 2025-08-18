import Link from "next/link";

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-600">
      <p>© {new Date().getFullYear()} Simplified Tools. All rights reserved.</p>
      <Link href="/" className="text-blue-600 hover:underline">Home</Link>
    </footer>
  );
} 