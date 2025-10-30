import type { FunctionComponent, PropsWithChildren } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { ThemeSwitcher } from "~/app/components/theme-switcher";

import "./globals.css";

import { headers } from "next/headers";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const RootLayout: FunctionComponent<PropsWithChildren> = async ({
  children,
}) => {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
          nonce={nonce}
        >
          {children}
          <footer className="mx-auto flex w-full items-center justify-center border-t py-16 text-center text-xs">
            <ThemeSwitcher />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
