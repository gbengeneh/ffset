import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { RegisterModalProvider } from "@/components/register-modal";
import { SiteChrome } from "@/components/site-chrome";
import { getCompetitions } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "FFSET Lounge | Premium Wines, Gaming, Events",
  description:
    "FFSET Lounge is a premium entertainment lounge in Akure serving luxury wines, snooker, console gaming, social hangouts, and competitions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const competitions = await getCompetitions();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div className="site-background" />
        <CartProvider>
          <RegisterModalProvider competition={competitions[0] ?? null}>
            <SiteChrome>{children}</SiteChrome>
          </RegisterModalProvider>
        </CartProvider>
      </body>
    </html>
  );
}
