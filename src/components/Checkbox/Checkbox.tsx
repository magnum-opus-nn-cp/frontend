import React, { ChangeEvent, FunctionComponent, ReactNode } from 'react';
import clsx from 'clsx';
import s from './Checkbox.module.scss';
import {InputPropsWithoutRef, IntrinsicPropsWithoutRef} from '../../utils/types';
import {BaseCheckboxIcon} from './BaseCheckboxIcon';

export interface ICheckboxProps extends Omit<InputPropsWithoutRef, 'label' | 'onChange'> {
  /**
   * Состояние Checkbox: включен или выключен
   */
  checked?: boolean;
  /**
   * Неактивное состояние Checkbox - состояние, при котором компонент отображается, но недоступен для действий пользователя
   */
  disabled?: boolean;
  /**
   * Если true, то компонент аналогичен компоненту Radio
   */
  radio?: boolean;
  /**
   * Слот подписи
   */
  label?: ReactNode;
  /**
   * Обработчик изменения состояния Checkbox. Принимает на вход новое значение состояния Checkbox (в случае, если checked, то новое значение - false, иначе - true) и ChangeEvent
   */
  onChange?: (value: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Слот для замены иконки чекбокса
   */
  checkboxIcon?: React.ReactNode;
  /**
   * Дополнительные css-классы элементов
   * * input – класс элемента input
   * * label – класс лейбла
   * * icon – класс иконки чекбокса
   */
  classes?: {
    input?: string;
    label?: string;
    icon?: string;
  };
  /**
   * Дополнительный css-класс корневого элемента
   */
  className?: string;
  /**
   * Реф на корневой элемент
   */
  innerRef?: React.Ref<HTMLLabelElement>;
  /**
   * Реф на input
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * Дополнительные пропы корневого элемента
   */
  rootProps?: IntrinsicPropsWithoutRef<'label'>;
}

export const Checkbox: FunctionComponent<ICheckboxProps> = ({
  className,
  checked,
  disabled,
  radio,
  label,
  onChange,
  style,
  checkboxIcon,
  classes,
  innerRef,
  inputRef,
  rootProps,
  ...props
}) => {
  const handleChange = onChange
    ? (e: ChangeEvent<HTMLInputElement>) => {
        onChange(!checked, e);
      }
    : undefined;

  return (
    <label
      ref={innerRef}
      className={clsx(
        s.Checkbox,
        {
          [s.Checkbox_radio]: radio,
          [s.Checkbox_disabled]: disabled,
          [s.Checkbox_checked]: checked
        },
        className
      )}
      style={style}
      {...rootProps}>
      <input
        ref={inputRef}
        type={radio ? 'radio' : 'checkbox'}
        className={clsx(s.Checkbox__input, classes?.input)}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...props}
      />
      <BaseCheckboxIcon
        className={clsx(
          s.Checkbox__icon,
          {
            [s.Checkbox__icon_radio]: radio
          },
          classes?.icon
        )}
        disabled={disabled}
        checked={checked}
        radio={radio}>
        {checkboxIcon}
      </BaseCheckboxIcon>
      {label && <div className={clsx(s.Checkbox__label, classes?.label)}>{label}</div>}
    </label>
  );
};
