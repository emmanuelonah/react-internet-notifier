import React from 'react';

import { render, screen, act } from '@testing-library/react';

import { useBoolean } from '../../hooks/useBoolean.hook';
import { useModal, ControlledState } from './useModal';

jest.mock('../../hooks/useBoolean.hook', () => ({
  useBoolean: jest.fn(),
}));

const TestComponent: React.FC<{
  open: boolean;
  controlledState?: ControlledState;
}> = ({ open, controlledState }) => {
  const { isOpen, closeModal } = useModal(open, controlledState);

  return (
    <div>
      <div data-testid="isOpen">{String(isOpen)}</div>
      <button onClick={closeModal}>Close Modal</button>
    </div>
  );
};

describe('useModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    (useBoolean as jest.Mock).mockImplementation((initialValue) => {
      const [value, setValue] = React.useState(initialValue);

      return [value, { setToFalse: () => setValue(false) }];
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should initialize with the provided open value', () => {
    render(<TestComponent open />);

    expect(screen.getByTestId('isOpen').textContent).toBe('true');
  });

  it('should close the modal after 3000ms when uncontrolled', () => {
    render(<TestComponent open />);
    expect(screen.getByTestId('isOpen').textContent).toBe('true');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('isOpen').textContent).toBe('false');
  });

  it('should not close the modal automatically when controlled', () => {
    const controlledState = { isOpen: true, onClose: jest.fn() };
    render(<TestComponent open={false} controlledState={controlledState} />);
    expect(screen.getByTestId('isOpen').textContent).toBe('true');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('isOpen').textContent).toBe('true');
    expect(controlledState.onClose).not.toHaveBeenCalled();
  });

  it('should call onClose when closeModal is called in controlled mode', () => {
    const controlledState = { isOpen: true, onClose: jest.fn() };

    render(<TestComponent open={false} controlledState={controlledState} />);

    expect(screen.getByTestId('isOpen').textContent).toBe('true');

    act(() => {
      screen.getByText('Close Modal').click();
    });

    expect(controlledState.onClose).toHaveBeenCalled();
  });

  it('should close the modal when closeModal is called in uncontrolled mode', () => {
    render(<TestComponent open />);

    expect(screen.getByTestId('isOpen').textContent).toBe('true');

    act(() => {
      screen.getByText('Close Modal').click();
    });

    expect(screen.getByTestId('isOpen').textContent).toBe('false');
  });
});
