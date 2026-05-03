import InfoPageLayout, { Section } from "@/components/InfoPageLayout";

export const metadata = { title: "Returns & Refunds - KNEX" };

export default function ReturnsPage() {
    return (
        <InfoPageLayout 
            titleEn="Returns & Refunds" 
            titleBn="পণ্য ফেরত এবং রিফান্ড"
            subtitleEn="Our return policy"
            subtitleBn="আমাদের পণ্য ফেরত নীতি"
        >
            <Section 
                titleEn="Return Policy"
                titleBn="ফেরত নীতি"
                childrenEn={<p>We accept returns within 7 days of delivery for most items in original condition with packaging.</p>}
                childrenBn={<p>আমরা ডেলিভারির ৭ দিনের মধ্যে আসল অবস্থায় এবং প্যাকেজিং সহ বেশিরভাগ পণ্যের ফেরত গ্রহণ করি।</p>}
            />
            <Section 
                titleEn="How to Return"
                titleBn="কীভাবে ফেরত দেবেন"
                childrenEn={
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Contact our support team</li>
                        <li>Provide your order number and reason</li>
                        <li>We&apos;ll arrange pickup or provide return instructions</li>
                    </ol>
                }
                childrenBn={
                    <ol className="list-decimal list-inside space-y-1">
                        <li>আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন</li>
                        <li>আপনার অর্ডার নম্বর এবং কারণ প্রদান করুন</li>
                        <li>আমরা পিকআপের ব্যবস্থা করব বা ফেরতের নির্দেশাবলী প্রদান করব</li>
                    </ol>
                }
            />
            <Section 
                titleEn="Refund Process"
                titleBn="রিফান্ড প্রক্রিয়া"
                childrenEn={<p>Refunds are processed within 5-7 business days after we receive the returned item.</p>}
                childrenBn={<p>আমরা ফেরত দেওয়া পণ্যটি পাওয়ার পরে ৫-৭ কার্যদিবসের মধ্যে রিফান্ড প্রক্রিয়া করা হয়।</p>}
            />
            <Section 
                titleEn="Non-Returnable Items"
                titleBn="অ-ফেরতযোগ্য পণ্যসমূহ"
                childrenEn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>Perishable goods</li>
                        <li>Personal care items</li>
                        <li>Customized products</li>
                    </ul>
                }
                childrenBn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>পচনশীল পণ্য</li>
                        <li>ব্যক্তিগত যত্নের পণ্য</li>
                        <li>কাস্টমাইজড পণ্য</li>
                    </ul>
                }
            />
        </InfoPageLayout>
    );
}

