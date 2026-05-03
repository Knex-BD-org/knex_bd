"use client";

import InfoPageLayout, { Section, useLanguage } from "@/components/InfoPageLayout";
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";

export default function SecurityPage() {
    return (
        <InfoPageLayout 
            titleEn="Security" 
            titleBn="নিরাপত্তা"
            subtitleEn="How we keep you safe"
            subtitleBn="আমরা যেভাবে আপনাকে নিরাপদ রাখি"
        >
            <SecurityFeatures />
            <Section 
                titleEn="Tips to Stay Safe"
                titleBn="নিরাপদ থাকার টিপস"
                childrenEn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>Never share your password with anyone</li>
                        <li>Use a strong, unique password</li>
                        <li>Log out after using shared devices</li>
                        <li>Report suspicious emails claiming to be from KNEX</li>
                    </ul>
                }
                childrenBn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>কখনও কারো সাথে আপনার পাসওয়ার্ড শেয়ার করবেন না</li>
                        <li>একটি শক্তিশালী এবং অনন্য পাসওয়ার্ড ব্যবহার করুন</li>
                        <li>শেয়ার্ড ডিভাইস ব্যবহার করার পর লগ আউট করুন</li>
                        <li>KNEX থেকে দাবি করা সন্দেহজনক ইমেল রিপোর্ট করুন</li>
                    </ul>
                }
            />
        </InfoPageLayout>
    );
}

function SecurityFeatures() {
    const { lang } = useLanguage();
    
    const features = [
        { 
            icon: Lock, 
            titleEn: "Secure Login", 
            titleBn: "নিরাপদ লগইন",
            descEn: "Firebase authentication protects your account",
            descBn: "ফায়ারবেস অথেন্টিকেশন আপনার অ্যাকাউন্ট রক্ষা করে"
        },
        { 
            icon: Shield, 
            titleEn: "Data Protection", 
            titleBn: "তথ্য সুরক্ষা",
            descEn: "Your data is encrypted and securely stored",
            descBn: "আপনার তথ্য এনক্রিপ্ট করা এবং নিরাপদে সংরক্ষিত"
        },
        { 
            icon: Eye, 
            titleEn: "Privacy First", 
            titleBn: "প্রাইভেসি ফার্স্ট",
            descEn: "We never share your data with third parties",
            descBn: "আমরা কখনই তৃতীয় পক্ষের সাথে আপনার তথ্য শেয়ার করি না"
        },
        { 
            icon: AlertTriangle, 
            titleEn: "Fraud Prevention", 
            titleBn: "প্রতারণা প্রতিরোধ",
            descEn: "Advanced systems detect suspicious activity",
            descBn: "উন্নত সিস্টেম সন্দেহজনক কার্যকলাপ সনাক্ত করে"
        },
    ];

    return (
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {features.map((feature) => {
                const Icon = feature.icon;
                return (
                    <div key={feature.titleEn} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-medium text-gray-800 text-sm">
                                {lang === "en" ? feature.titleEn : feature.titleBn}
                            </h3>
                            <p className="text-xs text-gray-600">
                                {lang === "en" ? feature.descEn : feature.descBn}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

