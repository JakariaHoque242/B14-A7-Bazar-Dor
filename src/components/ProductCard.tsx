import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber, getUnitTextBn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const unitText = getUnitTextBn(product.unit);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded-2xl border border-bazar-base-300 p-4 hover:border-bazar-primary hover:shadow-md transition-all duration-200"
    >
      {/* Top Part: Icon + Title & Unit */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-bazar-base-200 border border-bazar-base-300 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shrink-0">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-bazar-base-content group-hover:text-bazar-primary transition-colors line-clamp-1">
              {product.nameBn}
            </h3>
            <p className="text-xs text-bazar-muted mt-0.5">{unitText}</p>
          </div>
        </div>

        <span className="text-bazar-muted group-hover:text-bazar-primary group-hover:translate-x-0.5 transition-all text-xs font-semibold">
          বিস্তারিত →
        </span>
      </div>

      {/* Bottom Part: Price & Change Badge */}
      <div className="mt-4 pt-3 border-t border-bazar-base-200 flex items-end justify-between gap-2">
        <div>
          <span className="text-xs text-bazar-muted block font-normal">আজকের দাম</span>
          <span className="text-lg sm:text-xl font-bold text-bazar-base-content">
            {toBengaliNumber(product.today)} টাকা
          </span>
        </div>

        {/* Change badge */}
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            isUp
              ? "text-emerald-700 bg-emerald-50 border-emerald-200"
              : isDown
              ? "text-rose-700 bg-rose-50 border-rose-200"
              : "text-gray-600 bg-gray-100 border-gray-200"
          }`}
        >
          {isUp && <span>▲</span>}
          {isDown && <span>▼</span>}
          {!isUp && !isDown && <span>—</span>}
          <span>{toBengaliNumber(Math.abs(product.change.pct))}%</span>
        </div>
      </div>
    </Link>
  );
}
