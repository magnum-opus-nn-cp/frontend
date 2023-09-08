import { MouseEvent, MouseEventHandler, useState } from 'react';

import { useFactoryRef } from './useFactoryRef';
import { usePropsRef } from './usePropsRef';

export interface IUseHoverProps<Element> {
  /**
   * Внешний обработчик onMouseOver
   */
  onMouseOver?: MouseEventHandler<Element>;
  /**
   * Внешний обработчик onMouseOut
   */
  onMouseOut?: MouseEventHandler<Element>;
}

/**
 * Позволяет использовать hovered как состояние компонента.
 *
 * @returns
 *   - hovered - состояние фокуса
 *   - onMouseOver, onMouseOut - обработчики, которые надо повесить на элемент
 */
export function useHover<Element extends HTMLElement>({ onMouseOver, onMouseOut }: IUseHoverProps<Element> = {}) {
  const [hovered, setHovered] = useState(false);

  /**
   * Используем useRef вместо useCallback, чтобы прервать каскад ререндеров
   * при смене onMouseOver/onMouseOut в пропах хука
   */
  const propsRef = usePropsRef<IUseHoverProps<Element>>({
    onMouseOver,
    onMouseOut
  });

  const funcsRef = useFactoryRef(() => ({
    onMouseOver: (e: MouseEvent<Element>) => {
      setHovered(true);
      propsRef.onMouseOver?.(e);
    },
    onMouseOut: (e: MouseEvent<Element>) => {
      setHovered(false);
      propsRef.onMouseOut?.(e);
    }
  }));

  return {
    hovered,
    onMouseOver: funcsRef.onMouseOver,
    onMouseOut: funcsRef.onMouseOut
  };
}
