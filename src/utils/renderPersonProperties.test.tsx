import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import { renderPersonProperties } from '@/utils/renderPersonProperties';

import { lukeSkywalkerDetails } from '@/__tests__/mocks/peopleMocks';

describe('renderPersonProperties', () => {
  afterEach(() => cleanup());

  it('renders properties correctly', () => {
    render(<>{renderPersonProperties(lukeSkywalkerDetails.properties)}</>);

    expect(screen.getByText('Name:')).toBeInTheDocument();

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('returns null if no properties are passed', () => {
    const { container } = render(<>{renderPersonProperties()}</>);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders N/A for empty values', () => {
    const props = {
      ...lukeSkywalkerDetails.properties,
      birth_year: '',
    };

    render(<>{renderPersonProperties(props)}</>);

    expect(screen.getByText('Birth Year:')).toBeInTheDocument();
    expect(screen.getAllByText('N/A')).toHaveLength(1);
  });
});
