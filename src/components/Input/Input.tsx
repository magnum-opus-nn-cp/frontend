import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import composeRefs from '@seznam/compose-react-refs';
import { IntrinsicPropsWithoutRef } from '../../utils/types';
import { useDelegateFocus } from '../../hooks/useDelegateFocus';
import { useFocus } from '../../hooks/useFocus';
import { useLiveInput } from '../../hooks/useLiveInput';
import s from './Input.module.scss';

export interface InputProps extends Omit<IntrinsicPropsWithoutRef<'input'>, 'onClick'> {
  /**
   * Состояние ошибки
   */
  error?: boolean;
  /**
   * Проп для контролируемого включения состояния фокуса
   */
  focused?: boolean;
  /**
   * Ref на input-элемент
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * Обработчик нажатия на Input
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /**
   * Дополнительные css-классы элементов:
   * * root - внешний контейнер
   * * input - элемент input
   * * icon - иконки слева и справа Input
   * * iconLeft - иконка слева Input
   * * iconRight - иконка справа Input
   */
  classes?: {
    root?: string;
    icon?: string;
    iconLeft?: string;
    iconRight?: string;
    input?: string;
  };
  registration?: Partial<UseFormRegisterReturn>;
}

export type InputType = React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLDivElement>>;

const InputForwardedRef = React.forwardRef<HTMLDivElement, InputProps>(
  (
    {
      error,
      focused: focusedProp,
      className,
      classes,
      onClick,
      onInput,
      inputRef: inputRefProp,
      style,
      type,
      registration,
      ...inputProps
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const delegateProps = useDelegateFocus<HTMLDivElement, HTMLInputElement>(inputRef, { onClick });
    const { focused, ...focusProps } = useFocus({ ...inputProps, ...registration });

    return (
      <div
        ref={ref}
        className={clsx(
          s.Input,
          {
            [s.Input_focus]: focusedProp ?? focused,
            [s.Input_error]: error,
            [s.Input_disabled]: inputProps.disabled
          },
          className,
          classes?.root
        )}
        style={style}
        {...delegateProps}>
        <input
          type={type}
          className={clsx(s.Input__input, { [s.Input__input_disabled]: inputProps.disabled }, classes?.input)}
          autoComplete={'off'}
          {...registration}
          ref={composeRefs(inputRef, inputRefProp, registration?.ref)}
          {...inputProps}
          {...focusProps}
        />
      </div>
    );
  }
);

InputForwardedRef.displayName = 'Input';

export const Input: InputType = InputForwardedRef;
