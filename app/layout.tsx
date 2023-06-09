import "@/styles/globals.css";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Toaster } from "@/components/ui/toaster";
import SideBar from "@/components/sidebar";
import { SiteHeader } from "@/components/site-header";
import { StyleSwitcher } from "@/components/style-switcher";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen">
              {/* OLD layout
              <SiteHeader />
              <div className="flex-1">{children}</div> 
              */}
              <div className="grid grid-cols-6">
                <div className="col-span-1 __TODO__bg-gray-100">
                  <SideBar />
                </div>
                <div className="col-span-5  min-w-full">
                  <Breadcrumbs />
                  {children}
                </div>
              </div>
            </div>
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
          <StyleSwitcher />
        </body>
      </html>
    </>
  );
}
