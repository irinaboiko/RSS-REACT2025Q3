'use client';

import clsx from 'clsx';

import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import { useTranslations } from 'next-intl';

import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('links');

  return (
    <header className="mb-8 flex items-center justify-between py-1">
      <div>
        <Link href="/">
          <img
            src="/images/header-star-wars-logo.webp"
            alt="Star Wars Logo"
            className="h-10"
          />
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeSwitcher />

        <Link
          href="/about"
          className={clsx('link text-xl', {
            'link-active': pathname === '/about',
          })}
        >
          {t('about')}
        </Link>
      </nav>
    </header>
  );
}
