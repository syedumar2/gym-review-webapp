import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import SessionWrapper from "../../components/SessionWrapper";
import { Toaster } from "sonner";

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
              {children}
            </ThemeProvider>
             <Toaster />
          </body>
        </html>
      </SessionWrapper>
    </>
  );
}
