import React, { ElementType, JSX, MouseEvent } from 'react';
import clsx from 'clsx';
import { PolyExtends } from '../../utils/types';
import s from './Link.module.scss';

export const LinkDefaultComponent = 'a';
export type LinkDefaultComponentType = typeof LinkDefaultComponent;

export enum LinkVariant {
  PRIMARY = 'primary'
  // SECONDARY = 'secondary'
}

export enum LinkSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small'
}

export interface LinkPropsSelf<ComponentType extends React.ElementType> {
  /**
   * Дополнительный css-класс корневого элемента
   */
  className?: string;
  /**
   * Основной слот
   */
  children?: React.ReactNode;
  /**
   * Вариант оформления ссылки ("primary", "secondary")
   */
  variant?: LinkVariant;
  /**
   * Вариант размера ссылки ("large", "medium", "small")
   */
  size?: LinkSize;
  /**
   * hover состояние
   */
  hover?: boolean;
  /**
   * Состояние неактивной ссылки. Компонент недоступен для действий пользователя
   */
  disabled?: boolean;
  /**
   * Применять ли фиксированные свойства шрифта.
   * Если не передать standalone, то свойства шрифта наследуются от родителя.
   * Полезно в случае, если Link используется самостоятельно вне текстового блока.
   */
  standalone?: boolean;
  /**
   * Подчеркивание ссылки
   */
  underlined?: boolean;
  /**
   * Реф на корневой элемент
   */
  innerRef?: React.ComponentProps<ComponentType>['ref'];
  /**
   * Событие клика
   * @param e - объект события
   */
  onClick?: (e: MouseEvent) => void;
}

export interface LinkComponentProps {
  className: string;
  onClick: (e: MouseEvent) => void;
}

export type LinkProps<ComponentType extends React.ElementType<LinkComponentProps> = LinkDefaultComponentType> =
  PolyExtends<ComponentType, LinkPropsSelf<ComponentType>, React.ComponentProps<ComponentType>>;

export function Link(props: LinkProps<'button'>): JSX.Element;
export function Link<ComponentType extends ElementType>(props: LinkProps<ComponentType>): JSX.Element;
export function Link<ComponentType extends React.ElementType<LinkComponentProps> = LinkDefaultComponentType>({
  className,
  children,
  variant = LinkVariant.PRIMARY,
  size = LinkSize.MEDIUM,
  disabled,
  standalone,
  underlined,
  onClick,
  component,
  innerRef,
  hover,
  ...props
}: LinkProps<ComponentType>) {
  const handleClick = (e: MouseEvent) => {
    if (disabled) e.preventDefault();
    onClick?.(e);
  };

  const Component = component || LinkDefaultComponent;

  // Тайпскрипт жалуется на сложный union тип, поэтому используем createElement
  return React.createElement(
    Component,
    {
      ref: innerRef,
      className: clsx(
        s.Link,
        s[`Link_variant_${variant}`],
        s[`Link_size_${size}`],
        {
          [s.Link_underlined]: underlined,
          [s.Link_disabled]: disabled,
          [s.Link_standalone]: standalone,
          [s.Link_hover]: hover
        },
        className
      ),
      onClick: handleClick,
      ...props
    },
    <>{children}</>
  );
}
