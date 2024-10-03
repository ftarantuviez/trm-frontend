import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/ui/components/NavBar";
import { ThemeProvider } from "@/ui/components/ThemeProvider";
import { WalletProvider } from "@/wallet/components/WalletProvider";
import { AddressesProvider } from "@/addresses/components/AddressesProvider";
import { Toaster } from "@/ui/components/Toaster";

export const metadata: Metadata = {
  title: "Blockchain Explorer",
  description: "Powered by TRM Labs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProvider>
            <AddressesProvider>
              <Toaster />
              <NavBar />
              {children}
            </AddressesProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
