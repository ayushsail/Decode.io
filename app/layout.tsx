import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Keep Inter or switch to JetBrains if desired for main? Request says "Typography" might change but Inter is safe for UI.
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import PageWrapper from "@/components/layout/PageWrapper";
import { UserProvider } from "@/context/UserContext";

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
      <body className={`${inter.variable} font-sans min-h-screen bg-decode-bg text-decode-text-primary antialiased flex flex-col selection:bg-decode-accent/30 selection:text-decode-accent`}>
        <UserProvider>
          {/* Main Content Wrapper */}
          <main className="flex-1 relative overflow-hidden flex flex-col h-screen md:pl-72">
            {/* Background - Deep Aesthetic */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-decode-bg"></div>
              <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-decode-primary/5 blur-[120px] rounded-full mix-blend-screen"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-decode-accent/5 blur-[100px] rounded-full mix-blend-screen"></div>
              <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] bg-decode-blue-3/5 blur-[80px] rounded-full mix-blend-screen"></div>
            </div>

            {/* Scrollable Content Area */}
            <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden p-6 pb-28 md:p-10 lg:p-12 scrollbar-hide">
              <div className="max-w-6xl mx-auto w-full">
                <PageWrapper>
                  {children}
                </PageWrapper>
              </div>
            </div>

            <Sidebar />
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
