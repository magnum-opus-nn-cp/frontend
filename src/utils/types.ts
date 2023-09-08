import React from 'react';
import { PromiseValue } from 'type-fest';

export type Optional<T> = T | null | undefined;

export type Extends<Self extends object, Base extends object> = Omit<Base, keyof Self> & Self;

export type IntrinsicPropsWithoutRef<E extends keyof JSX.IntrinsicElements> = React.PropsWithoutRef<
  JSX.IntrinsicElements[E]
>;

export type ExtractArray<T> = T extends (infer U)[] ? U : T;

export type AnchorPropsWithoutRef = IntrinsicPropsWithoutRef<'a'>;
export type DivPropsWithoutRef = IntrinsicPropsWithoutRef<'div'>;
export type PPropsWithoutRef = IntrinsicPropsWithoutRef<'p'>;
export type FooterPropsWithoutRef = IntrinsicPropsWithoutRef<'footer'>;
export type ImgPropsWithoutRef = IntrinsicPropsWithoutRef<'img'>;
export type ButtonPropsWithoutRef = IntrinsicPropsWithoutRef<'button'>;
export type InputPropsWithoutRef = IntrinsicPropsWithoutRef<'input'>;
export type SelectPropsWithoutRef = IntrinsicPropsWithoutRef<'select'>;
export type UListPropsWithoutRef = IntrinsicPropsWithoutRef<'ul'>;
export type LiPropsWithoutRef = IntrinsicPropsWithoutRef<'li'>;
export type SvgPropsWithoutRef = IntrinsicPropsWithoutRef<'svg'>;

export type PolyExtends<ComponentType extends React.ElementType, Self extends object, Base extends object> = {
  /**
   * Базовый компонент
   *
   * @type React.ElementType
   */
  component?: ComponentType;
} & Extends<Self, Base>;

export type AnyObject = {
  [key: number]: any;
  [key: string]: any;
};

export type ExtractFnReturnType<FnType extends (...args: any) => any> = PromiseValue<ReturnType<FnType>>;

export type Pagination = {
  offset?: number;
  limit?: number;
};
