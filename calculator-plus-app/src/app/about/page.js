import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="font-sans min-h-screen p-8 sm:p-20">
      <main className="flex flex-col gap-[16px] max-w-2xl">
        <h1 className="text-3xl font-bold">About Calculator Plus</h1>
        <p className="text-lg">Calculator Plus is a simple, fast, and modern calculator built with Next.js.</p>
      </main>
      <Footer />
    </div>
  );
} 