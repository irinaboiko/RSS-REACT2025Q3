'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import clsx from 'clsx';

import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import { Link, usePathname } from '@/i18n/navigation';

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('links');

  return (
    <header className="mb-8 flex h-12 items-center justify-between py-1">
      <div>
        <Link href="/">
          <Image
            src="/images/header-star-wars-logo.webp"
            width={93}
            height={40}
            alt="Star Wars Logo"
            className="h-10"
            priority
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
