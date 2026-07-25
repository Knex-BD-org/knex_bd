"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Package } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
import { useNotification } from "@/context/NotificationContext";

interface ProductListCardProps {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    totalRatings: number;
    totalReviews: number;
    image: string;
    features: string[];
    assured?: boolean;
    badge?: string;
    href: string;
}

export default function ProductListCard({
    id,
    title,
    price,
    originalPrice,
    // discount,
    rating,
    totalRatings,
    image,
    // features,
    badge,
    href,
}: ProductListCardProps) {
    const { isInWishlist, toggleWishlist, isLoggedIn } = useWishlist();
    const router = useRouter();
    const { showToast } = useNotification();
    const productId = parseInt(id);
    const isWishlisted = isInWishlist(productId);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        toggleWishlist({
            productId,
            title,
            price,
            originalPrice: originalPrice || price,
            image,
            slug: href.replace('/products/', ''),
            inStock: true,
        });
    };

    const calculatedDiscount = originalPrice && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return (
        <Link href={href} className="bg-white p-3 sm:p-4 rounded-lg hover:shadow-lg transition-all border border-gray-200 flex flex-col sm:flex-row gap-3 sm:gap-4 relative group cursor-pointer">
            {/* Mobile: Heart icon at top right */}
            <button
                onClick={handleWishlistClick}
                className="absolute top-3 right-3 sm:hidden z-10 p-2 bg-white hover:bg-gray-100 rounded-full transition cursor-pointer shadow-sm"
            >
                <Heart
                    size={18}
                    className={isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-400"}
                />
            </button>

            {/* Product Image */}
            <div className="w-full sm:w-40 md:w-48 h-40 sm:h-40 md:h-48 shrink-0 bg-gray-50 rounded-lg relative">
                <div className="w-full h-full flex items-center justify-center relative">
                    {image ? (
                        <Image src={image.trim().replace(/ /g, '%20').replace('http://', 'https://')} alt={title} fill className="object-contain" />
                    ) : (
                        <Package className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-300" />
                    )}
                </div>
                {badge && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                        {badge}
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2 group-hover:text-indigo-600 line-clamp-2">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
                        <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs sm:text-sm font-semibold flex items-center gap-1">
                            {rating} <Star size={12} fill="white" />
                        </span>
                        <span className="text-xs sm:text-sm text-gray-600">
                            {totalRatings.toLocaleString()} Ratings
                        </span>
                    </div>
                </div>

                {/* Mobile Price Section */}
                <div className="sm:hidden flex items-center mt-2 flex-wrap gap-2">
                    <span className="text-xl font-bold">Tk {price.toLocaleString()}</span>
                    {originalPrice && originalPrice > price && (
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 line-through text-xs">
                                Tk {originalPrice.toLocaleString()}
                            </span>
                            <span className="text-indigo-600 font-semibold text-xs">
                                {calculatedDiscount}% off
                            </span>
                        </div>
                    )}
                    <span className="md:hidden ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                        More Details
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Desktop Price Section */}
            <div className="hidden sm:flex flex-col justify-between items-end min-w-40 md:min-w-200px">
                <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                        <span className="text-xl md:text-2xl font-semibold">Tk {price.toLocaleString()}</span>
                    </div>
                    {originalPrice && originalPrice > price && (
                        <div className="flex items-center gap-2 justify-end">
                            <span className="text-gray-400 line-through text-sm">
                                Tk {originalPrice.toLocaleString()}
                            </span>
                            <span className="text-indigo-600 font-semibold text-sm">
                                {calculatedDiscount}% off
                            </span>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleWishlistClick}
                    className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
                >
                    <Heart
                        size={20}
                        className={isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-400"}
                    />
                </button>
            </div>
        </Link>
    );
}
