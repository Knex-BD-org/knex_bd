"use client";

import InfoPageLayout, { useLanguage } from "@/components/InfoPageLayout";
import { ChevronDown } from "lucide-react";

const faqsEn = [
    { q: "How do I place an order?", a: "Browse products, add to cart, and proceed to checkout. You'll need to create an account or login to complete your order." },
    { q: "What payment methods do you accept?", a: "We accept Cash on Delivery (COD),( bKash, and Nagad.)-- Comming Soon" },
    { q: "How long does delivery take?", a: "1-2 days inside Dhaka, 3-5 days outside Dhaka." },
    { q: "Can I cancel my order?", a: "Yes, you can cancel before the order is shipped. Contact support for assistance." },
    { q: "How do I track my order?", a: "Login to your account and visit 'My Orders' to see your order status." },
    { q: "What if I receive a damaged product?", a: "Contact us within 24 hours with photos of the damage for a replacement or refund." },
];

const faqsBn = [
    { q: "আমি কিভাবে অর্ডার করব?", a: "পণ্য দেখুন, কার্টে যোগ করুন এবং চেকআউটে এগিয়ে যান। আপনার অর্ডারটি সম্পন্ন করতে আপনাকে একটি অ্যাকাউন্ট তৈরি করতে হবে বা লগইন করতে হবে।" },
    { q: "আপনারা কি কি পেমেন্ট মেথড গ্রহণ করেন?", a: "আমরা ক্যাশ অন ডেলিভারি (COD), বিকাশ এবং নগদ গ্রহণ করি।" },
    { q: "ডেলিভারি হতে কতক্ষণ সময় লাগে?", a: "ঢাকার ভেতরে ১-২ দিন, ঢাকার বাইরে ৩-৫ দিন।" },
    { q: "আমি কি আমার অর্ডার বাতিল করতে পারি?", a: "হ্যাঁ, অর্ডার পাঠানোর আগে আপনি বাতিল করতে পারেন। সহায়তার জন্য সাপোর্টে যোগাযোগ করুন।" },
    { q: "আমি কিভাবে আমার অর্ডার ট্র্যাক করব?", a: "আপনার অ্যাকাউন্টে লগইন করুন এবং আপনার অর্ডারের স্থিতি দেখতে 'My Orders' এ যান।" },
    { q: "আমি যদি একটি ক্ষতিগ্রস্ত পণ্য পাই তবে কি হবে?", a: "প্রতিস্থাপন বা ফেরতের জন্য ক্ষতির ছবিসহ ২৪ ঘন্টার মধ্যে আমাদের সাথে যোগাযোগ করুন।" },
];

export default function FAQPage() {
    return (
        <InfoPageLayout
            titleEn="FAQ"
            titleBn="সাধারণ জিজ্ঞাসাবলী"
            subtitleEn="Frequently asked questions"
            subtitleBn="বিস্তাতির জানতে নিচের প্রশ্নগুলো দেখুন"
        >
            <FAQList />
        </InfoPageLayout>
    );
}

function FAQList() {
    const { lang } = useLanguage();
    const faqs = lang === "en" ? faqsEn : faqsBn;

    return (
        <div className="space-y-3">
            {faqs.map((faq, i) => (
                <details key={i} className="group border border-gray-200 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                        <span className="font-medium text-gray-800 text-sm">{faq.q}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="px-4 pb-4 text-sm text-gray-600">{faq.a}</p>
                </details>
            ))}
        </div>
    );
}
