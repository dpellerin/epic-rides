import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Epic Rides",
  description: "Motorcycle ride stories, routes, and photo journals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
