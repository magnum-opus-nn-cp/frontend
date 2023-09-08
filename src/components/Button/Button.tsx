import React, { ElementType, useMemo } from 'react';
import clsx from 'clsx';
import s from './Button.module.scss';
import {PolyExtends} from '../../utils/types';

export enum ButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary'
}

export enum ButtonStretch {
  fit = 'fit',
  fill = 'fill'
}

export const ButtonDefaultComponent = 'button' as const;
export type ButtonDefaultComponentType = typeof ButtonDefaultComponent;

export interface ButtonSelfProps<ComponentType extends ElementType = ButtonDefaultComponentType> {
  /**
   * Размер ("small", "medium", "large")
   */
  size?: ButtonSize;
  /**
   * Вариант оформления ("primary", "secondary", "tertiary")
   */
  variant?: ButtonVariant;
  /**
   * Заблокированное состояние
   */
  disabled?: boolean;
  /**
   * Проп для контролируемого включения состояния ховера
   */
  hovered?: boolean;
  /**
   * Цвет фона в hex-формате
   */
  color?: string;
  /**
   * Состояние со спиннером
   */
  isLoading?: boolean;
  /**
   * Потомки компонента
   */
  children?: React.ReactNode;
  /**
   * Реф на корневой DOM-элемент
   */
  innerRef?: React.ComponentProps<ComponentType>['ref'];
  /**
   * Дополнительные css-классы элементов
   */
  classes?: {
    content?: string;
    contentLeft?: string;
    contentRight?: string;
    text?: string;
    icon?: string;
  };
  /**
   * Вариант растягивания кнопки ("fit", "fill")
   */
  stretch?: ButtonStretch;
}

export type ButtonProps<ComponentType extends ElementType = ButtonDefaultComponentType> = PolyExtends<
  ComponentType,
  ButtonSelfProps<ComponentType>,
  React.ComponentProps<ComponentType>
>;

export function Button<ComponentType extends ElementType = ButtonDefaultComponentType>({
  component,
  className,
  style,
  size = ButtonSize.medium,
  variant = ButtonVariant.primary,
  disabled,
  hovered,
  children,
  leftIcon,
  right,
  left,
  rightIcon,
  isLoading,
  color,
  innerRef,
  classes,
  stretch,
  ...props
}: ButtonProps<ComponentType>) {
  // Чтобы ts не проверял корректность передачи пропов
  const Component = (component || ButtonDefaultComponent) as React.ElementType;

  const buttonProps = useMemo(() => {
    if (Component === 'button') {
      return { type: 'button' };
    }
    return undefined;
  }, [Component]);

  const hasLeft = left || leftIcon;

  const hasRight = right || rightIcon;

  return (
    <Component
      ref={innerRef}
      className={clsx(
        s.Button,
        {
          [s[`Button_size_${size}`]]: size,
          [s[`Button_variant_${variant}`]]: variant,
          [s[`Button_stretch_${stretch}`]]: stretch,
          [s.Button_disabled]: disabled,
          [s.Button_hovered]: hovered,
          [s.Button_hasLeft]: hasLeft,
          [s.Button_hasRight]: hasRight
        },
        className
      )}
      style={{
        color,
        ...style
      }}
      disabled={disabled}
      {...buttonProps}
      {...props}>
      <div className={clsx(s.Button__content, classes?.content)}>
        <div className={classes?.text}>{children}</div>

        {/*{isLoading && <Loader className={s.Button__loader} size={LoaderSize.small} />}*/}
      </div>
    </Component>
  );
}

Button.Variant = ButtonVariant;
Button.Size = ButtonSize;
