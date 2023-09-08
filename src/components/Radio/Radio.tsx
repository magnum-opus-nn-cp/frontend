import React, { ChangeEvent, FunctionComponent } from 'react';
import {Checkbox, ICheckboxProps} from '../Checkbox';

export interface RadioProps extends Omit<ICheckboxProps, 'radio' | 'onChange'> {
  /**
   * Обработчик изменения значения Radio. Принимает на вход значение Radio и ChangeEvent
   */
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
}

export const Radio: FunctionComponent<RadioProps> = ({ onChange, ...props }) => {
  const handleChange = onChange
    ? (value: boolean, event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, event);
      }
    : undefined;

  return <Checkbox {...props} radio={true} onChange={handleChange} />;
};
