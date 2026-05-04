import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { ConfirmationView } from "../../../../features/checkout/components/ConfirmationView";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict.checkout;
  
  return {
    title: `${t.order_received} | AstroAssist AI`,
    description: t.success_desc,
  };
}

interface ConfirmationPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { orderId } = await searchParams;

  return (
    <div className="container-max mx-auto pt-32 pb-20 px-6">
      <ConfirmationView orderId={orderId} />
    </div>
  );
}
