import { Metadata, ResolvingMetadata } from 'next';

interface Props {
    params: Promise<{ id: string }>;
    children: React.ReactNode;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = (await params).id;

    try {
        const res = await fetch(`${API_URL}/products/${id}`, { next: { revalidate: 3600 } });
        if (!res.ok) {
            return {
                title: "Product Not Found",
            };
        }

        const product = await res.json();
        const previousImages = (await parent).openGraph?.images || [];

        return {
            title: product.title,
            description: product.description?.replace(/<[^>]*>?/gm, '').substring(0, 160) || `Buy ${product.title} at KNEX.`,
            openGraph: {
                title: product.title,
                description: product.description?.replace(/<[^>]*>?/gm, '').substring(0, 160),
                url: `https://knex.com.bd/products/${product.slug}`,
                images: [product.image, ...previousImages],
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: product.title,
                description: product.description?.replace(/<[^>]*>?/gm, '').substring(0, 160),
                images: [product.image],
            },
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Product",
        };
    }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
