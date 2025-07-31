import type { PersonPreview } from '@/types/person';

export const downloadCsv = (people: PersonPreview[]) => {
  if (!people.length) return;

  const sortedPeople: PersonPreview[] = [...people].sort((a, b) =>
    a.uid.localeCompare(b.uid)
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

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
