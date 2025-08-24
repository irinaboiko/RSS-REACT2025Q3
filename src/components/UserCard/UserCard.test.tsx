import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserCard } from '@/components/UserCard/UserCard';
import { mockUsers } from '@/__tests__/mockUsers';

describe('UserCard', () => {
  it('renders main fields correctly', () => {
    const user = mockUsers[0];
    render(<UserCard user={user} isNew={false} />);

    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(`Id: ${user.id}`)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.country)).toBeInTheDocument();
    expect(screen.getByText(user.gender)).toBeInTheDocument();
    expect(screen.getByText(String(user.age))).toBeInTheDocument();
  });

  it('renders source badge correctly', () => {
    const user = mockUsers[0];
    render(<UserCard user={user} isNew={false} />);

    const source = screen.getByText('controlled');
    expect(source).toBeInTheDocument();
    expect(source).toHaveClass('bg-cyan-500');
  });

  it('shows New badge and green border', () => {
    const user = mockUsers[0];
    const { container } = render(<UserCard user={user} isNew={true} />);

    expect(screen.getByText('New')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('border-emerald-600');
  });

  it('renders fallback female user image', () => {
    const user = mockUsers[0];
    render(<UserCard user={user} isNew={false} />);

    const img = screen.getByRole('img', {
      name: user.name,
    }) as HTMLImageElement;
    expect(img.src).toContain('/images/user-icon-female.png');
  });

  it('renders fallback male user image', () => {
    const user = mockUsers[1];
    render(<UserCard user={user} isNew={false} />);

    const img = screen.getByRole('img', {
      name: user.name,
    }) as HTMLImageElement;
    expect(img.src).toContain('/images/user-icon-male.png');
  });

  it('renders custom image when provided', () => {
    const customUrl = 'https://cdn.example.com/ava.png';
    const user = { ...mockUsers[0], pictureUrl: customUrl };
    render(<UserCard user={user} isNew={false} />);

    const img = screen.getByRole('img', {
      name: user.name,
    }) as HTMLImageElement;
    expect(img.src).toContain(customUrl);
  });

  it('toggles show/hide password', async () => {
    const user = { ...mockUsers[0] };
    render(<UserCard user={user} isNew={false} />);

    const button = screen.getByRole('button', { name: /show password/i });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(button);

    expect(screen.getByText(user.password)).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('button', { name: /hide password/i })
    ).toBeInTheDocument();
  });
});
