// RootLayout.tsx
import MuiThemeProvider from '@/components/providers/MuiThemeProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import { Toaster } from '@/components/ui/toaster';
import { DashboardProvider } from '@/context/DashboardContext';
import { ClerkProvider } from '@clerk/nextjs';
import { GoogleTagManager } from '@next/third-parties/google';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Nunito } from 'next/font/google';
import React from 'react';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '../app/api/uploadthing/core';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './globals.css';
import ogImage from './opengraph-image.png';

const baseUrl = process.env.VERCEL_URL
  ? new URL('https://www.thecodercollective.com')
  : new URL(`http://localhost:${process.env.PORT || 3000}`);

export const metadata = {
  metadataBase: baseUrl,
  title: 'Coder Collective',
  description:
    'A network empowering Software Engineers to help fellow SWE professionals find their next job',
  openGraph: {
    title: 'Coder Collective',
    description:
      'A network empowering Software Engineers to help fellow SWE professionals find their next job',
    url: 'https://www.thecodercollective.com/',
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
};

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <MuiThemeProvider>
        <QueryProvider>
          <DashboardProvider>
            <html lang="en">
              <body className={nunito.className}>
                <GoogleTagManager gtmId="GTM-KJMFWKDP" />
                <div className="flex flex-col min-h-screen">
                  <NextSSRPlugin
                    routerConfig={extractRouterConfig(ourFileRouter)}
                  />
                  <Header />
                  <main className="flex-grow w-full">
                    {children}
                  </main>
                  <Footer />
                  <Toaster />
                </div>
                <SpeedInsights />
                <Analytics />
              </body>
            </html>
          </DashboardProvider>
        </QueryProvider>
      </MuiThemeProvider>
    </ClerkProvider>
  );
}