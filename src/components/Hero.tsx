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
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bazar-base-content tracking-tight leading-tight">
              আজকের বাজারের দাম <span className="text-bazar-primary">এক নজরে</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-bazar-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়
            </p>

            {/* CTA Button */}
            <div className="mt-6 flex items-center justify-center lg:justify-start">
              <a
                href="#সব-পণ্য"
                className="px-6 py-3 bg-bazar-primary hover:bg-bazar-primary-hover text-white text-sm sm:text-base font-semibold rounded-xl shadow-md transition-all hover:shadow-lg active:scale-98 inline-flex items-center gap-2"
              >
                <span>সব পণ্য দেখুন</span>
                <span className="text-lg">↓</span>
              </a>
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
