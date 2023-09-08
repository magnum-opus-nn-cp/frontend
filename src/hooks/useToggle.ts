import { useCallback, useState } from 'react';

type TUseToggleReturn = [
  value: boolean,
  funcs: {
    set: () => void;
    unset: () => void;
    toggle: () => void;
    change: (value: boolean) => void;
  }
];

export const useToggle = (defaultValue: boolean = false): TUseToggleReturn => {
  const [value, change] = useState(defaultValue);

  const set = useCallback(() => {
    change(true);
  }, [change]);

  const unset = useCallback(() => {
    change(false);
  }, [change]);

  const toggle = useCallback(() => {
    change((v) => !v);
  }, [change]);

  return [
    value,
    {
      change,
      set,
      unset,
      toggle
    }
  ];
};
