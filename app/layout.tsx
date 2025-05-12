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
  title: "HubStore",
  description: "One stop shop for all products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
