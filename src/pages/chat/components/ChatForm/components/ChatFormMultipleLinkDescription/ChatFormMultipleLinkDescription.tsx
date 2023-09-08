import clsx from 'clsx';
import {ReactFCC} from '../../../../../../utils/ReactFCC';
import {Control, Controller, FieldValues, UseFormRegisterReturn} from 'react-hook-form';
import {SimpleButton} from '../../../SimpleButton';
import s from '../ChatFormMultipleDateDescription/ChatFormMultipleDateDescription.module.scss';
import {Hint} from '../../../../../../api/deck';
import {Input} from '../../../../../../components/Input';
import {Textarea} from '../../../../../../components/Textarea';
import {Button, ButtonVariant} from '../../../../../../components/Button';
import {Hint as HintCmp, HintsContainer} from '../../../../../../components/Hint';

export interface ChatFormMultipleLinkDescriptionProps {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  control: Control<FieldValues>;
  onSubmit: (e: any) => void;
  setValue: (value: any) => void;
  hint?: Hint | false;
}

export const ChatFormMultipleLinkDescription: ReactFCC<ChatFormMultipleLinkDescriptionProps> = (props) => {
  const {className, registration, control, onSubmit, hint, setValue} = props;

  return (
    <div className={clsx(s.ChatFormMultipleDateDescription, className)}>
      <Controller control={control} render={({ field: { value, onChange }}) => (
        <>
          {/*<HintsContainer isLoading={hint && !hint.value}>*/}
          {/*  {hint && hint.value && (*/}
          {/*    <HintCmp*/}
          {/*      className={s.ChatFormMultipleDateDescription__hint}*/}
          {/*      onClick={() => setValue({ ...hint.value })}*/}
          {/*    >*/}
          {/*        {Object.entries(hint.value).map(([key, val]) => `${key}: ${val}`).join('\n')}*/}
          {/*    </HintCmp>*/}
          {/*  )}*/}
          {/*</HintsContainer>*/}

          <div className={s.ChatFormMultipleDateDescription__items}>
            {Object.entries(value).map(([link, text]: any, index, { length: arrLength }) => {
              return (
                <div className={s.ChatFormMultipleDateDescription__group} key={index}>
                  <Input
                    className={s.ChatFormMultipleDateDescription__input}
                    type={'text'}
                    placeholder={'Ссылка'}
                    value={link}
                    onChange={(e) => {
                      const newValue = { ...value };
                      const text = newValue[link];
                      delete newValue[link];
                      onChange({ ...newValue, [e.target.value]: text })
                    }}
                  />
                  <Textarea
                    rows={1}
                    className={s.ChatFormMultipleDateDescription__textarea}
                    placeholder={'Текст'}
                    value={text}
                    onChange={(e) => {
                      onChange({ ...value, [link]: e.target.value })
                    }}
                  />
                  <div className={s.ChatFormMultipleDateDescription__buttons}>
                    {Object.entries(value).filter((i) => i[0] !== link).length !== 0 && (
                      <Button variant={ButtonVariant.secondary} onClick={() => {
                        const newValue = { ...value };
                        delete newValue[link];
                        if (Object.keys(newValue).length !== 0) {
                          onChange({ ...newValue })
                        }
                      }}>Удалить</Button>
                    )}
                    {index === arrLength - 1 && (
                      <Button variant={ButtonVariant.secondary}
                        onClick={() => {
                          onChange({ ...value, 'Link': '' })
                        }}
                      >Добавить</Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <SimpleButton className={s.ChatFormMultipleRange__button} onClick={onSubmit} />
        </>
      )} name={registration.name!} />
    </div>
  )
};

