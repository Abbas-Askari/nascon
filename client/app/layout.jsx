import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/components/StoreProvider";
import { Navbar } from "@/components/custom/navbar";
import { Authenticator } from "@/components/Authenticator";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NaScon",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
              >
              <Navbar />
              <Authenticator>
                <main className=" flex flex-col justify-center items-center h-screen">
                  {children}
                </main>
              </Authenticator>
            </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}