import { useTranslations } from 'next-intl';

import PersonPreviewCard from '@/components/PersonPreviewCard/PersonPreviewCard';
import Flyout from '@/components/Flyout/Flyout';

import type { PersonPreview } from '@/types/person';

export interface ResultListProps {
  people: PersonPreview[];
}

export default function ResultList({ people }: ResultListProps) {
  const t = useTranslations('results');

  return (
    <div className="flex grow flex-col">
      <>
        {people.length > 0 ? (
          <>
            <h2 className="text-accent mb-2 text-2xl">{t('heading')}</h2>

            <div className="flex grow flex-col gap-3">
              {people.map((person) => (
                <PersonPreviewCard key={person.uid} person={person} />
              ))}
            </div>

            <Flyout />
          </>
        ) : (
          <p className="text-xl">{t('noFoundMessage')}</p>
        )}
      </>
    </div>
  );
}
