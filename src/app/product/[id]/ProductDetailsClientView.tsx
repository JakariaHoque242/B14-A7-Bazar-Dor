"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Product } from "@/types";
import { toBengaliNumber, getUnitTextBn } from "@/lib/utils";
import toast from "react-hot-toast";
import { ArrowLeft, Building2, MapPin, Tag, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ProductDetailsClientViewProps {
  product: Product | null;
  idOrSlug: string;
}

export default function ProductDetailsClientView({
  product,
  idOrSlug,
}: ProductDetailsClientViewProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string>("all");

  useEffect(() => {
    if (!isPending && !session?.user && !hasRedirected) {
      setHasRedirected(true);
      toast.error("বিস্তারিত দাম দেখতে অনুগ্রহ করে সাইন ইন করুন।", {
        id: "auth-protected-redirect",
      });
      router.push(`/signin?redirect=/product/${idOrSlug}`);
    }
  }, [isPending, session, hasRedirected, router, idOrSlug]);

  if (isPending || (!session?.user && !hasRedirected)) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-bazar-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-bazar-muted">যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-bazar-base-200 border border-bazar-base-300 flex items-center justify-center text-4xl mb-6 shadow-sm">
          ⚠️
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-bazar-base-content mb-3">
          পণ্যটি পাওয়া যায়নি
        </h1>
        <p className="text-sm sm:text-base text-bazar-muted mb-8 leading-relaxed">
          অনুরোধকৃত &ldquo;{idOrSlug}&rdquo; পণ্যটি বর্তমানে ডাটাবেজে পাওয়া যায়নি।
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

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const unitText = getUnitTextBn(product.unit);

  const marketMins = product.markets?.map((m) => m.min) || [product.today];
  const marketMaxs = product.markets?.map((m) => m.max) || [product.today];
  const minPrice = Math.min(...marketMins);
  const maxPrice = Math.max(...marketMaxs);
  const avgPrice = Math.round(
    product.markets?.length > 0
      ? (minPrice + maxPrice) / 2
      : product.today
  );

  const divisions = ["all", ...Array.from(new Set(product.markets?.map((m) => m.division) || []))];

  const filteredMarkets = (product.markets || []).filter((m) =>
    selectedDivision === "all" ? true : m.division === selectedDivision
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-bazar-muted hover:text-bazar-primary transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>

      <div className="bg-white rounded-3xl border border-bazar-base-300 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-bazar-base-200 border border-bazar-base-300 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-xs">
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-bazar-base-content">
                  {product.nameBn}
                </h1>
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  <span>{product.categoryNameBn || product.category}</span>
                </Link>
              </div>
              <p className="text-sm text-bazar-muted font-normal">
                {product.categoryNameBn || "নিত্যপণ্য"} ক্যাটাগরির সর্বশেষ বাজার তথ্য · {unitText}
              </p>
            </div>
          </div>

          <div className="sm:text-right bg-bazar-base-100 sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-bazar-base-200">
            <span className="text-xs text-bazar-muted block font-normal">আজকের দাম</span>
            <div className="flex items-baseline sm:justify-end gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-bazar-base-content">
                {toBengaliNumber(product.today)} টাকা
              </span>
              <span className="text-xs text-bazar-muted">/{unitText.replace("প্রতি ", "")}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border">
              <span
                className={`inline-flex items-center gap-1 ${
                  isUp ? "text-emerald-700" : isDown ? "text-rose-700" : "text-gray-600"
                }`}
              >
                {isUp && <TrendingUp className="w-3.5 h-3.5" />}
                {isDown && <TrendingDown className="w-3.5 h-3.5" />}
                {!isUp && !isDown && <Minus className="w-3.5 h-3.5" />}
                <span>
                  গতকাল থেকে {toBengaliNumber(Math.abs(product.change.pct))}% {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-lg sm:text-xl font-bold text-bazar-base-content mb-4 flex items-center gap-2">
          <span>দামের সারসংক্ষেপ</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-white rounded-2xl border border-bazar-base-300 p-5 shadow-xs">
            <span className="text-xs font-medium text-bazar-muted block">সর্বনিম্ন দাম</span>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-700 mt-1">
              {toBengaliNumber(minPrice)} টাকা
            </p>
            <p className="text-xs text-bazar-muted mt-2">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="bg-white rounded-2xl border border-bazar-base-300 p-5 shadow-xs">
            <span className="text-xs font-medium text-bazar-muted block">গড় দাম</span>
            <p className="text-2xl sm:text-3xl font-bold text-bazar-primary mt-1">
              {toBengaliNumber(avgPrice)} টাকা
            </p>
            <p className="text-xs text-bazar-muted mt-2">{unitText}-এর হিসাবে</p>
          </div>

          <div className="bg-white rounded-2xl border border-bazar-base-300 p-5 shadow-xs">
            <span className="text-xs font-medium text-bazar-muted block">সর্বাধিক দাম</span>
            <p className="text-2xl sm:text-3xl font-bold text-rose-700 mt-1">
              {toBengaliNumber(maxPrice)} টাকা
            </p>
            <p className="text-xs text-bazar-muted mt-2">সবচেয়ে বেশি দামের বাজার</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-bazar-base-300 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-bazar-base-content flex items-center gap-2">
              <Building2 className="w-5 h-5 text-bazar-primary" />
              <span>বাজারভিত্তিক আজকের দাম</span>
            </h2>
            <p className="text-xs sm:text-sm text-bazar-muted mt-0.5">
              বিভিন্ন পাইকারি ও খুচরা বাজারের আজকের সম্ভাব্য দামের তুলনামূলক তালিকা
            </p>
          </div>

          {divisions.length > 2 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors shrink-0 ${
                    selectedDivision === div
                      ? "bg-bazar-primary text-white border-bazar-primary"
                      : "bg-bazar-base-200 text-bazar-base-content border-bazar-base-300 hover:bg-bazar-base-300"
                  }`}
                >
                  {div === "all" ? "সকল বিভাগ" : div}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-bazar-base-300 text-bazar-muted font-semibold">
                <th className="py-3 pr-4 text-left">বাজার</th>
                <th className="py-3 px-4 text-left">বিভাগ</th>
                <th className="py-3 px-4 text-right">সর্বনিম্ন</th>
                <th className="py-3 px-4 text-right">সর্বাধিক</th>
                <th className="py-3 pl-4 text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bazar-base-200">
              {filteredMarkets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-bazar-muted">
                    কোনো বাজারের তথ্য পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredMarkets.map((m, idx) => {
                  const mAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr key={`${m.market}-${idx}`} className="hover:bg-bazar-base-100 transition-colors">
                      <td className="py-3.5 pr-4 font-semibold text-bazar-base-content">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-bazar-muted">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-bazar-primary shrink-0" />
                          <span>{m.division}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-emerald-700">
                        {toBengaliNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-rose-700">
                        {toBengaliNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 pl-4 text-right font-bold text-bazar-base-content">
                        {toBengaliNumber(mAvg)} টাকা
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
