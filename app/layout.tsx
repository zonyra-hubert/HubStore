import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Nav from "@/components/navigation/nav";

import { ThemeProvider } from "@/components/providers/theme-provider";
import Toaster from "@/components/ui/toaster";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FindIt - Your Ultimate Rental Hub",
  icons: {
    icon: "/profile1.jpg", // Path relative to /public
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6078391316220781"
          crossorigin="anonymous"
        ></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6078391316220781"
          crossorigin="anonymous"
        ></script>
      </head>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-grow px-6 md:px-12 mx-auto max-8xl mb-5">
            <Nav />
            <Toaster />

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
