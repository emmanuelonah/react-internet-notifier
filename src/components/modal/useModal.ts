import { useEffect, useMemo } from 'react';

import { useBoolean } from '../../hooks';

export type ControlledState = {
  isOpen: boolean;
  onClose(): void;
};

export function useModal(open: boolean | (() => boolean), controlledState?: ControlledState) {
  const [isOpenState, { setToFalse: closeModal }] = useBoolean(open);

  const isControlled = controlledState != undefined;
  const controlledOpen = controlledState?.isOpen;
  const onClose = controlledState?.onClose;

  const state = useMemo(
    () => ({
      isOpen: isControlled ? controlledOpen : isOpenState,
      closeModal: isControlled ? onClose : closeModal,
    }),
    [isOpenState, controlledOpen, isControlled, onClose, closeModal]
  );

  useEffect(() => {
    if (isControlled) return;

    let timeout: NodeJS.Timeout | null = null;

    if (isOpenState) {
      timeout = setTimeout(closeModal, 3000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isControlled, closeModal, isOpenState]);

  return state;
}
