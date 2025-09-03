import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import Navbar from "@/components/ui/navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home - CMT",
  description: "",
};

export default function BagLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

{
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <Navbar isNavbar={true}/>
        <main>
        {children}

        </main>
      </body>
    </html>
  );
}
