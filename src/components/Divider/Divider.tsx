import React from 'react';
import clsx from 'clsx';
import { IntrinsicPropsWithoutRef } from '../../utils/types';
import s from './Divider.module.scss';

export enum DividerVariant {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

export enum DividerColor {
  light = 'light',
  dark = 'dark'
}

export interface IDividerProps extends IntrinsicPropsWithoutRef<'hr'> {
  /**
   * Дополнительный css-класс корневого элемента
   */
  className?: string;
  /**
   * Вариант расположения (`vertical`, `horizontal`)
   */
  variant?: DividerVariant;
  /**
   * Цвет (`light`, `dark`)
   */
  color?: DividerColor;
  /**
   * Реф на корневой элемент
   */
  innerRef?: React.Ref<HTMLHRElement>;
}

export function Divider({
  className,
  variant = DividerVariant.horizontal,
  color = DividerColor.dark,
  innerRef,
  ...props
}: IDividerProps) {
  return (
    <hr
      ref={innerRef}
      className={clsx(
        s.Divider,
        {
          [s[`Divider_variant_${variant}`]]: variant,
          [s[`Divider_color_${color}`]]: color
        },
        className
      )}
      {...props}
    />
  );
}

Divider.Variant = DividerVariant;
Divider.Color = DividerColor;
