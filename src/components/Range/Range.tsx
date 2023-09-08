import clsx from 'clsx';
import s from './Range.module.scss';
import {ReactFCC} from '../../utils/ReactFCC';
import {ChangeEvent, useMemo} from 'react';
import {InputPropsWithoutRef} from '../../utils/types';
import {currencyFormatter} from '../../utils/fomat';

export interface RangeProps extends Omit<InputPropsWithoutRef, 'value' | 'onChange'> {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  label?: string;
  value: number;
  onChange: (value: number, e: any) => void;
  format?: boolean;
}

export const Range: ReactFCC<RangeProps> = (props) => {
  const {className, min = 0, max = 100, label, value, format, onChange: onChangeProp, ...rest } = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onChangeProp?.(val, e);
  }

  const percent = useMemo(() => {
    const percent = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;
    if (percent < 0) {
      return 0;
    } else if (percent > 100) {
      return 100;
    }

    return percent;
  }, [max, min, value]);

  return (
    <div className={clsx(s.Range, className)}>
      <div className={s.Range__label}>{label}</div>

      <div className={s.Range__container}>
        <div className={s.Range__tip}>{format ? currencyFormatter.format(min as number) : min}</div>

        <div className={s.Range__inputContainer}>
          <div className={s.Range__progress} style={{ width: `calc(${percent}% - 1px)` }} />
          <input className={s.Range__input} type="range" value={value} onChange={onChange} min={min} max={max} {...rest} />
        </div>

        <div className={clsx(s.Range__tip, s.Range__tip_active)}>{format ? currencyFormatter.format(value as number) : value}</div>
      </div>
    </div>
  );
};

