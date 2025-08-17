import { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

import Header from '@/components/Header/Header';

import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/contexts/theme/ThemeProvider';
import Providers from '@/store/Providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'RSS: Star Wars React App',
  description: 'Rolling Scopes School Educational Project: Star Wars App',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <div id="root" className="px-5 py-4">
          <Providers>
            <ThemeProvider>
              <NextIntlClientProvider>
                <Header />

                <main>{children}</main>
              </NextIntlClientProvider>
            </ThemeProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
