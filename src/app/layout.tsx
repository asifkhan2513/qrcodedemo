import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThreeBackground from "@/components/ThreeBackground";
import LocomotiveScrollProvider from "@/components/LocomotiveScrollProvider";
import GSAPAnimations from "@/components/GSAPAnimations";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maazster tech",
  description: "Generated maazster tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ position: "relative", zIndex: 1 }}
      >
         <video
          autoPlay
          muted
          loop
          playsInline
          id="bg-video"
          className="fixed top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none"
        >
          <source src="/videos/maazster.mp4" type="video/mp4" />
          Your browser  support the video tag.
        </video>
        <ErrorBoundary>
          {/* <ThreeBackground /> */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <LocomotiveScrollProvider>
              <GSAPAnimations>{children}</GSAPAnimations>
            </LocomotiveScrollProvider>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
