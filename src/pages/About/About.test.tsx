import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { About } from '@/pages/About';

describe('About page', () => {
  it('renders heading and author info', () => {
    render(<About />);

    expect(
      screen.getByRole('heading', { name: /about the author/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Iryna Baiko/)).toBeInTheDocument();
    expect(screen.getByText(/frontend developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Minsk, Belarus/)).toBeInTheDocument();
  });

  it('renders RS School React Course link', () => {
    render(<About />);

    const link = screen.getByRole('link', { name: /rs school react course/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders GitHub link', () => {
    render(<About />);

    const link = screen.getByRole('link', { name: /github/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/irinaboiko');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Discord link', () => {
    render(<About />);

    const link = screen.getByRole('link', { name: /discord/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      'https://discordapp.com/users/673453318076366849/'
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Baby Yoda image', () => {
    render(<About />);

    const image = screen.getByAltText('Baby Yoda');
    expect(image).toBeInTheDocument();
  });
});
