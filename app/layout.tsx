import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "sonner";
import { Analytics } from '@vercel/analytics/next';

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medi AI",
  description: "AI Medical Voice Assistant",
  icons: {
    icon: [
      { url: "/MediAI3.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/MediAI3.svg" }
    ]
  },
  verification: {
  google: "qS8H4Pa_vvr7LKXg_ndNbRsTbnFnQQC9Mw_qtEnvwJ4",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
        {children}
        <Analytics />
        <Toaster />
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
