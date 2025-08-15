import { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import Header from '@/components/Header/Header';

import './globals.css';

export const metadata: Metadata = {
  title: 'RSS: Star Wars React App',
  description: 'Rolling Scopes School Educational Project: Star Wars App',
};

export default async function RootLayout({
  children,
  params,
  // details,
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
        <div id="root">
          <NextIntlClientProvider>
            <Header />

            <main>{children}</main>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
