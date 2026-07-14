import { Metadata, ResolvingMetadata } from "next";
import SingleProductClient from "./SingleProductClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;

    try {
        const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
        
        if (!res.ok) {
            return {
                title: 'Product Not Found | KNEX'
            };
        }
        
        const product = await res.json();
        
        // Strip HTML tags for description
        const plainDescription = product.description 
            ? product.description.replace(/<[^>]*>?/gm, '').substring(0, 160) 
            : `Buy ${product.title} online at best price in Bangladesh from KNEX.`;
            
        return {
            title: `${product.title} | KNEX`,
            description: plainDescription,
            openGraph: {
                title: `${product.title} | KNEX`,
                description: plainDescription,
                images: product.image ? [{ url: product.image, width: 800, height: 800 }] : [],
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${product.title} | KNEX`,
                description: plainDescription,
                images: product.image ? [product.image] : [],
            }
        };
    } catch (error) {
        return {
            title: 'KNEX Product'
        };
    }
}

export default function ProductPage() {
    return <SingleProductClient />;
}