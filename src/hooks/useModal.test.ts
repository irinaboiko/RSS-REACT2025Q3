import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useModal from './useModal';

describe('useModal', () => {
  it('returns closed initial state', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);
  });

  it('openModal sets isOpen to true', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('closeModal sets isOpen to false', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
