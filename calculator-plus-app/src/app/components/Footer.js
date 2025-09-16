import Link from "next/link";

export default function Footer({ showHome = true, showAbout = true, links = [], text }) {
  const hasAnyLinks = showHome || showAbout || (Array.isArray(links) && links.length > 0);
  const defaultText = `© ${new Date().getFullYear()} Calculator Plus. Made with ❤️ in 🇮🇳`;

  return (
    <footer className="row-start-3 flex flex-col gap-2 items-center justify-center text-sm text-gray-600">
      <p className="flex items-center gap-1">{text ?? defaultText}</p>
      {hasAnyLinks && (
        <div className="flex items-center gap-2">
          {showHome && (
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          )}
          {showHome && (showAbout || (links && links.length > 0)) && (
            <span aria-hidden className="text-gray-400">•</span>
          )}
          {showAbout && (
            <Link href="/about" className="text-blue-600 hover:underline">About</Link>
          )}
          {showAbout && links && links.length > 0 && (
            <span aria-hidden className="text-gray-400">•</span>
          )}
          {Array.isArray(links) && links.map((l, idx) => (
            <>
              <Link key={l.href} href={l.href} className="text-blue-600 hover:underline">{l.label}</Link>
              {idx < links.length - 1 && (
                <span aria-hidden className="text-gray-400">•</span>
              )}
            </>
          ))}
        </div>
      )}
    </footer>
  );
}