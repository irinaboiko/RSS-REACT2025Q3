import { NextRequest } from 'next/server';

import type { PersonPreview } from '@/types/person';

export async function POST(req: NextRequest) {
  const { selectedPeople } = (await req.json()) as {
    selectedPeople: PersonPreview[];
  };

  const sorted = [...selectedPeople].sort(
    (a, b) => Number(a.uid) - Number(b.uid)
  );

  const header = ['Id', 'Name', 'Details URL'];
  const rows = sorted.map((p) => [p.uid, p.name, p.url ?? '']);
  const csv = [header, ...rows].map((r) => r.join(',')).join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
    },
  });
}
