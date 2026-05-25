import React from 'react';
import { renderToString } from 'react-dom/server';

import AppLayout from '../../layouts/index';

jest.mock('umi', () => ({
  Link: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
  useLocation: () => ({ pathname: '/' }),
}));

describe('AppLayout', () => {
  it('renders the shared product shell', () => {
    const html = renderToString(
      <AppLayout>
        <div>child-content</div>
      </AppLayout>,
    );

    expect(html).toContain('AI Coding Skill Workflow Platform');
    expect(html).toContain('child-content');
  });
});
