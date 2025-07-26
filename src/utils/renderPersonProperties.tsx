import type { PersonProperties } from '@/types/person';

const EXCLUDED_KEYS = [
  'created',
  'edited',
  'homeworld',
  'url',
  'films',
  'species',
  'starships',
  'vehicles',
];

export const renderPersonProperties = (properties?: PersonProperties) => {
  if (!properties) return null;

  return Object.entries(properties)
    .filter(([key]) => !EXCLUDED_KEYS.includes(key))
    .map(([key, value]) => {
      const formattedKey = key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return (
        <p key={key} className="mb-1">
          <span className="font-semibold">{formattedKey}:</span>{' '}
          {value || 'N/A'}
        </p>
      );
    });
};
