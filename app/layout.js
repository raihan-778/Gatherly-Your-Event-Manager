import { Navbar } from "@/components/Navbar";
import localFont from "next/font/local";
import "./globals.css";
import { dbConnect } from "../service/mongo";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Gatherly | Learn with Sumit",
  description: "Gatherly your event management console",
};

export default async function RootLayout({ children }) {
  dbConnect();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main class="py-8">{children}</main>
      </body>
    </html>
  );
}
