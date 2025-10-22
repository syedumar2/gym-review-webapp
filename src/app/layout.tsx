import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import SessionWrapper from "../../components/SessionWrapper";
import { Toaster } from "sonner";
import QueryProvider from "@/components/QueryProvider";

export default function RootLayout({ children }: any) {
  return (
    <>
      <SessionWrapper>
        <html lang="en" suppressHydrationWarning className={inter.className}>
          <head />
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <QueryProvider>{children}</QueryProvider>
              
            </ThemeProvider>
            <Toaster richColors position="top-center" />
          </body>
        </html>
      </SessionWrapper>
    </>
  );
}
