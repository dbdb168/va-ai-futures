import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Virginia Futures — AI Readiness for Virginia Businesses",
  description:
    "Understand how AI fluency shapes Virginia's economic future across four scenarios.",
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://va-ai-futures.buildfirst.io"),
  openGraph: {
    title: "Virginia Futures — AI Readiness for Virginia Businesses",
    description:
      "How will AI reshape 780,000 Virginia small and mid-size businesses? Four plausible futures grounded in economic data and technology diffusion research.",
    siteName: "Virginia AI Futures",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/scenario-build-it-yourself.jpg",
        width: 2512,
        height: 720,
        alt: "Virginia AI Futures — scenario planning for AI readiness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virginia Futures — AI Readiness for Virginia Businesses",
    description:
      "How will AI reshape 780,000 Virginia small and mid-size businesses? Four plausible futures grounded in economic data and technology diffusion research.",
    images: ["/images/scenario-build-it-yourself.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MKWKYTLT70" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-MKWKYTLT70');`,
          }}
        />
      </head>
      <body className="bg-bg-page text-text-primary antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
