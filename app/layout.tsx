import "@/styles/globals.scss";
import "swiper/scss";
import "swiper/scss/free-mode";
import "swiper/scss/thumbs";
import "swiper/scss/pagination";

import type { Metadata, Viewport } from "next";

import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import JotaiProvider from "@/shared/JotaiProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";
import ToastProvider from "@/shared/ToastProvider";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import AppRedirect from "@/components/AppRedirect";

// import NextTopLoader from "nextjs-toploader";

const beausiteFit = localFont({ src: "./fonts/BeausiteFit.otf" });

const shaheenProArabic = localFont({
  src: "./fonts/shaheenproArabic-Light-cypwbi.otf"
});

const APP_NAME = "ZOOD";
const APP_DEFAULT_TITLE = "ZOOD Real Estate";
const APP_TITLE_TEMPLATE = "%s - ZOOD Real Estate";
const APP_DESCRIPTION =
  "ZOOD Real Estate has +20 years of experience in real estate development, spanning a range of multi-disciplinary companies and large-scale projects. Stemming from this deep-rooted legacy, the leading company was launched with the aspirations and visions to establish an unrivalled trademark in the real estate development sector.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: "#161c24"
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const language = ((await cookies()).get("lang")?.value ?? "ar") as
    | "ar"
    | "en";

  const fontClass =
    language === "ar" ? shaheenProArabic.className : beausiteFit.className;

  return (
    <html lang={language} suppressHydrationWarning>
      <body className={fontClass}>
        {process.env.NODE_ENV === "production" && <AppRedirect />}
        {/* <NextTopLoader color="var(--golden)" height={2} showSpinner={false} /> */}
        <NuqsAdapter>
          <JotaiProvider language={language}>{children}</JotaiProvider>
        </NuqsAdapter>
        <ToastProvider />
        <Analytics />
        {process.env.NODE_ENV === "production" && (
          <GoogleTagManager gtmId="GTM-MSLMN8JW" />
        )}
      </body>
    </html>
  );
}
