import React from 'react';
import clsx from 'clsx';
import s from './Text.module.scss';

export enum ETextVariants {
  BODY_L_MEDIUM = 'bodyLMedium',
  BODY_L_REGULAR = 'bodyLRegular',
  BODY_M_MEDIUM = 'bodyMMedium',
  BODY_M_REGULAR = 'bodyMRegular',
  BODY_S_MEDIUM = 'bodySMedium',
  BODY_S_REGULAR = 'bodySRegular',
  CAPTION_M_MEDIUM = 'captionMMedium',
  CAPTION_M_REGULAR = 'captionMRegular',
  CAPTION_S_MEDIUM = 'captionSMedium',
  CAPTION_S_REGULAR = 'captionSRegular',
  CAPTION_ALL_CAPS = 'captionAllCaps',
  PROGRAMMING_CODE_MEDIUM = 'programmingCodeMedium',
  PROGRAMMING_CODE_REGULAR = 'programmingCodeRegular'
}

export interface TextProps<ComponentType extends React.ElementType = 'p'> {
  /**
   * Тэг компонента
   */
  component?: ComponentType;
  /**
   * Дополнительный css-класс корневого элемента
   */
  className?: string;
  /**
   * Цвет текста
   */
  color?: string;
  /**
   * Не добавлять стили шрифтов
   */
  noStyle?: boolean;
  /**
   * Выводимый текст, если не передан children
   */
  text?: React.ReactNode;
  /**
   * Вариант шрифта
   */
  variant?: ETextVariants;
  /**
   * Обработчик нажатия на Text
   */
  onClick?: (e: React.MouseEvent) => void;
}

export const Text = <T extends React.ElementType = 'p'>(props: TextProps<T> & React.ComponentPropsWithRef<T>) => {
  const {
    component = 'p',
    children,
    noStyle,
    className,
    color,
    style,
    onClick,
    text,
    variant = ETextVariants.BODY_M_REGULAR,
    ...otherProps
  } = props;

  const textStyle: React.CSSProperties = style || {};
  if (color) {
    textStyle.color = color;
  }

  const TextTag = component;

  return (
    <TextTag
      className={clsx(
        !noStyle && {
          [s.Text_pointer]: onClick,
          [s.Text_bodyLMedium]: variant === ETextVariants.BODY_L_MEDIUM,
          [s.Text_bodyLRegular]: variant === ETextVariants.BODY_L_REGULAR,
          [s.Text_bodyMMedium]: variant === ETextVariants.BODY_M_MEDIUM,
          [s.Text_bodyMRegular]: variant === ETextVariants.BODY_M_REGULAR,
          [s.Text_bodySMedium]: variant === ETextVariants.BODY_S_MEDIUM,
          [s.Text_bodySRegular]: variant === ETextVariants.BODY_S_REGULAR,
          [s.Text_captionMMedium]: variant === ETextVariants.CAPTION_M_MEDIUM,
          [s.Text_captionMRegular]: variant === ETextVariants.CAPTION_M_REGULAR,
          [s.Text_captionSMedium]: variant === ETextVariants.CAPTION_S_MEDIUM,
          [s.Text_captionSRegular]: variant === ETextVariants.CAPTION_S_REGULAR,
          [s.Text_captionAllCapsS]: variant === ETextVariants.CAPTION_ALL_CAPS,
          [s.Text_programmingCodeMedium]: variant === ETextVariants.PROGRAMMING_CODE_MEDIUM,
          [s.Text_programmingCodeRegular]: variant === ETextVariants.PROGRAMMING_CODE_REGULAR
        },
        className
      )}
      style={textStyle}
      onClick={onClick}
      {...otherProps}>
      {children ?? text}
    </TextTag>
  );
};

Text.Variant = ETextVariants;
