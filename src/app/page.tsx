import React from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";

export default async function HomePage() {
  const products = await getAllProducts();

  const risers = [...products]
    .filter((p) => p.change.dir === "up" || p.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change.dir === "down" || p.change.pct < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="pb-16">
      
      <Hero totalProducts={products.length} />

      <div className="max-w-6xl mx-auto px-4 mt-10 space-y-14">
        
        <section id="আজ-দাম-বেড়েছে" className="scroll-mt-32">
          <div className="mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-bazar-base-content flex items-center gap-2">
              আজ দাম বেড়েছে <span className="text-emerald-600">▲</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {risers.map((product) => (
              <ProductCard key={`riser-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        <section className="scroll-mt-32">
          <div className="mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-bazar-base-content flex items-center gap-2">
              আজ দাম কমেছে <span className="text-rose-600">▼</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {fallers.map((product) => (
              <ProductCard key={`faller-${product.id}`} product={product} />
            ))}
          </div>
        </section>

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
