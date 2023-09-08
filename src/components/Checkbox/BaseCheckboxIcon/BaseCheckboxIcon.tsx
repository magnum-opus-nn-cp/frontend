import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import s from './BaseCheckboxIcon.module.scss';
import {DivPropsWithoutRef} from '../../../utils/types';

export interface BaseCheckboxIconProps extends DivPropsWithoutRef {
  /**
   * Состояние Checkbox: включен или выключен
   */
  checked?: boolean;
  /**
   * Неактивное состояние Checkbox - состояние, при котором компонент отображается, но недоступен для действий пользователя
   */
  disabled?: boolean;
  /**
   * Свойство, устанавливающие тип radio для BaseCheckboxIcon
   */
  radio?: boolean;
}

export const BaseCheckboxIcon: FunctionComponent<BaseCheckboxIconProps> = ({
  className,
  checked,
  disabled,
  radio,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(
        s.BaseCheckboxIcon,
        {
          [s.BaseCheckboxIcon_radio]: radio,
          [s.BaseCheckboxIcon_disabled]: disabled,
          [s.BaseCheckboxIcon_checked]: checked
        },
        className
      )}
      {...props}>
      <div
        className={clsx(s.BaseCheckboxIcon__icon, {
          [s.BaseCheckboxIcon__icon_disabled]: disabled,
          [s.BaseCheckboxIcon__icon_visible]: checked
        })}>
      </div>
    </div>
  );
};
