import InfoPageLayout, { Section } from "@/components/InfoPageLayout";

export const metadata = { title: "Corporate Information - KNEX" };

export default function CorporatePage() {
    return (
        <InfoPageLayout 
            titleEn="Corporate Information" 
            titleBn="কর্পোরেট তথ্য"
            subtitleEn="Company details"
            subtitleBn="কোম্পানির বিবরণ"
        >
            <Section 
                titleEn="Registered Name"
                titleBn="নিবন্ধিত নাম"
                childrenEn={<p>KNEX Bangladesh Limited</p>}
                childrenBn={<p>KNEX বাংলাদেশ লিমিটেড</p>}
            />
            <Section 
                titleEn="Registered Address"
                titleBn="নিবন্ধিত ঠিকানা"
                childrenEn={<p>Dhaka, Bangladesh</p>}
                childrenBn={<p>ঢাকা, বাংলাদেশ</p>}
            />
            <Section 
                titleEn="Registration"
                titleBn="নিবন্ধন"
                childrenEn={<p>Registered under the laws of Bangladesh</p>}
                childrenBn={<p>বাংলাদেশের আইন অনুযায়ী নিবন্ধিত</p>}
            />
        </InfoPageLayout>
    );
}

