import clsx from 'clsx';
import s from './ChatFormSelect.module.scss';
import {ReactFCC} from '../../../../../../utils/ReactFCC';
import {Control, Controller, FieldValues, UseFormRegisterReturn} from 'react-hook-form';
import {Radio} from '../../../../../../components/Radio';
import {SimpleButton} from '../../../SimpleButton';

export interface ChatFormSelectProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  control: Control<FieldValues>;
  options: string[];
  onSubmit: (e: any) => void;
}

export const ChatFormSelect: ReactFCC<ChatFormSelectProps> = (props) => {
  const {className, registration, control, options, onSubmit} = props;

  return (
    <div className={clsx(s.ChatFormSelect, className)}>
      <Controller control={control} render={({ field: { value, onChange }}) => (
        <>
          <div className={s.ChatFormSelect__items}>
            {options.map((item, index) => (
              <Radio name={registration.name} label={item} value={item} checked={item === value} onChange={(val) => onChange(val)} key={index} />
            ))}
          </div>

          <SimpleButton onClick={onSubmit} />
        </>
      )} name={registration.name!} />
    </div>
  )
};

