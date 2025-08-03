import type { PersonPreview } from '@/types/person';

export const generateCsvBlob = (
  people: PersonPreview[]
): { blob: Blob; fileName: string } => {
  const sortedPeople: PersonPreview[] = [...people].sort(
    (a, b) => Number(a.uid) - Number(b.uid)
  );

  const headers = ['Id', 'Name', 'Details URL'];
  const rows = sortedPeople.map((person) => [
    person.uid,
    person.name,
    person.url,
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const fileName = `STAR_WARS_PEOPLE_${people.length}_item${people.length > 1 ? 's' : ''}.csv`;

  return { blob, fileName };
};
