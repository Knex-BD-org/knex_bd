import { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { Suspense } from "react";

interface Props {
    searchParams: Promise<{
        category?: string;
        subcategory?: string;
        subsubcategory?: string;
    }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const sParams = await searchParams;
    const category = sParams.category;
    const subcategory = sParams.subcategory;
    const subsubcategory = sParams.subsubcategory;

    let title = "All Products";
    if (subsubcategory) title = subsubcategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    else if (subcategory) title = subcategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    else if (category) title = category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    return {
        title: `${title} | KNEX Online Store`,
        description: `Browse ${title} at KNEX. Find the best deals on Electronics, Fashion, and more in Bangladesh.`,
        alternates: {
            canonical: `/products${category ? `?category=${category}` : ""}${subcategory ? `&subcategory=${subcategory}` : ""}${subsubcategory ? `&subsubcategory=${subsubcategory}` : ""}`,
        }
    };
}

export default async function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
            <ProductsClient />
        </Suspense>
    );
}
