import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-24 h-24 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-5xl mb-6 shadow-sm animate-bounce">
        🛒
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-bazar-base-content tracking-tight">
        ৪০৪
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold text-bazar-base-content mt-2">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="text-sm sm:text-base text-bazar-muted max-w-md mt-2 mb-8 leading-relaxed">
        আপনি যে পেজ বা পণ্যটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি সঠিক নয়।
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-bazar-primary hover:bg-bazar-primary-hover text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-98"
      >
        <span>←</span>
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}
