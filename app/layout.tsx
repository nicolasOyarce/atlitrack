import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/components/ui/toaster"

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin AtliTrack",
  description: "Test app Admin AtliTrack",
};


import { AuthProvider } from "@/app/api/auth/login/route"; // Asegúrate de importar correctamente el AuthProvider
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </AuthProvider>
  );
}