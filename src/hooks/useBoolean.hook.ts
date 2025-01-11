import { useCallback, useState } from 'react';

export function useBoolean(initialValue?: boolean | (() => boolean)) {
  const [value, setValue] = useState(initialValue ?? false);
  const setToFalse = useCallback(() => setValue(false), []);
  const setToTrue = useCallback(() => setValue(true), []);
  const toggle = useCallback(() => setValue(value => !value), []);

  return [value, { toggle, setToFalse, setToTrue }] as const;
}
