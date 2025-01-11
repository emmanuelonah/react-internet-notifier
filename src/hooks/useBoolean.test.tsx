import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { useBoolean } from './useBoolean.hook';

const TestComponent: React.FC<{ initialValue?: boolean }> = ({ initialValue }) => {
  const [value, { toggle, setToFalse, setToTrue }] = useBoolean(initialValue);

  return (
    <div>
      <div data-testid="value">{value.toString()}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setToTrue}>Set to True</button>
      <button onClick={setToFalse}>Set to False</button>
    </div>
  );
};

describe('useBoolean', () => {
  it('should initialize with false by default', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('value').textContent).toBe('false');
  });

  it('should initialize with the provided initial value', () => {
    render(<TestComponent initialValue />);

    expect(screen.getByTestId('value').textContent).toBe('true');
  });

  it('should toggle the value', () => {
    render(<TestComponent />);

    const toggleButton = screen.getByText('Toggle');

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('value').textContent).toBe('true');

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('value').textContent).toBe('false');
  });

  it('should set the value to true', () => {
    render(<TestComponent />);

    const setToTrueButton = screen.getByText('Set to True');

    fireEvent.click(setToTrueButton);
    expect(screen.getByTestId('value').textContent).toBe('true');
  });

  it('should set the value to false', () => {
    render(<TestComponent initialValue />);

    const setToFalseButton = screen.getByText('Set to False');

    fireEvent.click(setToFalseButton);
    expect(screen.getByTestId('value').textContent).toBe('false');
  });
});
