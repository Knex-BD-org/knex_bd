"use client";

import InfoPageLayout, { useLanguage } from "@/components/InfoPageLayout";
import Link from "next/link";

const sectionsEn = [
    {
        title: "Shopping",
        links: [
            { name: "All Products", href: "/products" },
            { name: "Categories", href: "/category" },
            { name: "Cart", href: "/cart" },
            { name: "Wishlist", href: "/wishlist" },
        ],
    },
    {
        title: "Account",
        links: [
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
            { name: "My Addresses", href: "/account/addresses" },
            { name: "Login", href: "/login" },
            { name: "Register", href: "/register" },
        ],
    },
    {
        title: "About",
        links: [
            { name: "About Us", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Press", href: "/press" },
            { name: "Corporate Information", href: "/corporate" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "Payments", href: "/payments" },
            { name: "Shipping", href: "/shipping" },
            { name: "Returns & Refunds", href: "/returns" },
            { name: "FAQ", href: "/faq" },
        ],
    },
    {
        title: "Policy",
        links: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Use", href: "/terms" },
            { name: "Security", href: "/security" },
        ],
    },
];

const sectionsBn = [
    {
        title: "কেনাকাটা",
        links: [
            { name: "সব পণ্য", href: "/products" },
            { name: "ক্যাটাগরি", href: "/category" },
            { name: "কার্ট", href: "/cart" },
            { name: "উইশলিস্ট", href: "/wishlist" },
        ],
    },
    {
        title: "অ্যাকাউন্ট",
        links: [
            { name: "আমার অ্যাকাউন্ট", href: "/account" },
            { name: "আমার অর্ডার", href: "/account/orders" },
            { name: "আমার ঠিকানা", href: "/account/addresses" },
            { name: "লগইন", href: "/login" },
            { name: "নিবন্ধন", href: "/register" },
        ],
    },
    {
        title: "আমাদের সম্পর্কে",
        links: [
            { name: "আমাদের সম্পর্কে", href: "/about" },
            { name: "ক্যারিয়ার", href: "/careers" },
            { name: "প্রেস", href: "/press" },
            { name: "কর্পোরেট তথ্য", href: "/corporate" },
        ],
    },
    {
        title: "সহায়তা",
        links: [
            { name: "পেমেন্ট", href: "/payments" },
            { name: "ডেলিভারি", href: "/shipping" },
            { name: "পণ্য ফেরত", href: "/returns" },
            { name: "জিজ্ঞাসাবলী", href: "/faq" },
        ],
    },
    {
        title: "নীতিমালা",
        links: [
            { name: "গোপনীয়তা নীতি", href: "/privacy" },
            { name: "ব্যবহারের শর্তাবলী", href: "/terms" },
            { name: "নিরাপত্তা", href: "/security" },
        ],
    },
];

export default function SitemapPage() {
    return (
        <InfoPageLayout 
            titleEn="Sitemap" 
            titleBn="সাইটম্যাপ"
            subtitleEn="Quick links to all pages"
            subtitleBn="সব পেজের দ্রুত লিঙ্ক"
        >
            <SitemapContent />
        </InfoPageLayout>
    );
}

function SitemapContent() {
    const { lang } = useLanguage();
    const sections = lang === "en" ? sectionsEn : sectionsBn;

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sections.map((section) => (
                <div key={section.title}>
                    <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
                    <ul className="space-y-1">
                        {section.links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-sm text-blue-600 hover:underline">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

