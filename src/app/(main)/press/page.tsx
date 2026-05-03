import InfoPageLayout, { Section } from "@/components/InfoPageLayout";

export const metadata = { title: "Press - KNEX" };

export default function PressPage() {
    return (
        <InfoPageLayout 
            titleEn="Press" 
            titleBn="প্রেস"
            subtitleEn="Media resources and news"
            subtitleBn="মিডিয়া রিসোর্স এবং সংবাদ"
        >
            <Section 
                titleEn="Press Inquiries"
                titleBn="প্রেস ইনকোয়ারি"
                childrenEn={<p>For media inquiries, please contact our PR team at press@knex.com.bd</p>}
                childrenBn={<p>মিডিয়া ইনকোয়ারির জন্য, দয়া করে আমাদের পিআর টিমের সাথে press@knex.com.bd-এ যোগাযোগ করুন।</p>}
            />
            <Section 
                titleEn="Brand Assets"
                titleBn="ব্র্যান্ড অ্যাসেট"
                childrenEn={<p>Our brand guidelines and logo assets are available upon request for authorized media use.</p>}
                childrenBn={<p>অনুমোদিত মিডিয়া ব্যবহারের জন্য অনুরোধ সাপেক্ষে আমাদের ব্র্যান্ড গাইডলাইন এবং লোগো অ্যাসেট পাওয়া যাবে।</p>}
            />
            <Section 
                titleEn="Recent News"
                titleBn="সাম্প্রতিক সংবাদ"
                childrenEn={<p>Stay tuned for our latest announcements and press releases.</p>}
                childrenBn={<p>আমাদের সর্বশেষ ঘোষণা এবং প্রেস রিলিজের জন্য আমাদের সাথেই থাকুন।</p>}
            />
        </InfoPageLayout>
    );
}

