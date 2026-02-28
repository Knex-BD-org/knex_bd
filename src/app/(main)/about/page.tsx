"use client";

import { useState } from "react";
import {
    Users,
    Target,
    Eye,
    Mail,
    Phone,
    Globe,
    ChevronRight,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface ContentBlock {
    titleEn: string;
    titleBn: string;
    contentEn: string;
    contentBn: string;
    icon: any;
}

const contentBlocks: ContentBlock[] = [
    {
        titleEn: "Who We Are",
        titleBn: "আমরা কারা",
        contentEn: "KNEX is one of Bangladesh's premier premium online shopping platforms. We are committed to bringing a wide range of quality and diverse products to the doorsteps of our customers at affordable prices. Our aim is to make shopping easy, fast and enjoyable.",
        contentBn: "KNEX বাংলাদেশের একটি অন্যতম প্রিমিয়াম অনলাইন শপিং প্ল্যাটফর্ম। আমরা সাশ্রয়ী মূল্যে মানসম্মত এবং বৈচিত্র্যময় পণ্যের সমাহার নিয়ে গ্রাহকদের দোরগোড়ায় পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো কেনাকাটাকে সহজ, দ্রুত এবং আনন্দদায়ক করে তোলা।",
        icon: Users,
    },
    {
        titleEn: "Our Mission",
        titleBn: "আমাদের লক্ষ্য",
        contentEn: "Our mission is to ensure a seamless shopping experience for our customers. We want to achieve every customer's satisfaction through quality products and exceptional customer service.",
        contentBn: "আমাদের লক্ষ্য হলো গ্রাহকদের জন্য একটি নিরবচ্ছিন্ন (seamless) শপিং অভিজ্ঞতা নিশ্চিত করা। উন্নতমানের পণ্য সরবরাহ এবং অসাধারণ কাস্টমার সার্ভিসের মাধ্যমে আমরা প্রতিটি গ্রাহকের সন্তুষ্টি অর্জন করতে চাই।",
        icon: Target,
    },
    {
        titleEn: "Our Vision",
        titleBn: "আমাদের ভিশন",
        contentEn: "To become the symbol of highest trust in e-commerce service in Bangladesh. Our dream is to make online shopping accessible to every person in the country by making every step of shopping easier through technology.",
        contentBn: "বাংলাদেশে ই-কমার্স সেবায় সর্বোচ্চ আস্থার প্রতীক হয়ে ওঠা। কেনাকাটার প্রতিটি ধাপকে প্রযুক্তির মাধ্যমে সহজতর করে অনলাইন শপিংকে দেশের প্রতিটি মানুষের কাছে সহজলভ্য করে তোলাই আমাদের স্বপ্ন।",
        icon: Eye,
    }
];

export default function AboutPage() {
    const [lang, setLang] = useState<"en" | "bn">("bn");

    const toggleLang = () => setLang(prev => prev === "en" ? "bn" : "en");

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pb-16 font-sans">
            {/* Navigation & Language Toggle */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">{lang === "en" ? "Back to Home" : "হোমে ফিরে যান"}</span>
                </Link>

                <button
                    onClick={toggleLang}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-300 group"
                >
                    <Globe className="w-4 h-4 text-blue-500 group-hover:rotate-12 transition-transform" />
                    <span className="text-sm font-semibold text-gray-700">
                        {lang === "en" ? "বাংলা" : "English"}
                    </span>
                </button>
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                            {lang === "en" ? (
                                <>Discover More <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">About KNEX</span></>
                            ) : (
                                <>KNEX সম্পর্কে <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">আরও জানুন</span></>
                            )}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            {lang === "en"
                                ? "Empowering consumers with quality, trust, and a seamless shopping experience across Bangladesh."
                                : "উন্নতমানের পণ্য এবং নির্ভরযোগ্য সেবার মাধ্যমে বাংলাদেশের প্রতিটি মানুষের কাছে অনলাইন শপিংকে পৌঁছে দেওয়াই আমাদের অনুপ্রেরণা।"}
                        </p>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-40 animate-pulse delay-700"></div>
                </div>
            </div>

            {/* Core Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {contentBlocks.map((block, idx) => {
                        const Icon = block.icon;
                        return (
                            <div
                                key={idx}
                                className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    {lang === "en" ? block.titleEn : block.titleBn}
                                </h2>
                                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                                    {lang === "en" ? block.contentEn : block.contentBn}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Contact Section */}
                <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-12 opacity-10 hidden lg:block">
                        <Mail className="w-64 h-64 text-white" />
                    </div>

                    <div className="relative z-10 px-8 py-12 md:p-16 lg:p-20 text-white">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                {lang === "en" ? "Get In Touch" : "যোগাযোগ করুন"}
                            </h2>
                            <p className="text-gray-400 mb-10 text-lg">
                                {lang === "en"
                                    ? "Have questions or need assistance? Our support team is here to help you 24/7."
                                    : "যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করতে পারেন। আমাদের কাস্টমার সাপোর্ট টিম সর্বদা আপনার পাশে আছে।"}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                                <Link
                                    href="mailto:support@knex.com.bd"
                                    className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{lang === "en" ? "Email" : "ইমেইল"}</p>
                                        <p className="font-medium">support@knex.com.bd</p>
                                    </div>
                                </Link>

                                <Link
                                    href="tel:+8809647700001"
                                    className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{lang === "en" ? "Hotline" : "ফোন"}</p>
                                        <p className="font-medium">+880 9647700001</p>
                                    </div>
                                </Link>
                            </div>

                            <button className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg">
                                {lang === "en" ? "Contact Support" : "সাপোর্ট টিমের সাথে কথা বলুন"}
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
