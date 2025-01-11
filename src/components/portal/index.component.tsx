import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useForceUpdate } from '../../hooks';

type PortalPropTypes = {
  children: React.ReactNode;
  elementType?: string;
  container?:
    | React.RefObject<HTMLDivElement>
    | React.MutableRefObject<HTMLElement>;
};

export function Portal({
  children,
  container,
  elementType = 'portal',
}: PortalPropTypes) {
  const mountedRef = useRef<HTMLSpanElement>(null);
  const portalRef = useRef<HTMLElement | null>(null);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!mountedRef.current) return;

    const ownerDocument = mountedRef.current.ownerDocument;
    const body = container?.current ?? ownerDocument.body;
    portalRef.current = ownerDocument.createElement(elementType);

    body.appendChild(portalRef.current);
    forceUpdate();

    return function removePortalFromBodyElement() {
      if (portalRef.current && body) body.removeChild(portalRef.current);
    };
  }, [container, elementType, forceUpdate]);

  return portalRef.current ? (
    ReactDOM.createPortal(children, portalRef.current)
  ) : (
    <span ref={mountedRef} />
  );
}
