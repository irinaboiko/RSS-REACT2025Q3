import { describe, it, expect } from 'vitest';
import { calcPasswordStrength } from './calcPasswordStrength';

describe('calcPasswordStrength', () => {
  it('returns prompt for empty password', () => {
    const res = calcPasswordStrength('');
    expect(res).toEqual({
      score: 0,
      label: 'Please enter your password',
      fontColor: '',
    });
  });

  it.each([
    ['a', 1, 'Weak', 'text-red-600'],
    ['A', 1, 'Weak', 'text-red-600'],
    ['1', 1, 'Weak', 'text-red-600'],
    ['!', 1, 'Weak', 'text-red-600'],
  ])(
    'returns Weak for single-criterion password',
    (password, score, label, color) => {
      const res = calcPasswordStrength(password);
      expect(res.score).toBe(score);
      expect(res.label).toBe(label);
      expect(res.fontColor).toBe(color);
    }
  );

  it.each([
    ['aA', 2],
    ['a1', 2],
    ['a!', 2],
    ['A1', 2],
    ['A!', 2],
    ['1!', 2],
  ])('returns Weak for two criteria', (password, score) => {
    const res = calcPasswordStrength(password);
    expect(res.score).toBe(score);
    expect(res.label).toBe('Weak');
    expect(res.fontColor).toBe('text-red-600');
  });

  it.each([
    ['aA1', 3],
    ['aA!', 3],
    ['a1!', 3],
    ['A1!', 3],
  ])('returns Medium for three criteria', (password, score) => {
    const res = calcPasswordStrength(password);
    expect(res.score).toBe(score);
    expect(res.label).toBe('Medium');
    expect(res.fontColor).toBe('text-amber-400');
  });

  it('returns Strong for four criteria', () => {
    const res = calcPasswordStrength('aA1!');
    expect(res.score).toBe(4);
    expect(res.label).toBe('Strong');
    expect(res.fontColor).toBe('text-emerald-600');
  });
});
