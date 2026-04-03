import type { Metadata } from "next";
import Script from "next/script"; // Import the optimized Script component
import "./globals.css";

import Nav from "@/components/navigation/nav";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Toaster from "@/components/ui/toaster";

// Temporary Fix: Using system fonts to bypass the Google Fonts Fetch Timeout error
// You can switch back to Roboto once your network connection is stable
const fontClass = "antialiased font-sans";

export const metadata: Metadata = {
  title: "FindIt - Your Ultimate Rental Hub",
  icons: {
    icon: "/profile1.jpg",
  },
  description: "Check for all your houses or hostels for rent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6078391316220781"
          strategy="beforeInteractive" // Changed for verification
          crossOrigin="anonymous"
        />
      </head>
      <body className={fontClass}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-grow px-6 md:px-12 mx-auto max-w-8xl mb-5">
            <Nav />
            <Toaster />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
