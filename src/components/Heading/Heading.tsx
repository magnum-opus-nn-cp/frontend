import React from 'react';
import clsx from 'clsx';
import { IntrinsicPropsWithoutRef } from '../../utils/types';
import { ReactFCC } from '../../utils/ReactFCC';
import s from './Heading.module.scss';

export enum HeadingSize {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4'
}
export interface HeadingProps extends IntrinsicPropsWithoutRef<'h1'> {
  /**
   * Размер заголовка("H1", "H2", "H3", "H4")
   */
  size?: HeadingSize;
  /**
   * Реф на корневой элемент
   */
  innerRef?: React.Ref<HTMLHeadingElement>;
}

export const Heading: ReactFCC<HeadingProps> & { Size: typeof HeadingSize } = ({
  children,
  className,
  size = HeadingSize.H1,
  innerRef,
  ...props
}) => {
  const Component = size;
  return (
    <Component ref={innerRef} className={clsx(s[`Heading_size_${size}`], className)} {...props}>
      {children}
    </Component>
  );
};

Heading.Size = HeadingSize;
