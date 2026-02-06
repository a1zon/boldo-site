import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Boldo QA Agency",
  description: "Reliable manual testing for video SaaS and social shopping projects",
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon.svg?v=2",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "min-h-screen bg-background text-foreground antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
