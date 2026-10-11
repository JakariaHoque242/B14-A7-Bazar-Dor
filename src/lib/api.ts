import { Product, Category } from "@/types";

const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchFromApi<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  for (const baseUrl of BASE_URLS) {
    try {
      const url = `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
      const res = await fetch(url, {
        next: { revalidate: 60 },
        ...options,
      });

      if (res.ok) {
        const data = await res.json();
        return data as T;
      }
    } catch {
      // Continue to next fallback url
    }
  }
  return null;
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await fetchFromApi<Product[]>("/products");
  return data || [];
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const data = await fetchFromApi<Product[]>(`/products?category=${encodeURIComponent(category)}`);
  if (data && data.length > 0) {
    return data;
  }
  // Fallback to client-side filter
  const all = await getAllProducts();
  return all.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  // If it's a number or numeric string, try single product endpoint
  const isNumeric = !isNaN(Number(idOrSlug));
  if (isNumeric) {
    const single = await fetchFromApi<Product>(`/products/${idOrSlug}`);
    if (single && single.nameBn) {
      return single;
    }
  }

  // Otherwise or if not found, search in all products
  const all = await getAllProducts();
  const found = all.find(
    (p) =>
      p.id.toString() === idOrSlug.toString() ||
      p.slug.toLowerCase() === idOrSlug.toString().toLowerCase()
  );
  return found || null;
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await fetchFromApi<Category[]>("/categories");
  if (data && data.length > 0) {
    return data;
  }
  // Fallback default categories
  return [
    { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
    { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
    { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
    { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
    { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
    { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
    { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
    { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
  ];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getAllCategories();
  return categories.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
}
