import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import PageWrapper from "@/components/layout/PageWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DeCode.io",
  description: "Master coding challenges daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen bg-decode-bg text-white antialiased flex flex-col`}>

        {/* Main Content Wrapper */}
        <main className="flex-1 relative overflow-hidden flex flex-col h-screen md:pl-72">
          {/* Background gradients aligned with layout columns - Persistent across pages */}
          <div className="absolute inset-0 flex pointer-events-none z-0">
            <div className="flex-1 bg-decode-blue-1/10"></div>
            <div className="flex-1 bg-decode-blue-2/10"></div>
            <div className="flex-1 bg-decode-blue-3/10"></div>
            <div className="flex-1 bg-decode-blue-1/10"></div>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f2e] via-transparent to-[#1a1f2e]/80"></div>
          </div>

          {/* Scrollable Content Area */}
          <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden p-6 pb-28 md:p-14 md:pb-32 lg:p-20 scrollbar-hide">
            <div className="max-w-5xl mx-auto w-full">
              <PageWrapper>
                {children}
              </PageWrapper>
            </div>
          </div>

          <Sidebar />
        </main>
      </body>
    </html>
  );
}
