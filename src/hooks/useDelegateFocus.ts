import React, { useCallback } from 'react';

/**
 * Прокидывает фокус на targetRef при взаимодействии с элементом
 * @param targetRef - реф элемента, куда прокидывать клик
 * @param props
 * @param props.onClick - внешний обработчик клика
 * @returns
 *   - onClick - новый обработчик клика для элемента
 */
export const useDelegateFocus = <Root extends HTMLElement, Target extends HTMLElement>(
  targetRef: React.MutableRefObject<Target | null>,
  {
    onClick: onClickProp
  }: {
    onClick?: React.MouseEventHandler<Root>;
  } = {}
) => {
  const onClick = useCallback(
    (event: React.MouseEvent<Root, MouseEvent>) => {
      if (targetRef.current && event.target !== targetRef.current) {
        targetRef.current.focus();
      }
      onClickProp?.(event);
    },
    [onClickProp, targetRef]
  );

  return {
    onClick
  };
};
