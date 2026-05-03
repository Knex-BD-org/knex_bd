import InfoPageLayout, { Section } from "@/components/InfoPageLayout";

export const metadata = { title: "Privacy Policy - KNEX" };

export default function PrivacyPage() {
    return (
        <InfoPageLayout 
            titleEn="Privacy Policy" 
            titleBn="গোপনীয়তা নীতি"
            subtitleEn="Last updated: February 2026"
            subtitleBn="সর্বশেষ আপডেট: ফেব্রুয়ারি ২০২৬"
        >
            <Section 
                titleEn="Information We Collect"
                titleBn="আমরা যে তথ্য সংগ্রহ করি"
                childrenEn={<p>We collect information you provide directly: name, email, phone number, and delivery address when you create an account or place an order.</p>}
                childrenBn={<p>আপনি যখন একটি অ্যাকাউন্ট তৈরি করেন বা অর্ডার দেন তখন আমরা সরাসরি আপনার দেওয়া তথ্য সংগ্রহ করি: নাম, ইমেল, ফোন নম্বর এবং ডেলিভারির ঠিকানা।</p>}
            />
            <Section 
                titleEn="How We Use Your Information"
                titleBn="আমরা কীভাবে আপনার তথ্য ব্যবহার করি"
                childrenEn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>Process and deliver your orders</li>
                        <li>Send order updates and notifications</li>
                        <li>Improve our services</li>
                        <li>Respond to your inquiries</li>
                    </ul>
                }
                childrenBn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>আপনার অর্ডার প্রক্রিয়া এবং বিতরণ</li>
                        <li>অর্ডার আপডেট এবং বিজ্ঞপ্তি পাঠানো</li>
                        <li>আমাদের পরিষেবা উন্নত করা</li>
                        <li>আপনার জিজ্ঞাসার উত্তর দেওয়া</li>
                    </ul>
                }
            />
            <Section 
                titleEn="Data Security"
                titleBn="তথ্য নিরাপত্তা"
                childrenEn={<p>We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>}
                childrenBn={<p>আমরা অননুমোদিত অ্যাক্সেস বা প্রকাশ থেকে আপনার ব্যক্তিগত তথ্য রক্ষা করার জন্য উপযুক্ত নিরাপত্তা ব্যবস্থা বাস্তবায়ন করি।</p>}
            />
            <Section 
                titleEn="Contact"
                titleBn="যোগাযোগ"
                childrenEn={<p>For privacy concerns, email us at privacy@knex.com.bd</p>}
                childrenBn={<p>গোপনীয়তা সংক্রান্ত উদ্বেগের জন্য, আমাদের privacy@knex.com.bd-এ ইমেল করুন।</p>}
            />
        </InfoPageLayout>
    );
}

