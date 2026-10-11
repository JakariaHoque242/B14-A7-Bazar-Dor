import React from "react";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Banner Skeleton */}
      <div className="h-64 bg-white rounded-2xl border border-bazar-base-300 p-6 flex flex-col justify-center space-y-4">
        <div className="h-4 w-40 bg-bazar-base-200 rounded" />
        <div className="h-8 w-72 bg-bazar-base-200 rounded" />
        <div className="h-4 w-96 bg-bazar-base-200 rounded" />
        <div className="h-10 w-32 bg-bazar-base-200 rounded-xl" />
      </div>

      {/* Grid Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-48 bg-bazar-base-200 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
