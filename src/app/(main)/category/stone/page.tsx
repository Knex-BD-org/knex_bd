"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, MessageCircle, ChevronLeft } from "lucide-react";

export default function StoneCategoryPage() {
    const [lang, setLang] = useState<"bn" | "en">("bn");

    const toggleLang = () => {
        setLang((prev) => (prev === "bn" ? "en" : "bn"));
    };

    const content = {
        en: {
            title: "Premium Stones for Construction",
            subtitle: "Top quality stones at the best prices. Contact us today to place your order.",
            priceTitle: "Stone Pricing & Sizes",
            contactTitle: "Contact Us to Order",
            callNow: "Call Now",
            whatsapp: "WhatsApp Us",
            tableHeaders: ["Size / Specification", "Price (TK/cft)"],
            prices: [
                { size: "20 mm or 3/4 Down", price: "136 tk" },
                { size: "12 mm or 1/2 inch", price: "95 tk" },
                { size: "6 mm or 1/4 inch", price: "83 tk" },
                { size: "24 mm or 3/4 inch", price: "131 tk" },
            ],
            galleryTitle: "Our Stone Gallery",
        },
        bn: {
            title: "নির্মাণের জন্য প্রিমিয়াম পাথর",
            subtitle: "সেরা দামে সেরা মানের পাথর। অর্ডার করতে আজই যোগাযোগ করুন।",
            priceTitle: "পাথরের দাম ও আকার",
            contactTitle: "অর্ডার করতে যোগাযোগ করুন",
            callNow: "এখনই কল করুন",
            whatsapp: "হোয়াটসঅ্যাপ করুন",
            tableHeaders: ["আকার / স্পেসিফিকেশন", "মূল্য (টাকা/cft)"],
            prices: [
                { size: "২০ মিমি বা ৩/৪ ডাউন (20 mm or 3/4 Down)", price: "১৩৬ টাকা" },
                { size: "১২ মিমি বা ১/২ ইঞ্চি (12 mm or 1/2 inch)", price: "৯৫ টাকা" },
                { size: "৬ মিমি বা ১/৪ ইঞ্চি (6 mm or 1/4 inch)", price: "৮৩ টাকা" },
                { size: "২৪ মিমি বা ৩/৪ ইঞ্চি (24 mm or 3/4 inch)", price: "১৩১ টাকা" },
            ],
            galleryTitle: "আমাদের পাথরের গ্যালারি",
        }
    };

    const currentLang = content[lang];
    const phoneNumber = "+8809647700001";
    const displayPhone = "+88 09647700001";

    // Randomly selected media from public folder
    const images = [
        "/stone-media/whatsapp-image-2026-06-29-at-4.19.13-pm-1.jpeg",
        "/stone-media/whatsapp-image-2026-06-29-at-4.19.13-pm.jpeg",
        "/stone-media/whatsapp-image-2026-06-29-at-4.19.14-pm.jpeg",
        "/stone-media/whatsapp-image-2026-06-29-at-4.19.16-pm.jpeg",
        "/stone-media/whatsapp-image-2026-06-29-at-4.19.17-pm.jpeg",
        "/stone-media/whatsapp-image-2026-06-29-at-4.19.18-pm-1.jpeg",
        "/stone-media/whatsapp-image-2026-06-29-at-4.19.18-pm-2.jpeg",
        "/stone-media/whatsapp-image-2026-06-29-at-4.19.18-pm.jpeg",
        "/stone-media/whatsapp-image-2026-06-29-at-4.19.19-pm.jpeg"
    ];

    const videos = [
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.13-pm-1.mp4",
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.13-pm.mp4",
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.14-pm-1.mp4",
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.14-pm.mp4",
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.15-pm-1.mp4",
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.15-pm-2.mp4",
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.15-pm.mp4",
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.16-pm-1.mp4",
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.16-pm-2.mp4",
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.16-pm.mp4",
        "/stone-media/whatsapp-video-2026-06-29-at-4.19.17-pm.mp4"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Auto-play slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Breadcrumb & Language Toggle */}
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <nav className="flex items-center gap-2 text-sm text-gray-600 overflow-x-auto">
                    <Link href="/" className="hover:text-blue-600 cursor-pointer whitespace-nowrap">Home</Link>
                    <ChevronRight size={16} className="shrink-0" />
                    <span className="text-gray-900 font-medium whitespace-nowrap">Stone</span>
                </nav>

                <div className="flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200">
                    <button
                        onClick={() => setLang("bn")}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${lang === "bn" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        বাংলা
                    </button>
                    <button
                        onClick={() => setLang("en")}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${lang === "en" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        English
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-gray-100">
                    <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                        <Image
                            src={images[0]}
                            alt="Stone Hero"
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent flex items-center p-8">
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
                                {currentLang.title}
                            </h1>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-linear-to-br from-blue-50 to-indigo-50">
                        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                            {currentLang.subtitle}
                        </p>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Phone className="text-blue-600" />
                                {currentLang.contactTitle}
                            </h3>
                            <p className="text-2xl font-black text-blue-700 mb-6">{displayPhone}</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={`tel:${phoneNumber}`}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                                >
                                    <Phone size={20} />
                                    {currentLang.callNow}
                                </a>
                                <a
                                    href={`https://wa.me/${phoneNumber.replace("+", "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-green-600 transition shadow-lg shadow-green-200"
                                >
                                    <MessageCircle size={20} />
                                    {currentLang.whatsapp}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 border border-gray-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
                            {currentLang.priceTitle}
                        </span>
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-linear-to-r from-blue-50 to-indigo-50">
                                    <th className="px-6 py-4 text-sm md:text-base font-bold text-gray-700 border-b-2 border-blue-100 rounded-tl-lg">
                                        {currentLang.tableHeaders[0]}
                                    </th>
                                    <th className="px-6 py-4 text-sm md:text-base font-bold text-gray-700 border-b-2 border-blue-100 rounded-tr-lg">
                                        {currentLang.tableHeaders[1]}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentLang.prices.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-blue-50/50 transition-colors border-b border-gray-100 last:border-0"
                                    >
                                        <td className="px-6 py-5 text-gray-800 font-medium text-sm md:text-base">
                                            {item.size}
                                        </td>
                                        <td className="px-6 py-5 text-blue-700 font-bold text-base md:text-lg">
                                            {item.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Featured Slider Section */}
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <div className="bg-white rounded-3xl shadow-lg shadow-blue-900/5 border border-blue-50/50 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Slider - Left Side */}
                        <div className="w-full md:w-3/5 lg:w-2/3 relative h-[350px] md:h-[500px] overflow-hidden group">
                            {images.map((src, idx) => (
                                <div
                                    key={`slider-img-${idx}`}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                                >
                                    <Image
                                        src={src}
                                        alt={`Slide ${idx + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        priority={idx === 0}
                                        className="transition-transform duration-10000ms hover:scale-110 ease-linear"
                                    />
                                </div>
                            ))}

                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none"></div>

                            {/* Slider Controls */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white text-gray-900 hover:text-blue-600 p-3 rounded-full shadow-lg backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white text-gray-900 hover:text-blue-600 p-3 rounded-full shadow-lg backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                                aria-label="Next slide"
                            >
                                <ChevronRight size={24} />
                            </button>

                            {/* Indicators */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
                                {images.map((_, idx) => (
                                    <button
                                        key={`indicator-${idx}`}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "bg-white w-8 shadow-md" : "bg-white/50 w-2.5 hover:bg-white/80"}`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Description - Right Side */}
                        <div className="w-full md:w-2/5 lg:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-white border-t md:border-t-0 md:border-l border-gray-100 relative overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-blue-50/60 blur-3xl -z-10"></div>
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-indigo-50/60 blur-3xl -z-10"></div>

                            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                {lang === "bn" ? "পাথরের গুণগত মান" : "Premium Stone Quality"}
                            </h3>
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
                                <div className="w-3 h-1.5 bg-indigo-400 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {lang === "bn"
                                    ? "আমাদের পাথরগুলি দীর্ঘস্থায়ী এবং টেকসই। নির্মাণের প্রতিটি ক্ষেত্রে সেরা ফলাফল নিশ্চিত করার জন্য আমরা গুণমান পরীক্ষা করে থাকি। আমাদের সরবরাহ করা পাথর দিয়ে আপনার স্বপ্নের প্রজেক্ট তৈরি করুন যা যুগের পর যুগ টিকে থাকবে।"
                                    : "Our stones are highly durable and long-lasting. We ensure strict quality checks to provide the best results for every construction need. Build your dream project with our supplied stones that stand the test of time."}
                            </p>

                            <ul className="space-y-5 mt-auto">
                                <li className="flex items-center gap-4 group">
                                    <span className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">✓</span>
                                    <span className="text-gray-800 font-semibold text-lg">{lang === "bn" ? "১০০% মজবুত ও টেকসই" : "100% Strong & Durable"}</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">✓</span>
                                    <span className="text-gray-800 font-semibold text-lg">{lang === "bn" ? "নির্ভুল গ্রেডিং ও সাইজ" : "Accurate Grading & Size"}</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">✓</span>
                                    <span className="text-gray-800 font-semibold text-lg">{lang === "bn" ? "সঠিক সময়ে ডেলিভারি" : "On-time Delivery"}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Media Gallery */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 px-2 border-l-4 border-blue-600">
                    {currentLang.galleryTitle}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Display Images */}
                    {images.map((src, idx) => (
                        <div key={`img-${idx}`} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white aspect-4/3">
                            <Image
                                src={src}
                                alt={`Stone Gallery ${idx + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ))}
                    {/* Display Videos */}
                    {videos.map((src, idx) => (
                        <div key={`vid-${idx}`} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-black aspect-4/3">
                            <video
                                src={src}
                                controls
                                muted
                                className="w-full h-full object-cover"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}
