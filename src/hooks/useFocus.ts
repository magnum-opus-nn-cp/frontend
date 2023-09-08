import { FocusEvent, FocusEventHandler, useState } from 'react';

import { useFactoryRef } from './useFactoryRef';
import { usePropsRef } from './usePropsRef';

export interface IUseFocusProps<Element> {
  /**
   * Внешний обработчик onFocus
   */
  onFocus?: FocusEventHandler<Element>;
  /**
   * Внешний обработчик onBlur
   */
  onBlur?: FocusEventHandler<Element>;
}

/**
 * Позволяет использовать focused как состояние компонента.
 * Активируется, когда элемент или его потомки становятся focus-visible
 *
 * @returns
 *   - focused - состояние фокуса (true если :focus-visible)
 *   - onFocus, onBlur - обработчики, которые надо повесить на элемент
 */
export function useFocus<Element extends HTMLElement>({ onFocus, onBlur }: IUseFocusProps<Element> = {}) {
  const [focused, setFocused] = useState(false);

  /**
   * Используем useRef вместо useCallback, чтобы прервать каскад ререндеров
   * при смене onFocus/onBlur в пропах хука
   */

  const propsRef = usePropsRef<IUseFocusProps<Element>>({
    onFocus,
    onBlur
  });
  const funcsRef = useFactoryRef(() => ({
    onFocus: (e: FocusEvent<Element>) => {
      if (e.target.classList.contains('focus-visible')) {
        setFocused(true);
      }
      propsRef.onFocus?.(e);
    },
    onBlur: (e: FocusEvent<Element>) => {
      setFocused(false);
      propsRef.onBlur?.(e);
    }
  }));

  return {
    focused,
    onFocus: funcsRef.onFocus,
    onBlur: funcsRef.onBlur
  };
}
