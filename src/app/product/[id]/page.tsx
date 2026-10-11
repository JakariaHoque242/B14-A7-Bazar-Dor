import React from "react";
import { Metadata } from "next";
import { getProductByIdOrSlug } from "@/lib/api";
import ProductDetailsClientView from "./ProductDetailsClientView";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductByIdOrSlug(params.id);
  const name = product?.nameBn || "পণ্য বিবরণ";
  return {
    title: `${name} — বাজার দর`,
    description: `${name}-এর আজকের বাজার দর, সর্বনিম্ন, গড়, ও সর্বাধিক মূল্য তালিকা।`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductByIdOrSlug(params.id);

  return (
    <ProductDetailsClientView
      product={product}
      idOrSlug={params.id}
    />
  );
}
