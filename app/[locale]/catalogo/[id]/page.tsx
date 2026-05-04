import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productService } from "@/features/catalog/services/productService";
import { ProductDetailView } from "@/features/catalog/components/detail/ProductDetailView";

interface ProductPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const product = await productService.getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | AstroAssist AI",
    };
  }

  const name = locale === "es" ? product.nameEs : product.nameEn;
  const description = locale === "es" ? product.descriptionEs : product.descriptionEn;

  return {
    title: `${name} | AstroAssist AI`,
    description: description.substring(0, 160),
    openGraph: {
      title: `${name} | AstroAssist AI`,
      description: description.substring(0, 160),
      images: [{ url: product.images.primary }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | AstroAssist AI`,
      description: description.substring(0, 160),
      images: [product.images.primary],
    },
  };
}

export async function generateStaticParams() {
  const products = await productService.getProducts();
  const locales = ["en", "es"];

  return locales.flatMap((locale) =>
    products.map((product) => ({
      locale,
      id: product.id,
    }))
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id, locale } = await params;
  const product = await productService.getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="relative">
      <ProductDetailView product={product} locale={locale} />
    </main>
  );
}
