import { useRef, useState, useCallback, useEffect } from 'react';

import { useBoolean } from '../hooks';
import { InternetNotifierModel } from './index.model';

enum INTERNET_STATES {
  DEFAULT = 'DEFAULT',
  GONE_OFFLINE = 'GONE_OFFLINE',
  BACK_ONLINE = 'BACK_ONLINE',
}

const TEN_SECONDS = 10000;

export function useInternetNotifier(duration?: number) {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState<keyof typeof INTERNET_STATES>(INTERNET_STATES.DEFAULT);
  const [open, { setToFalse: onHideNotifier, setToTrue: onShowNotifier }] = useBoolean();

  const automaticallyHideNotifier = useCallback(() => {
    timeoutIdRef.current = setTimeout(() => onHideNotifier(), duration || TEN_SECONDS);
  }, [duration, onHideNotifier]);

  const offlineListener = useCallback(() => {
    setState(INTERNET_STATES.GONE_OFFLINE);
    onShowNotifier();
    automaticallyHideNotifier();
  }, [automaticallyHideNotifier, onShowNotifier]);

  const onlineListener = useCallback(() => {
    setState(INTERNET_STATES.BACK_ONLINE);
    onShowNotifier();
    automaticallyHideNotifier();
  }, [automaticallyHideNotifier, onShowNotifier]);

  useEffect(() => {
    InternetNotifierModel.offlineListener(offlineListener);
    InternetNotifierModel.onlineListener(onlineListener);

    return () => {
      InternetNotifierModel.unsubscribeOffline(offlineListener);
      InternetNotifierModel.unsubscribeOnline(onlineListener);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [offlineListener, onlineListener]);

  const isBackOnline = state === INTERNET_STATES.BACK_ONLINE;
  const message = isBackOnline
    ? 'You are now connected to the internet.'
    : 'You are no longer connected to the internet.';

  return {
    isBackOnline,
    open,
    message,
    onHideNotifier,
  };
}
