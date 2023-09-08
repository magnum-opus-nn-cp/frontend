import clsx from 'clsx';
import {ReactFCC} from '../../../../../../utils/ReactFCC';
import {Control, Controller, FieldValues, UseFormRegisterReturn} from 'react-hook-form';
import {SimpleButton} from '../../../SimpleButton';
import s from './ChatFormMultipleRange.module.scss';
import {Range} from '../../../../../../components/Range';
import {Hint} from '../../../../../../api/deck';
import {Hint as HintCmp, HintsContainer} from '../../../../../../components/Hint';
import {currencyFormatter} from '../../../../../../utils/fomat';

export interface RangeType {
  name: string;
  slug: string;
  min_value: number;
  max_value: number;
}

export interface ChatFormSelectProps {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  control: Control<FieldValues>;
  scrollbars: RangeType[];
  onSubmit: (e: any) => void;
  setValue: (value: any) => void;
  hint?: Hint | false;
}

export const slugsForFormat = ['sam', 'som', 'tam', 'sum', 'cac', 'ltv'];

export const ChatFormMultipleRange: ReactFCC<ChatFormSelectProps> = (props) => {
  const {className, registration, control, scrollbars, onSubmit, hint, setValue} = props;

  return (
    <div className={clsx(s.ChatFormMultipleRange, className)}>
      <Controller control={control} render={({ field: { value, onChange }}) => (
        <>
          <HintsContainer isLoading={hint && !hint.value}>
            {hint && hint.value && Object.entries(hint.value).map(([key, val], index) => {
              const range = scrollbars.find((j) => j.slug === key);
              return range ? (
                <HintCmp onClick={() => setValue({ ...value, [key]: val })} key={index}>{`${range.name}: ${slugsForFormat.includes(range.slug) ? currencyFormatter.format(val as any) : val}`}</HintCmp>
              ) : null
            })}
          </HintsContainer>

          <div className={s.ChatFormMultipleRange__items}>
            {scrollbars.map((item, index) => (
              <Range
                label={item.name} min={item.min_value} max={item.max_value} step={((item.max_value - item.min_value) / 100) || 100}
                value={value[item.slug]}
                onChange={(val) => onChange({ ...value, [item.slug]: val })}
                format={slugsForFormat.includes(item.slug)}
                key={index} />
            ))}
          </div>

          <SimpleButton className={s.ChatFormMultipleRange__button} onClick={onSubmit} />
        </>
      )} name={registration.name!} />
    </div>
  )
};

