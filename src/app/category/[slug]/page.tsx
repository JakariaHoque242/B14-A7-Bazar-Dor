import React from "react";
import { Metadata } from "next";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import CategoryClientView from "./CategoryClientView";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  const name = category?.nameBn || params.slug;
  return {
    title: `${name} — বাজার দর`,
    description: `${name} ক্যাটাগরির সকল পণ্যের আজকের বাজার দর ও মূল্য তালিকা।`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, products] = await Promise.all([
    getCategoryBySlug(params.slug),
    getProductsByCategory(params.slug),
  ]);

  return (
    <CategoryClientView
      category={category}
      initialProducts={products}
      slug={params.slug}
    />
  );
}
