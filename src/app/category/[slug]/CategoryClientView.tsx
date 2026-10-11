"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product, Category, SortOption } from "@/types";
import { toBengaliNumber } from "@/lib/utils";
import { ChevronDown, ArrowUpDown } from "lucide-react";

interface CategoryClientViewProps {
  category: Category | null;
  initialProducts: Product[];
  slug: string;
}

export default function CategoryClientView({
  category,
  initialProducts,
  slug,
}: CategoryClientViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Sort products numerically
  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortBy === "price_asc") {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortBy === "price_desc") {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [initialProducts, sortBy]);

  // Empty state if category not found or has no products
  if (!category && initialProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-bazar-base-200 border border-bazar-base-300 flex items-center justify-center text-4xl mb-6 shadow-sm">
          🔍
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-bazar-base-content mb-3">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>
        <p className="text-sm sm:text-base text-bazar-muted mb-8 leading-relaxed">
          অনুরোধকৃত &ldquo;{slug}&rdquo; ক্যাটাগরিটি বিদ্যমান নেই অথবা বর্তমানে এই ক্যাটাগরিতে কোনো পণ্য তালিকাভুক্ত নেই।
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

  const categoryName = category?.nameBn || slug;
  const categoryIcon = category?.icon || "🛒";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Category Header */}
      <div className="bg-white rounded-2xl border border-bazar-base-300 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-bazar-base-200 border border-bazar-base-300 flex items-center justify-center text-3xl shrink-0 shadow-xs">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-bazar-base-content flex items-center gap-2">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-bazar-muted mt-1">
              মোট {toBengaliNumber(initialProducts.length)}টি পণ্যের আজকের দাম ও বাজার পরিবর্তন
            </p>
          </div>
        </div>

        {/* Challenge C1: Sort dropdown */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <label htmlFor="sort-select" className="text-xs sm:text-sm font-medium text-bazar-muted flex items-center gap-1.5 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-bazar-primary" />
            <span>সাজান:</span>
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-bazar-base-100 border border-bazar-base-300 hover:border-bazar-primary text-bazar-base-content text-xs sm:text-sm font-medium rounded-xl py-2 pl-3.5 pr-8 focus:outline-hidden focus:ring-2 focus:ring-bazar-primary/20 transition-all cursor-pointer shadow-xs"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price_asc">দাম: কম থেকে বেশি</option>
              <option value="price_desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-bazar-muted pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-bazar-base-300 p-12 text-center">
          <span className="text-4xl block mb-3">🧺</span>
          <p className="text-base text-bazar-muted">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যায়নি।</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-bazar-primary text-white text-sm font-medium rounded-xl hover:bg-bazar-primary-hover transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
