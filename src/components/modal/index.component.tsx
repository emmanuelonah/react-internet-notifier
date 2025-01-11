import React from 'react';

import { Portal } from '..';
import { useModal } from './useModal';
import { IconCancel } from './icon-cancel.svg';
import { composeClassNames } from '../../utils';

import './index.styles.css';

type PrimitiveDivPropTypes = React.ComponentPropsWithoutRef<'div'>;
type Type = 'success' | 'error';

export type Position = 'top' | 'bottom' | 'top-center' | 'bottom-center';

interface ModalPropTypes extends PrimitiveDivPropTypes {
  open: boolean;
  type: Type;
  position?: Position;
  controlledState?: { isOpen: boolean; onClose(): void };
}

export const Modal = React.forwardRef<HTMLDivElement, ModalPropTypes>(function Modal(
  { type, children, open, className, controlledState, position, ...restProps },
  forwardedRef
) {
  const { isOpen, closeModal } = useModal(open, controlledState);

  if (!isOpen) return null;

  return (
    <Portal elementType="modal">
      <div
        aria-atomic
        role="dialog"
        aria-modal="true"
        {...restProps}
        ref={forwardedRef}
        className={composeClassNames('wrapper', type, position, className)}
      >
        <div className="body">
          <p>{children}</p>
          <button aria-label="Close" className="close-btn" onClick={closeModal}>
            <IconCancel />
          </button>
        </div>
      </div>
    </Portal>
  );
});
