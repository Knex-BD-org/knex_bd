import InfoPageLayout, { Section } from "@/components/InfoPageLayout";

export const metadata = { title: "Shipping - KNEX" };

export default function ShippingPage() {
    return (
        <InfoPageLayout
            titleEn="Shipping"
            titleBn="ডেলিভারি তথ্য"
            subtitleEn="Delivery information"
            subtitleBn="পণ্য সরবরাহের বিস্তারিত"
        >
            <Section
                titleEn="Delivery Areas"
                titleBn="ডেলিভারি এলাকা"
                childrenEn={<p>We deliver to all districts across Bangladesh.</p>}
                childrenBn={<p>আমরা বাংলাদেশের সকল জেলায় পণ্য সরবরাহ করি।</p>}
            />
            <Section
                titleEn="Delivery Charges"
                titleBn="ডেলিভারি চার্জ"
                childrenEn={
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Inside Dhaka:</strong> Tk 60</li>
                        <li><strong>Outside Dhaka:</strong> Tk 130</li>
                    </ul>
                }
                childrenBn={
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>ঢাকার ভেতরে:</strong> ৬০ টাকা</li>
                        <li><strong>ঢাকার বাইরে:</strong> ১৩০ টাকা</li>
                    </ul>
                }
            />
            <Section
                titleEn="Delivery Time"
                titleBn="ডেলিভারি সময়"
                childrenEn={
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Inside Dhaka:</strong> 1-2 business days</li>
                        <li><strong>Outside Dhaka:</strong> 3-5 business days</li>
                    </ul>
                }
                childrenBn={
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>ঢাকার ভেতরে:</strong> ১-২ কার্যদিবস</li>
                        <li><strong>ঢাকার বাইরে:</strong> ৩-৫ কার্যদিবস</li>
                    </ul>
                }
            />
            <Section
                titleEn="Order Tracking"
                titleBn="অর্ডার ট্র্যাকিং"
                childrenEn={<p>Track your order status from your account&apos;s &quot;My Orders&quot; section.</p>}
                childrenBn={<p>আপনার অ্যাকাউন্টের &quot;My Orders&quot; বিভাগ থেকে আপনার অর্ডারের স্থিতি ট্র্যাক করুন।</p>}
            />
        </InfoPageLayout>
    );
}
