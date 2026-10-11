"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber, getShortUnitBn } from "@/lib/utils";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-bazar-base-200 border-y border-bazar-base-300 overflow-hidden py-1.5 select-none">
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {tickerItems.map((product, idx) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";
          const shortUnit = getShortUnitBn(product.unit);

          return (
            <Link
              key={`${product.id}-${idx}`}
              href={`/product/${product.id}`}
              className="inline-flex items-center gap-2 mx-4 px-3 py-1 bg-white rounded-full border border-bazar-base-300 text-xs sm:text-sm hover:border-bazar-primary transition-colors shrink-0 shadow-sm"
            >
              <span className="text-base">{product.image || product.categoryIcon || "🛒"}</span>
              <span className="font-medium text-bazar-base-content">{product.nameBn}</span>
              <span className="text-bazar-muted">
                {toBengaliNumber(product.today)} টাকা{shortUnit ? `/${shortUnit}` : ""}
              </span>
              <span
                className={`font-semibold inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded ${
                  isUp
                    ? "text-emerald-700 bg-emerald-50"
                    : isDown
                    ? "text-rose-700 bg-rose-50"
                    : "text-gray-600 bg-gray-100"
                }`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {!isUp && !isDown && "— "}
                {toBengaliNumber(Math.abs(product.change.pct))}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
