import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSetupById, getAllSetups } from "@/features/catalog/services/recommendationEngine";
import { SetupDetailView } from "@/features/catalog/components/detail/SetupDetailView";

interface SetupPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: SetupPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const setup = getSetupById(id);

  if (!setup) return { title: "Setup Not Found | AstroAssist AI" };

  const name = locale === "es" ? setup.nameEs : setup.nameEn;
  const description = locale === "es" ? setup.descriptionEs : setup.descriptionEn;

  return {
    title: `${name} | Curated Setup | AstroAssist AI`,
    description: description,
    openGraph: {
      title: `${name} | AstroAssist AI`,
      description: description,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const setups = getAllSetups();
  const locales = ["en", "es"];

  return locales.flatMap((locale) =>
    setups.map((setup) => ({
      locale,
      id: setup.id,
    }))
  );
}

export default async function SetupPage({ params }: SetupPageProps) {
  const { id, locale } = await params;
  const setup = getSetupById(id);

  if (!setup) {
    notFound();
  }

  return <SetupDetailView setup={setup} locale={locale} />;
}
