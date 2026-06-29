"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, MessageCircle } from "lucide-react";

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
    const phoneNumber = "+8801705055880";
    const displayPhone = "+88 01705055880";

    // Randomly selected media from public folder
    const images = [
        "/image & videos/WhatsApp Image 2026-06-29 at 4.19.13 PM (1).jpeg",
        "/image & videos/WhatsApp Image 2026-06-29 at 4.19.14 PM.jpeg",
        "/image & videos/WhatsApp Image 2026-06-29 at 4.19.18 PM (1).jpeg",
        "/image & videos/WhatsApp Image 2026-06-29 at 4.19.19 PM.jpeg"
    ];

    const videos = [
        "/image & videos/WhatsApp Video 2026-06-29 at 4.19.14 PM (1).mp4",
        "/image & videos/WhatsApp Video 2026-06-29 at 4.19.15 PM (2).mp4"
    ];

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
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-8">
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
                                {currentLang.title}
                            </h1>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
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
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            {currentLang.priceTitle}
                        </span>
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
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

            {/* Media Gallery */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 px-2 border-l-4 border-blue-600">
                    {currentLang.galleryTitle}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Display Images */}
                    {images.map((src, idx) => (
                        <div key={`img-${idx}`} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white aspect-[4/3]">
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
                        <div key={`vid-${idx}`} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-black aspect-[4/3]">
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
