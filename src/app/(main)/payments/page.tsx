import InfoPageLayout, { Section } from "@/components/InfoPageLayout";

export const metadata = { title: "Payments - KNEX" };

export default function PaymentsPage() {
    return (
        <InfoPageLayout
            titleEn="Payments"
            titleBn="পেমেন্ট"
            subtitleEn="Payment options and information"
            subtitleBn="পেমেন্ট পদ্ধতি এবং তথ্য"
        >
            <Section
                titleEn="Accepted Payment Methods"
                titleBn="গৃহীত পেমেন্ট পদ্ধতিসমূহ"
                childrenEn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>Cash on Delivery (COD)</li>
                        <li>bKash  (Coming soon)</li>
                        <li>Nagad  (Coming soon)</li>
                        <li>Credit/Debit Cards (Coming soon)</li>
                    </ul>
                }
                childrenBn={
                    <ul className="list-disc list-inside space-y-1">
                        <li>ক্যাশ অন ডেলিভারি (COD)</li>
                        <li>বিকাশ</li>
                        <li>নগদ</li>
                        <li>ক্রেডিট/ডেবিট কার্ড (শীঘ্রই আসছে)</li>
                    </ul>
                }
            />
            <Section
                titleEn="Payment Security"
                titleBn="পেমেন্ট নিরাপত্তা"
                childrenEn={<p>All transactions are secured with industry-standard encryption to protect your information.</p>}
                childrenBn={<p>আপনার তথ্য রক্ষা করার জন্য সমস্ত লেনদেন ইন্ডাস্ট্রি-স্ট্যান্ডার্ড এনক্রিপশনের মাধ্যমে সুরক্ষিত।</p>}
            />
            <Section
                titleEn="Cash on Delivery"
                titleBn="ক্যাশ অন ডেলিভারি"
                childrenEn={<p>Pay in cash when your order arrives. Available for all locations in Bangladesh.</p>}
                childrenBn={<p>আপনার অর্ডার পৌঁছালে নগদে অর্থ প্রদান করুন। বাংলাদেশের সকল অবস্থানের জন্য উপলব্ধ।</p>}
            />
        </InfoPageLayout>
    );
}
