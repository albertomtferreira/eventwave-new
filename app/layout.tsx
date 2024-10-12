import type { Metadata } from "next";
import { Poppins } from "next/font/google"

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: `EventWave`,
  description: `EventWave is a platform for event management and ticketing`,
  icons: {
    icon: `/favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={poppins.variable}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
