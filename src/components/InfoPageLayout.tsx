"use client";

import { ArrowLeft, Globe, ChevronRight, Mail, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, createContext, useContext } from "react";

interface LanguageContextType {
    lang: "en" | "bn";
}

const LanguageContext = createContext<LanguageContextType>({ lang: "en" });
export const useLanguage = () => useContext(LanguageContext);

interface InfoPageLayoutProps {
    titleEn: string;
    titleBn?: string;
    subtitleEn?: string;
    subtitleBn?: string;
    children: ReactNode;
}

const NAVIGATION_GROUPS = [
    {
        titleEn: "ABOUT",
        titleBn: "আমাদের সম্পর্কে",
        links: [
            { nameEn: "About Us", nameBn: "আমাদের সম্পর্কে", href: "/about" },
            { nameEn: "Careers", nameBn: "ক্যারিয়ার", href: "/careers" },
            { nameEn: "Press", nameBn: "প্রেস", href: "/press" },
            { nameEn: "Corporate Info", nameBn: "কর্পোরেট তথ্য", href: "/corporate" },
        ]
    },
    {
        titleEn: "HELP",
        titleBn: "সহায়তা",
        links: [
            { nameEn: "Payments", nameBn: "পেমেন্ট", href: "/payments" },
            { nameEn: "Shipping", nameBn: "ডেলিভারি", href: "/shipping" },
            { nameEn: "Returns", nameBn: "ফেরত", href: "/returns" },
            { nameEn: "FAQ", nameBn: "প্রশ্নোত্তর", href: "/faq" },
        ]
    },
    {
        titleEn: "POLICY",
        titleBn: "নীতিমালা",
        links: [
            { nameEn: "Privacy Policy", nameBn: "গোপনীয়তা নীতি", href: "/privacy" },
            { nameEn: "Terms of Use", nameBn: "ব্যবহারের শর্তাবলী", href: "/terms" },
            { nameEn: "Security", nameBn: "নিরাপত্তা", href: "/security" },
            { nameEn: "Sitemap", nameBn: "সাইটম্যাপ", href: "/site-map" },
        ]
    }
];

export default function InfoPageLayout({
    titleEn,
    titleBn,
    subtitleEn,
    subtitleBn,
    children
}: InfoPageLayoutProps) {
    const [lang, setLang] = useState<"en" | "bn">("en");
    const pathname = usePathname();

    const toggleLang = () => setLang(prev => prev === "en" ? "bn" : "en");

    const currentTitle = lang === "en" ? titleEn : (titleBn || titleEn);
    const currentSubtitle = lang === "en" ? subtitleEn : (subtitleBn || subtitleEn);

    const uiLabels = {
        back: lang === "en" ? "Back to Shopping" : "শপিংয়ে ফিরে যান",
        helpTitle: lang === "en" ? "Need More Help?" : "আরও সহায়তা প্রয়োজন?",
        helpDesc: lang === "en" ? "Our support team is available 24/7" : "আমাদের সাপোর্ট টিম ২৪/৭ আপনার সেবায় নিয়োজিত",
        contactBtn: lang === "en" ? "Contact Support" : "সাপোর্টে কথা বলুন"
    };

    return (
        <LanguageContext.Provider value={{ lang }}>
            <div className="min-h-screen bg-gray-50/50 font-sans">
                {/* Header Nav */}
                <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {uiLabels.back}
                        </Link>

                        <button
                            onClick={toggleLang}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg shadow-xs hover:bg-white transition-all group"
                        >
                            <Globe className="w-4 h-4 text-blue-500 group-hover:rotate-12 transition-transform" />
                            <span className="text-xs font-bold text-gray-700">
                                {lang === "en" ? "বাংলা" : "English"}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Navigation */}
                        <aside className="lg:w-64 shrink-0 space-y-8">
                            {NAVIGATION_GROUPS.map((group) => (
                                <div key={group.titleEn}>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        {lang === "en" ? group.titleEn : group.titleBn}
                                    </h3>
                                    <nav className="space-y-1">
                                        {group.links.map((link) => {
                                            const isActive = pathname === link.href;
                                            return (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${isActive
                                                        ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-100"
                                                        : "text-gray-600 hover:bg-white hover:text-blue-600"
                                                        }`}
                                                >
                                                    {lang === "en" ? link.nameEn : link.nameBn}
                                                    <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "opacity-100" : ""}`} />
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>
                            ))}

                            {/* Help Box */}
                            <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
                                <MessageSquare className="w-8 h-8 mb-4 opacity-80" />
                                <h4 className="font-bold mb-2">{uiLabels.helpTitle}</h4>
                                <p className="text-xs text-blue-100 mb-6 leading-relaxed">
                                    {uiLabels.helpDesc}
                                </p>
                                <Link
                                    href="tel:+8809647700001"
                                    className="block w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-center text-sm font-semibold transition-colors border border-white/10"
                                >
                                    {uiLabels.contactBtn}
                                </Link>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <main className="flex-1">
                            {/* Hero Typography */}
                            <div className="mb-12">
                                <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                                    {currentTitle}
                                </h1>
                                {currentSubtitle && (
                                    <p className="text-lg text-gray-500 font-medium">
                                        {currentSubtitle}
                                    </p>
                                )}
                            </div>

                            <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm min-h-[500px]">
                                <article className="prose prose-gray max-w-none prose-p:text-gray-600 prose-headings:text-gray-900 prose-li:text-gray-600 prose-strong:text-gray-900">
                                    {children}
                                </article>
                            </div>

                            {/* Footer Contact Info */}
                            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email Support</p>
                                        <p className="font-bold text-gray-900">info@knex.com.bd(Will Be Available Soon)</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Hotline</p>
                                        <p className="font-bold text-gray-900">+880 9647700001</p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </LanguageContext.Provider>
    );
}

interface SectionProps {
    titleEn: string;
    titleBn?: string;
    childrenEn: ReactNode;
    childrenBn?: ReactNode;
}

export function Section({ titleEn, titleBn, childrenEn, childrenBn }: SectionProps) {
    const { lang } = useLanguage();

    const currentTitle = lang === "en" ? titleEn : (titleBn || titleEn);
    const currentChildren = lang === "en" ? childrenEn : (childrenBn || childrenEn);

    return (
        <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full" />
                {currentTitle}
            </h2>
            <div className="text-gray-600 leading-relaxed">
                {currentChildren}
            </div>
        </section>
    );
}
