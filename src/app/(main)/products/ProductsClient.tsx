"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronRight, Frown } from "lucide-react";
import Link from "next/link";
import ProductListCard from "@/components/ProductListCard";
import ProductGridCard from "@/components/ProductGridCard";
import MobileFilters from "@/components/MobileFilters";
import DesktopFilters from "@/components/DesktopFilters";
import ProductsHeader from "@/components/ProductsHeader";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type Product = {
    id: number;
    title: string;
    slug: string;
    price: number;
    originalPrice: number | null;
    discount: number | null;
    rating: number;
    totalRatings: number;
    totalReviews: number;
    images: string[];
    image: string;
    features: string[];
    brand: { id: number; name: string; slug: string } | null;
    category: { id: number; name: string; slug: string } | null;
    subCategory: { id: number; name: string; slug: string } | null;
};

type Brand = { id: number; name: string; slug: string };

interface ProductsClientProps {
    category?: string | null;
    subcategory?: string | null;
    subsubcategory?: string | null;
}

export default function ProductsClient({
    category = null,
    subcategory = null,
    subsubcategory = null,
}: ProductsClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryParam = category || searchParams.get("category");
    const subcategoryParam = subcategory || searchParams.get("subcategory");
    const subsubcategoryParam = subsubcategory || searchParams.get("subsubcategory");
    const searchQueryParam = searchParams.get("search");

    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<any[]>([]);

    const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("popularity");
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
    const [tempBrands, setTempBrands] = useState<string[]>([]);
    const [tempPriceRange, setTempPriceRange] = useState<number[]>([]);

    const itemsPerPage = 12;

    useEffect(() => {
        let isMounted = true;

        const loadProducts = async () => {
            setLoading(true);
            const params = new URLSearchParams();
            if (categoryParam) params.set("category", categoryParam);
            if (subcategoryParam) params.set("subcategory", subcategoryParam);
            if (subsubcategoryParam) params.set("subsubcategory", subsubcategoryParam);
            if (searchQueryParam) params.set("search", searchQueryParam);
            if (selectedBrands.length > 0) params.set("brand", selectedBrands[0]);

            // Add price range filter
            if (selectedPriceRange.length > 0) {
                const priceRanges = [
                    { min: 0, max: 1000 },
                    { min: 1000, max: 5000 },
                    { min: 5000, max: 10000 },
                    { min: 10000, max: 20000 },
                    { min: 20000, max: null },
                ];
                const range = priceRanges[selectedPriceRange[0]];
                if (range) {
                    if (range.min) params.set("minPrice", range.min.toString());
                    if (range.max) params.set("maxPrice", range.max.toString());
                }
            }
            if (sortBy === "price -- low to high") params.set("sort", "price-low");
            else if (sortBy === "price -- high to low") params.set("sort", "price-high");
            params.set("page", currentPage.toString());
            params.set("limit", itemsPerPage.toString());

            try {
                const res = await fetch(`${API}/products?${params}`);
                const data = await res.json();
                if (isMounted) {
                    setProducts(data.products || []);
                    setTotalProducts(data.total || 0);
                }
            } catch (e) {
                console.error(e);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadProducts();

        return () => { isMounted = false; };
    }, [categoryParam, subcategoryParam, subsubcategoryParam, searchQueryParam, selectedBrands, selectedPriceRange, sortBy, currentPage]);

    useEffect(() => {
        let isMounted = true;

        const loadBrands = async () => {
            const params = new URLSearchParams();
            if (categoryParam) params.set("category", categoryParam);
            if (subcategoryParam) params.set("subcategory", subcategoryParam);
            if (subsubcategoryParam) params.set("subsubcategory", subsubcategoryParam);
            if (searchQueryParam) params.set("search", searchQueryParam);

            try {
                const res = await fetch(`${API}/products/brands?${params}`);
                const data = await res.json();
                if (isMounted) {
                    setBrands(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error(e);
                if (isMounted) setBrands([]);
            }
        };

        loadBrands();
        setSelectedBrands([]);
        setCurrentPage(1);

        return () => { isMounted = false; };
    }, [categoryParam, subcategoryParam, subsubcategoryParam, searchQueryParam]);

    useEffect(() => {
        let isMounted = true;
        fetch(`${API}/categories`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) setCategories(Array.isArray(data) ? data : []);
            })
            .catch(console.error);
        return () => { isMounted = false; };
    }, []);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const getCategoryTitle = () => {
        if (subsubcategoryParam) return subsubcategoryParam.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        if (subcategoryParam) return subcategoryParam.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        if (categoryParam) return categoryParam.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        return "All Products";
    };

    const toggleBrand = (brand: string, isMobile = false) => {
        if (isMobile) {
            setTempBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
        } else {
            setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
            setCurrentPage(1);
        }
    };

    const togglePriceRange = (index: number, isMobile = false) => {
        if (isMobile) {
            setTempPriceRange(prev => prev.includes(index) ? [] : [index]);
        } else {
            setSelectedPriceRange(prev => prev.includes(index) ? [] : [index]);
            setCurrentPage(1);
        }
    };

    const clearAllFilters = () => {
        setSelectedBrands([]);
        setSelectedPriceRange([]);
        setCurrentPage(1);
        if (categoryParam || subcategoryParam || subsubcategoryParam) {
            router.push('/products');
        }
    };

    const handleOpenMobileFilters = () => {
        setTempBrands(selectedBrands);
        setTempPriceRange(selectedPriceRange);
        setShowFilters(true);
    };

    const handleApplyMobileFilters = () => {
        setSelectedBrands(tempBrands);
        setSelectedPriceRange(tempPriceRange);
        setShowFilters(false);
        setCurrentPage(1);
    };

    // Convert products for existing card components
    const formattedProducts = products.map(p => ({
        id: p.id.toString(),
        title: p.title,
        price: p.price,
        originalPrice: p.originalPrice || p.price,
        discount: p.discount || 0,
        rating: p.rating,
        totalRatings: p.totalRatings,
        totalReviews: p.totalReviews,
        image: p.image || p.images?.[0] || "",
        features: p.features || [],
        assured: true,
        href: `/products/${p.slug}`,
        category: p.subCategory?.slug || p.category?.slug || "",
        brand: p.brand?.name || ""
    }));

    // Helper to get brand name from slug
    const getBrandName = (slug: string) => {
        const brand = brands.find(b => b.slug === slug);
        return brand?.name || slug;
    };

    let showGridType: "products" | "subcategories" | "subsubcategories" = "products";
    let gridItems: any[] = [];

    if (selectedBrands.length === 0 && selectedPriceRange.length === 0) {
        if (categoryParam && !subcategoryParam) {
            const cat = categories.find(c => c.slug === categoryParam);
            const subs = cat?.subCategories || cat?.subcategories || [];
            if (subs.length > 0) {
                showGridType = "subcategories";
                gridItems = subs;
            }
        } else if (categoryParam && subcategoryParam && !subsubcategoryParam) {
            const cat = categories.find(c => c.slug === categoryParam);
            const sub = (cat?.subCategories || cat?.subcategories || []).find((s: any) => s.slug === subcategoryParam);
            const subsubs = sub?.subSubCategories || sub?.subsubcategories || [];
            if (subsubs.length > 0) {
                showGridType = "subsubcategories";
                gridItems = subsubs;
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <MobileFilters
                showFilters={showFilters}
                tempBrands={tempBrands}
                tempPriceRange={tempPriceRange}
                categoryParam={categoryParam}
                subcategoryParam={subcategoryParam}
                subsubcategoryParam={subsubcategoryParam}
                brands={brands}
                onClose={() => setShowFilters(false)}
                onApply={handleApplyMobileFilters}
                onToggleBrand={(slug) => toggleBrand(slug, true)}
                onTogglePriceRange={(index) => togglePriceRange(index, true)}
                onClearTemp={() => { setTempBrands([]); setTempPriceRange([]); }}
                getBrandName={getBrandName}
            />

            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    <DesktopFilters
                        selectedBrands={selectedBrands}
                        selectedPriceRange={selectedPriceRange}
                        categoryParam={categoryParam}
                        subcategoryParam={subcategoryParam}
                        subsubcategoryParam={subsubcategoryParam}
                        brands={brands}
                        onToggleBrand={(slug) => toggleBrand(slug, false)}
                        onTogglePriceRange={(index) => togglePriceRange(index, false)}
                        onClearAll={clearAllFilters}
                        getBrandName={getBrandName}
                    />

                    <main className="flex-1 min-w-0">
                        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4 overflow-x-auto">
                            <Link href="/" className="hover:text-blue-600 cursor-pointer whitespace-nowrap">Home</Link>
                            <ChevronRight size={16} className="shrink-0" />
                            {categoryParam && (
                                <>
                                    <Link href={`/category/${categoryParam}`} className="hover:text-blue-600 cursor-pointer whitespace-nowrap capitalize">
                                        {categoryParam.replace("-", " ")}
                                    </Link>
                                    {subcategoryParam && (
                                        <>
                                            <Link href={`/category/${categoryParam}/${subcategoryParam}`} className="hover:text-blue-600 cursor-pointer whitespace-nowrap capitalize">
                                                {subcategoryParam.replace("-", " ")}
                                            </Link>
                                            {subsubcategoryParam && <ChevronRight size={16} className="shrink-0" />}
                                        </>
                                    )}
                                </>
                            )}
                            <span className="text-gray-900 font-medium whitespace-nowrap">{getCategoryTitle()}</span>
                        </nav>

                        <ProductsHeader
                            title={getCategoryTitle()}
                            productCount={totalProducts}
                            viewMode={viewMode}
                            sortBy={sortBy}
                            filterCount={selectedBrands.length + selectedPriceRange.length}
                            isCategoryView={showGridType !== "products"}
                            onViewModeChange={setViewMode}
                            onSortChange={setSortBy}
                            onOpenFilters={handleOpenMobileFilters}
                        />

                        {showGridType !== "products" ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 py-6 px-2">
                                {gridItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={showGridType === "subcategories" ? `/category/${categoryParam}/${item.slug}` : `/category/${categoryParam}/${subcategoryParam}/${item.slug}`}
                                        className="flex flex-col items-center gap-3 group cursor-pointer"
                                    >
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full p-[2px] sm:p-[3px] bg-linear-to-tr from-gray-200 to-gray-300 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500 shadow-sm group-hover:shadow-md">
                                            <div className="w-full h-full bg-white rounded-full p-1 sm:p-1.5 flex items-center justify-center overflow-hidden">
                                                {item.image ? (
                                                    <div className="relative w-full h-full rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-700 ease-in-out">
                                                        <img
                                                            src={(() => {
                                                                const img = item.image;
                                                                if (img.startsWith('/uploads')) {
                                                                    const baseUrl = API.replace('/api', '');
                                                                    return `${baseUrl}${img}`;
                                                                }
                                                                return img;
                                                            })()}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 transition-colors duration-500">
                                                        <span className="text-[10px] sm:text-xs font-medium">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 px-1">
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ) : loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : formattedProducts.length > 0 ? (
                            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}>
                                {formattedProducts.map((product) =>
                                    viewMode === "list" ? (
                                        <ProductListCard key={product.id} {...product} />
                                    ) : (
                                        <ProductGridCard key={product.id} {...product} />
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg p-8 sm:p-12 text-center">
                                <Frown className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-400" />
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No products found</h2>
                                <p className="text-sm sm:text-base text-gray-600 mb-6">Try adjusting your filters or check back later</p>
                                <button type="button" onClick={clearAllFilters} className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition cursor-pointer text-sm sm:text-base">
                                    Clear Filters
                                </button>
                            </div>
                        )}

                        {showGridType === "products" && totalPages > 1 && (
                            <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 flex-wrap">
                                <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} className="px-3 sm:px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-sm" disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <div className="flex gap-1 sm:gap-2">
                                    {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                                        <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-3 sm:px-4 py-2 rounded font-semibold cursor-pointer text-xs sm:text-sm ${currentPage === i + 1 ? "bg-blue-600 text-white" : "border border-gray-300 hover:bg-gray-100"}`}>
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} className="px-3 sm:px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-sm" disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
