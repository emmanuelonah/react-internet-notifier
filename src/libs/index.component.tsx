import React from 'react';

import { Modal, Position } from '../components';
import { useInternetNotifier } from './useInternetNotifier.presenter';

export type ReactInternetNotifierProps = {
  duration?: number;
  position?: Position;
};

export function ReactInternetNotifier({ duration, position }: ReactInternetNotifierProps) {
  const { open, message, onHideNotifier, isBackOnline } = useInternetNotifier(duration);

  const modalType = isBackOnline ? 'success' : 'error';
  const modalPosition = position || 'bottom';

  return (
    <Modal
      open={open}
      type={modalType}
      position={modalPosition}
      controlledState={{ isOpen: open, onClose: onHideNotifier }}
    >
      {message}
    </Modal>
  );
}
