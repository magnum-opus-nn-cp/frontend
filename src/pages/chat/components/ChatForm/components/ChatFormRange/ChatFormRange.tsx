import clsx from 'clsx';
import {ReactFCC} from '../../../../../../utils/ReactFCC';
import {Control, Controller, FieldValues, UseFormRegisterReturn} from 'react-hook-form';
import {SimpleButton} from '../../../SimpleButton';
import s from './../ChatFormMultipleRange/ChatFormMultipleRange.module.scss';
import {Range} from '../../../../../../components/Range';
import {Hint} from '../../../../../../api/deck';
import {Hint as HintCmp, HintsContainer} from '../../../../../../components/Hint';
import {RangeType, slugsForFormat} from '../ChatFormMultipleRange';
import {currencyFormatter} from '../../../../../../utils/fomat';

export interface ChatFormRangeProps {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  control: Control<FieldValues>;
  onSubmit: (e: any) => void;
  setValue: (value: any) => void;
  hint?: Hint | false;
  range: RangeType;
}

export const ChatFormRange: ReactFCC<ChatFormRangeProps> = (props) => {
  const {className, registration, control, onSubmit, hint, setValue, range} = props;

  return (
    <div className={clsx(s.ChatFormMultipleRange, className)}>
      <Controller control={control} render={({ field: { value, onChange }}) => (
        <>
          <HintsContainer isLoading={hint && !hint.value}>
            {hint && hint.value && (
              <HintCmp onClick={() => setValue(hint.value)}>
                {slugsForFormat.includes(range.slug) ? currencyFormatter.format(hint.value) : hint.value}
              </HintCmp>
            )}
          </HintsContainer>

          <div className={s.ChatFormMultipleRange__items}>
            <Range
              value={value}
              min={range.min_value} max={range.max_value} step={((range.max_value - range.min_value) / 100) || 100}
              onChange={(val) => onChange(val)}
              format={slugsForFormat.includes(range.slug)}
            />
          </div>

          <SimpleButton className={s.ChatFormMultipleRange__button} onClick={onSubmit} />
        </>
      )} name={registration.name!} />
    </div>
  )
};

