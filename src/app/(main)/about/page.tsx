"use client";

import InfoPageLayout, { Section } from "@/components/InfoPageLayout";
import { Users, Target, Eye } from "lucide-react";

export default function AboutPage() {
    return (
        <InfoPageLayout 
            titleEn="About KNEX" 
            titleBn="KNEX সম্পর্কে"
            subtitleEn="Empowering consumers with quality, trust, and a seamless shopping experience."
            subtitleBn="উন্নতমানের পণ্য এবং নির্ভরযোগ্য সেবার মাধ্যমে কেনাকাটার নতুন দিগন্ত।"
        >
            <Section 
                titleEn="Who We Are"
                titleBn="আমরা কারা"
                childrenEn={
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <p>KNEX is one of Bangladesh&apos;s premier premium online shopping platforms. We are committed to bringing a wide range of quality and diverse products to the doorsteps of our customers at affordable prices. Our aim is to make shopping easy, fast and enjoyable.</p>
                    </div>
                }
                childrenBn={
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <p>KNEX বাংলাদেশের একটি অন্যতম প্রিমিয়াম অনলাইন শপিং প্ল্যাটফর্ম। আমরা সাশ্রয়ী মূল্যে মানসম্মত এবং বৈচিত্র্যময় পণ্যের সমাহার নিয়ে গ্রাহকদের দোরগোড়ায় পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো কেনাকাটাকে সহজ, দ্রুত এবং আনন্দদায়ক করে তোলা।</p>
                    </div>
                }
            />

            <Section 
                titleEn="Our Mission"
                titleBn="আমাদের লক্ষ্য"
                childrenEn={
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                            <Target className="w-6 h-6 text-indigo-600" />
                        </div>
                        <p>Our mission is to ensure a seamless shopping experience for our customers. We want to achieve every customer&apos;s satisfaction through quality products and exceptional customer service.</p>
                    </div>
                }
                childrenBn={
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                            <Target className="w-6 h-6 text-indigo-600" />
                        </div>
                        <p>আমাদের লক্ষ্য হলো গ্রাহকদের জন্য একটি নিরবচ্ছিন্ন (seamless) শপিং অভিজ্ঞতা নিশ্চিত করা। উন্নতমানের পণ্য সরবরাহ এবং অসাধারণ কাস্টমার সার্ভিসের মাধ্যমে আমরা প্রতিটি গ্রাহকের সন্তুষ্টি অর্জন করতে চাই।</p>
                    </div>
                }
            />

            <Section 
                titleEn="Our Vision"
                titleBn="আমাদের ভিশন"
                childrenEn={
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                            <Eye className="w-6 h-6 text-purple-600" />
                        </div>
                        <p>To become the symbol of highest trust in e-commerce service in Bangladesh. Our dream is to make online shopping accessible to every person in the country by making every step of shopping easier through technology.</p>
                    </div>
                }
                childrenBn={
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                            <Eye className="w-6 h-6 text-purple-600" />
                        </div>
                        <p>বাংলাদেশে ই-কমার্স সেবায় সর্বোচ্চ আস্থার প্রতীক হয়ে ওঠা। কেনাকাটার প্রতিটি ধাপকে প্রযুক্তির মাধ্যমে সহজতর করে অনলাইন শপিংকে দেশের প্রতিটি মানুষের কাছে সহজলভ্য করে তোলাই আমাদের স্বপ্ন।</p>
                    </div>
                }
            />
        </InfoPageLayout>
    );
}

