import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import "./globals.css";


export default function RootLayout({ children }: any) {
  return (
    <>
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
        </body>
      </html>
    </>
  );
}
