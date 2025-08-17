'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    const qs = searchParams?.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { locale: nextLocale });
  };

  return (
    <select
      onChange={handleChange}
      value={locale}
      className="rounded border px-2 py-1"
    >
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  );
}
