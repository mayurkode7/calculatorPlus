import Footer from "../components/Footer";

export default function About() {
  const upiLink = "upi://pay?pa=mayurkode@icici&pn=Calculator%20Plus&cu=INR";

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 flex flex-col">
      <main className="flex flex-col gap-[16px] max-w-2xl">
        <h1 className="text-3xl font-bold">About Calculator Plus</h1>
        <p className="text-lg">Calculator Plus is a simple, fast, and modern calculator built with Next.js.</p>
        <p className="text-base text-gray-700">
          Calculator Plus is built with passion and a love for coding. Our goal is to give mobile users a lightweight, trustworthy alternative so you can safely remove heavy calculator apps that may unnecessarily request permissions or pose risks to your data. This application requires no permissions to run and does not store your data. Your calculations stay on your device.
        </p>
        <p className="text-base text-gray-700">
          If you find Calculator Plus useful and want to support its development, 
          you can send a small donation via UPI.
          
          
        </p>
        <div>
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
        </div>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
} 