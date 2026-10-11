import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-bazar-base-300 p-4 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-bazar-base-200 shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-28 bg-bazar-base-200 rounded" />
            <div className="h-3 w-16 bg-bazar-base-200 rounded" />
          </div>
        </div>
        <div className="h-3 w-12 bg-bazar-base-200 rounded" />
      </div>

      <div className="mt-4 pt-3 border-t border-bazar-base-200 flex items-end justify-between gap-2">
        <div className="space-y-1.5">
          <div className="h-3 w-14 bg-bazar-base-200 rounded" />
          <div className="h-5 w-24 bg-bazar-base-200 rounded" />
        </div>
        <div className="h-6 w-16 bg-bazar-base-200 rounded-full" />
      </div>
    </div>
  );
}
