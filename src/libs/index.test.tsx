import React from 'react';

import { screen, render, fireEvent, act } from '@testing-library/react';

import { ReactInternetNotifier } from './index.component';

function mockInternetConnection(status: string) {
  const event = new window.Event(status);

  act(() => {
    window.dispatchEvent(event);
  });
}

describe('<ReactInternetNotifier/>', () => {
  it('should render offline component', () => {
    render(<ReactInternetNotifier />);

    mockInternetConnection('offline');

    expect(screen.getByText('You are no longer connected to the internet.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Gone offline')).not.toBeInTheDocument();
  });

  it('should render online component', () => {
    render(<ReactInternetNotifier />);

    mockInternetConnection('online');

    expect(screen.getByText('You are now connected to the internet.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Back online')).not.toBeInTheDocument();
  });
});
