import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as React from 'react';

export function renderWithRouter(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
} 