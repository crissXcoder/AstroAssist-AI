import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingChat } from "@/components/chat/FloatingChat";
import { Navbar } from "@/components/landing/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AstroAssist AI - Equipo de Astronomía",
  description: "Asistente inteligente para la tienda líder en telescopios, astrofotografía y equipos de observación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/10 via-background to-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <FloatingChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
