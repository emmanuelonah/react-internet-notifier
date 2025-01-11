import { useState, useCallback } from 'react';

export function useForceUpdate() {
  const [, setState] = useState(Object.create(null));

  return useCallback(() => setState(Object.create(null)), []);
}
