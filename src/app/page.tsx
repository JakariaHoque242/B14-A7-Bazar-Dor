import React from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";

export default async function HomePage() {
  const products = await getAllProducts();

  // Top 6 Risers (দাম বেড়েছে)
  const risers = [...products]
    .filter((p) => p.change.dir === "up" || p.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 Fallers (দাম কমেছে)
  const fallers = [...products]
    .filter((p) => p.change.dir === "down" || p.change.pct < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="pb-16">
      {/* Hero Banner */}
      <Hero totalProducts={products.length} />

      <div className="max-w-6xl mx-auto px-4 mt-10 space-y-14">
        {/* Section A: আজ দাম বেড়েছে ▲ */}
        <section id="আজ-দাম-বেড়েছে" className="scroll-mt-32">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h2 className="text-xl sm:text-2xl font-bold text-bazar-base-content flex items-center gap-2">
                  আজ দাম বেড়েছে <span className="text-emerald-600">▲</span>
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-bazar-muted mt-1">
                আজকের বাজারে যেসব পণ্যের দাম সবচেয়ে বেশি বৃদ্ধি পেয়েছে (শীর্ষ {toBengaliNumber(risers.length)}টি)
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
              বৃদ্ধির প্রবণতা
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {risers.map((product) => (
              <ProductCard key={`riser-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section B: আজ দাম কমেছে ▼ */}
        <section className="scroll-mt-32">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <h2 className="text-xl sm:text-2xl font-bold text-bazar-base-content flex items-center gap-2">
                  আজ দাম কমেছে <span className="text-rose-600">▼</span>
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-bazar-muted mt-1">
                আজকের বাজারে যেসব পণ্যের দাম হ্রাস পেয়েছে (শীর্ষ {toBengaliNumber(fallers.length)}টি)
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-rose-50 text-rose-800 text-xs font-semibold rounded-full border border-rose-200">
              হ্রাসের প্রবণতা
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {fallers.map((product) => (
              <ProductCard key={`faller-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section C: সব পণ্য */}
        <section id="সব-পণ্য" className="scroll-mt-32">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-bazar-base-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-bazar-base-content flex items-center gap-2">
                <span>সব পণ্য</span>
              </h2>
              <p className="text-xs sm:text-sm text-bazar-muted mt-1">
                মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-bazar-base-300 p-12 text-center">
              <span className="text-4xl block mb-2">🛒</span>
              <p className="text-base text-bazar-muted">কোনো পণ্য পাওয়া যায়নি।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={`all-${product.id}`} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
