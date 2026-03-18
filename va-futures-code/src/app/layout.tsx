import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Virginia Futures — AI Readiness for Virginia Businesses",
  description:
    "Understand how AI fluency shapes Virginia's economic future across four scenarios.",
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
      </head>
      <body className="bg-bg-page text-text-primary antialiased">{children}</body>
    </html>
  );
}
