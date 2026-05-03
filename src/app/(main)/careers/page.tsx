import InfoPageLayout, { Section } from "@/components/InfoPageLayout";

export const metadata = { title: "Careers - KNEX" };

export default function CareersPage() {
    return (
        <InfoPageLayout 
            titleEn="Careers" 
            titleBn="ক্যারিয়ার"
            subtitleEn="Join our growing team"
            subtitleBn="আমাদের ক্রমবর্ধমান টিমে যোগ দিন"
        >
            <Section 
                titleEn="Why Work With Us?"
                titleBn="কেন আমাদের সাথে কাজ করবেন?"
                childrenEn={<p>At KNEX, we believe in fostering innovation, growth, and a collaborative work environment.</p>}
                childrenBn={<p>KNEX-এ আমরা উদ্ভাবন, প্রবৃদ্ধি এবং একটি সহযোগিতামূলক কাজের পরিবেশে বিশ্বাস করি।</p>}
            />
            <Section 
                titleEn="Current Openings"
                titleBn="বর্তমান সুযোগসমূহ"
                childrenEn={<p>We&apos;re always looking for talented individuals. Check back soon for open positions or send your resume to careers@knex.com.bd</p>}
                childrenBn={<p>আমরা সর্বদা মেধাবী ব্যক্তিদের খুঁজছি। খোলা পদের জন্য শীঘ্রই আবার দেখুন বা আপনার জীবনবৃত্তান্ত careers@knex.com.bd-এ পাঠান।</p>}
            />
            <Section 
                titleEn="Benefits"
                titleBn="সুবিধাসমূহ"
                childrenEn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>Competitive salary</li>
                        <li>Health insurance</li>
                        <li>Flexible working hours</li>
                        <li>Growth opportunities</li>
                    </ul>
                }
                childrenBn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>প্রতিযোগিতামূলক বেতন</li>
                        <li>স্বাস্থ্য বীমা</li>
                        <li>নমনীয় কাজের সময়</li>
                        <li>উন্নতির সুযোগ</li>
                    </ul>
                }
            />
        </InfoPageLayout>
    );
}

