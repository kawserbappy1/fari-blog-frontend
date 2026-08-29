import React from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-100 flex items-center justify-center p-6">
      {/* Background Decorative Curved Rings */}
      <div className="pointer-events-none absolute -left-28 -bottom-28 h-125 w-125 rounded-full border-[60px] border-white/10" />

      <div className="pointer-events-none absolute -right-36 -top-36 h-175 w-175 rounded-full border-[70px] border-white/10" />

      <div className="pointer-events-none absolute right-1/4 -bottom-48 h-100 w-100 rounded-full border-[40px] border-white/5" />

      {/* Main Card Container */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] border border-white/20 bg-white shadow-2xl md:min-h-[620px] md:flex-row">
        {/* Left Column */}
        <div className="relative z-10 flex w-full flex-col justify-between bg-white p-8 md:w-1/2 md:p-12">
          {/* Top Section */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-[#2563EB]"
            >
              <span className="inline-block h-3.5 w-3.5 rounded-full bg-[#2563EB]" />
              Fariblog
            </Link>
          </div>

          {/* Center Section */}
          <div className="my-auto">{children}</div>
        </div>

        {/* Right Column */}
        <div className="relative flex w-full min-h-[350px] items-center justify-center bg-[#F4F5F7] p-8 md:w-1/2 md:p-12">
          <div className="flex w-full max-w-md items-center justify-center">
            <svg
              viewBox="0 0 500 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" w-full max-w-full drop-shadow-md"
            >
              {/* Bicycle Background Envelope/Box */}
              <rect
                x="155"
                y="190"
                width="85"
                height="55"
                rx="4"
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth="2"
              />

              <path
                d="M155 190 L197.5 220 L240 190"
                stroke="#CBD5E1"
                strokeWidth="2"
                fill="none"
              />

              {/* Rear Wheel */}
              <circle
                cx="150"
                cy="310"
                r="55"
                stroke="#1E293B"
                strokeWidth="6"
                fill="white"
              />

              <circle cx="150" cy="310" r="10" fill="#1E293B" />

              {/* Front Wheel */}
              <circle
                cx="350"
                cy="310"
                r="55"
                stroke="#1E293B"
                strokeWidth="6"
                fill="white"
              />

              <circle
                cx="350"
                cy="310"
                r="12"
                stroke="#1E293B"
                strokeWidth="4"
                fill="white"
              />

              {/* Bike Frame */}
              <path
                d="M150 310 L220 310 L270 240 L190 240 Z"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinejoin="round"
              />

              <path
                d="M220 310 L280 310 L350 310"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
              />

              <path
                d="M270 240 L350 310"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
              />

              <path
                d="M350 310 L335 230 L345 230"
                stroke="#3B82F6"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Rider Legs */}
              <path
                d="M230 220 L275 270 L240 310"
                stroke="#2563EB"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              <path
                d="M230 220 L285 240 L300 280"
                stroke="#3B82F6"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Rider Body & Backpack */}
              <path
                d="M195 195 C185 170 205 140 230 140 L260 170 L225 220 Z"
                fill="#1E293B"
              />

              <path d="M230 140 L300 190 L260 220 Z" fill="#1E293B" />

              {/* Arms & Handlebars */}
              <path
                d="M260 175 L320 205 L340 215"
                stroke="#1E293B"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />

              {/* Head & Cap */}
              <circle cx="280" cy="125" r="15" fill="#FED7AA" />

              <path
                d="M265 125 C265 110 280 105 295 110 L310 115 L295 120 Z"
                fill="#FACC15"
              />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}
