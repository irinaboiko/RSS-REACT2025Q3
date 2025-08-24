import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordStrength } from './PasswordStrength';
import { calcPasswordStrength } from '@/utils/calcPasswordStrength';

vi.mock('@/utils/calcPasswordStrength', () => ({
  calcPasswordStrength: vi.fn(() => ({
    label: 'Weak',
    fontColor: 'text-red-600',
  })),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('<PasswordStrength />', () => {
  it('renders strength label and applies class from calcPasswordStrength', () => {
    (calcPasswordStrength as ReturnType<typeof vi.fn>).mockReturnValue({
      label: 'Strong',
      fontColor: 'text-emerald-600',
    });

    render(<PasswordStrength password="P@ssw0rd!" />);

    expect(screen.getByText(/Password strength:/i)).toBeInTheDocument();

    const labelEl = screen.getByText('Strong');

    expect(labelEl).toBeInTheDocument();
    expect(labelEl).toHaveClass('text-emerald-600');
    expect(calcPasswordStrength).toHaveBeenCalledWith('P@ssw0rd!');
  });

  it('updates label/class when password prop changes', () => {
    (calcPasswordStrength as ReturnType<typeof vi.fn>)
      .mockReturnValueOnce({ label: 'Medium', fontColor: 'text-yellow-600' })
      .mockReturnValueOnce({ label: 'Weak', fontColor: 'text-red-600' });

    const { rerender } = render(<PasswordStrength password="abc123" />);

    let labelEl = screen.getByText('Medium');
    expect(labelEl).toHaveClass('text-yellow-600');

    rerender(<PasswordStrength password="a" />);

    labelEl = screen.getByText('Weak');
    expect(labelEl).toHaveClass('text-red-600');

    expect(calcPasswordStrength).toHaveBeenNthCalledWith(1, 'abc123');
    expect(calcPasswordStrength).toHaveBeenNthCalledWith(2, 'a');
  });

  it('handles empty password (edge case)', () => {
    (calcPasswordStrength as ReturnType<typeof vi.fn>).mockReturnValue({
      label: 'Empty',
      fontColor: 'text-gray-500',
    });

    render(<PasswordStrength password="" />);

    const labelEl = screen.getByText('Empty');
    expect(labelEl).toHaveClass('text-gray-500');
    expect(calcPasswordStrength).toHaveBeenCalledWith('');
  });
});
