import "reflect-metadata";
import { TanStackProvider } from "@/shared/providers/tanstack-provider";
import { AuthProvider } from "@/features/auth";
import { getDictionary, Locale } from "@/lib/i18n";
import { Footer } from "@/features/landing/components/Footer";
import { CartProvider } from "@/features/cart";
import { I18nProvider } from "@/shared/providers/i18n-provider";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { Navbar } from "@/features/landing/components/Navbar";
import { FloatingChat } from "@/features/chat";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0b0f19",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "AstroAssist AI | Equipamiento Astronómico Premium",
    template: "%s | AstroAssist AI"
  },
  description: "Explora el universo con nuestro hardware óptico de élite. Descubre telescopios, monturas ecuatoriales y astrofotografía impulsados por el primer Asistente de IA astronómico.",
  keywords: ["astronomía", "telescopios", "astrofotografía", "comprar telescopio", "AstroAssist", "ZWO", "Celestron", "cielo profundo"],
  authors: [{ name: "AstroAssist Team" }],
  creator: "AstroAssist Technologies",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://astroassist.vercel.app",
    title: "AstroAssist AI | Tu Ventana al Cosmos",
    description: "Equipamiento óptico de alta gama respaldado por una Inteligencia Artificial especializada en astronomía.",
    siteName: "AstroAssist AI",
    images: [{
      url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1600&auto=format&fit=crop",
      width: 1200,
      height: 630,
      alt: "AstroAssist AI - Equipamiento Astronómico"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroAssist AI | Equipamiento Astronómico",
    description: "Hardware óptico validado por inteligencia artificial.",
    creator: "@AstroAssistApp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased relative`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-1000 antialiased overflow-x-hidden relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          {/* Global Cinematic Background System */}
          <div className="fixed inset-0 z-[-1] pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(98,87,244,0.08),transparent_80%)]" />
          <div className="fixed inset-0 z-[-1] pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.04),transparent_60%)]" />
          
          <I18nProvider dictionary={dictionary} locale={locale as Locale}>
            <TanStackProvider>
              <AuthProvider>
                <CartProvider>
                  <Navbar />
                  <CartDrawer />
                  {children}
                  <Footer />
                  <FloatingChat />
                </CartProvider>
              </AuthProvider>
            </TanStackProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
