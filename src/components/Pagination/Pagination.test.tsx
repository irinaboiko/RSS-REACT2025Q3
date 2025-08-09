import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import { Pagination } from '@/components/Pagination';

describe('Pagination', () => {
  afterEach(() => cleanup());

  it('does not render Pagination when totalPages is 1', () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders correct number of page buttons', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('highlights the current page button', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    const activeButton = screen.getByText('3');
    expect(activeButton).toHaveClass(/link-active/i);
  });

  it('calls onPageChange with correct page number on click', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />
    );

    const button = screen.getByText('1');
    fireEvent.click(button);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
