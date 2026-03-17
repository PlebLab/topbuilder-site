import type { Metadata } from "next";
import { Be_Vietnam_Pro, IBM_Plex_Mono, Poppins } from "next/font/google";
import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const displayFont = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Top Builder Season 2 by PlebLab | Bitcoin Innovation Event Presented by Timestamp",
  description:
    "Join Top Builder Season 2, a PlebLab event presented by Timestamp. Compete, innovate, and showcase projects advancing the Bitcoin and Lightning Network ecosystems.",
  openGraph: {
    title: "Top Builder Season 2 by PlebLab",
    description:
      "A Bitcoin innovation event presented by Timestamp, focused on product builders and teams.",
    url: "https://www.topbuilder.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
