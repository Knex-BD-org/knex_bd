import InfoPageLayout, { Section } from "@/components/InfoPageLayout";

export const metadata = { title: "Terms of Use - KNEX" };

export default function TermsPage() {
    return (
        <InfoPageLayout 
            titleEn="Terms of Use" 
            titleBn="ব্যবহারের শর্তাবলী"
            subtitleEn="Last updated: February 2026"
            subtitleBn="সর্বশেষ আপডেট: ফেব্রুয়ারি ২০২৬"
        >
            <Section 
                titleEn="Acceptance of Terms"
                titleBn="শর্তাবলীর স্বীকৃতি"
                childrenEn={<p>By accessing and using KNEX, you agree to be bound by these terms and conditions.</p>}
                childrenBn={<p>KNEX অ্যাক্সেস এবং ব্যবহার করে, আপনি এই শর্তাবলী দ্বারা আবদ্ধ হতে সম্মত হন।</p>}
            />
            <Section 
                titleEn="User Accounts"
                titleBn="ব্যবহারকারী অ্যাকাউন্ট"
                childrenEn={<p>You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.</p>}
                childrenBn={<p>আপনি আপনার অ্যাকাউন্টের তথ্যের গোপনীয়তা রক্ষা এবং আপনার অ্যাকাউন্টের অধীনে সমস্ত কার্যকলাপের জন্য দায়ী।</p>}
            />
            <Section 
                titleEn="Orders and Payments"
                titleBn="অর্ডার এবং পেমেন্ট"
                childrenEn={<p>All orders are subject to product availability. Prices are in BDT and may change without notice.</p>}
                childrenBn={<p>সমস্ত অর্ডার পণ্যের প্রাপ্যতার সাপেক্ষে। মূল্যসমূহ বিডিটি (BDT)-তে এবং নোটিশ ছাড়াই পরিবর্তিত হতে পারে।</p>}
            />
            <Section 
                titleEn="Prohibited Activities"
                titleBn="নিষিদ্ধ কার্যক্রম"
                childrenEn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>Fraudulent transactions</li>
                        <li>Misuse of promotional offers</li>
                        <li>Violation of intellectual property rights</li>
                    </ul>
                }
                childrenBn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>প্রতারণামূলক লেনদেন</li>
                        <li>প্রমোশনাল অফারের অপব্যবহার</li>
                        <li>মেধা সম্পত্তি অধিকার লঙ্ঘন</li>
                    </ul>
                }
            />
            <Section 
                titleEn="Limitation of Liability"
                titleBn="দায়বদ্ধতার সীমাবদ্ধতা"
                childrenEn={<p>KNEX shall not be liable for any indirect, incidental, or consequential damages arising from use of our services.</p>}
                childrenBn={<p>আমাদের পরিষেবা ব্যবহারের ফলে উদ্ভূত কোনো পরোক্ষ, আনুষঙ্গিক বা ফলস্বরূপ ক্ষতির জন্য KNEX দায়ী থাকবে না।</p>}
            />
        </InfoPageLayout>
    );
}

