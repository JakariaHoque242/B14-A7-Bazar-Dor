"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";

interface HeroProps {
  totalProducts?: number;
}

export default function Hero({ totalProducts = 33 }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-white to-bazar-base-200 border-b border-bazar-base-300 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs sm:text-sm font-medium text-emerald-800 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের বাজার দর</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bazar-base-content tracking-tight leading-tight">
              আজকের বাজারের দাম <span className="text-bazar-primary">এক নজরে</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-bazar-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম এবং বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href="#সব-পণ্য"
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-bazar-primary hover:bg-bazar-primary-hover text-white text-sm sm:text-base font-semibold rounded-xl shadow-md transition-all hover:shadow-lg active:scale-98 inline-flex items-center gap-2"
              >
                <span>সব পণ্য দেখুন</span>
                <span className="text-lg">↓</span>
              </a>

              <a
                href="#আজ-দাম-বেড়েছে"
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-bazar-base-100 text-bazar-base-content border border-bazar-base-300 text-sm sm:text-base font-semibold rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <span>বাজার পরিবর্তন</span>
                <span>▲▼</span>
              </a>
            </div>

            {/* Quick Stat Badges */}
            <div className="mt-8 pt-6 border-t border-bazar-base-300/60 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0 text-center">
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-bazar-base-300 shadow-xs">
                <p className="text-xl sm:text-2xl font-bold text-bazar-primary">
                  {toBengaliNumber(6)}
                </p>
                <p className="text-xs text-bazar-muted">বিভাগের তথ্য</p>
              </div>
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-bazar-base-300 shadow-xs">
                <p className="text-xl sm:text-2xl font-bold text-bazar-primary">
                  {toBengaliNumber(12)}
                </p>
                <p className="text-xs text-bazar-muted">বাজারের তথ্য</p>
              </div>
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-bazar-base-300 shadow-xs">
                <p className="text-xl sm:text-2xl font-bold text-bazar-primary">
                  {toBengaliNumber(totalProducts)}
                </p>
                <p className="text-xs text-bazar-muted">পণ্যের দাম</p>
              </div>
            </div>
          </div>

          {/* Right: Banner Illustration */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[400px]">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর হিরো ব্যানার"
                width={400}
                height={350}
                priority
                className="w-full h-auto object-contain drop-shadow-md hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
