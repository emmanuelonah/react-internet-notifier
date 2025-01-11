import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { useForceUpdate } from './useForceUpdate.hook';

const TestComponent: React.FC = () => {
  const forceUpdate = useForceUpdate();
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <div data-testid="count">{count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={forceUpdate}>Force Update</button>
    </div>
  );
};

describe('useForceUpdate', () => {
  it('should force a re-render without changing state', () => {
    render(<TestComponent />);

    const countDiv = screen.getByTestId('count');
    const incrementButton = screen.getByText('Increment');
    const forceUpdateButton = screen.getByText('Force Update');

    expect(countDiv.textContent).toBe('0');

    fireEvent.click(incrementButton);
    expect(countDiv.textContent).toBe('1');

    fireEvent.click(forceUpdateButton);
    expect(countDiv.textContent).toBe('1');
  });
});
