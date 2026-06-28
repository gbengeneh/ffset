import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "FFSET Lounge | Premium Wines, Gaming, Events",
  description:
    "FFSET Lounge is a premium entertainment lounge in Akure serving luxury wines, snooker, console gaming, social hangouts, and competitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-background" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
