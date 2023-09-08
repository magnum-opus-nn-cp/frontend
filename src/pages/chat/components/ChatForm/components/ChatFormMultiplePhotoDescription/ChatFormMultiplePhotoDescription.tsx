import { ChangeEvent } from 'react';
import { Control, Controller, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import { ReactFCC } from '../../../../../../utils/ReactFCC';
import { SimpleButton } from '../../../SimpleButton';
import s from '../ChatFormMultipleDateDescription/ChatFormMultipleDateDescription.module.scss';
import { Textarea } from '../../../../../../components/Textarea';
import { Button, ButtonVariant } from '../../../../../../components/Button';
import { Upload } from '../../../../../../components/Upload';

export interface ChatFormMultiplePhotoDescriptionProps {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  control: Control<FieldValues>;
  onSubmit: (e: any) => void;
}

export const ChatFormMultiplePhotoDescription: ReactFCC<ChatFormMultiplePhotoDescriptionProps> = (props) => {
  const { className, registration, control, onSubmit } = props;

  return (
    <div className={clsx(s.ChatFormMultipleDateDescription, className)}>
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <div className={s.ChatFormMultipleDateDescription__items}>
              {value.map((item: any, index: number, { length: arrLength }: any) => {
                return (
                  <div className={s.ChatFormMultipleDateDescription__group} key={index}>
                    {item.file && (
                      <p className={s.ChatFormMultipleDateDescription__itemName}>Загружен файл: {item.file.name}</p>
                    )}

                    <Textarea
                      rows={1}
                      className={s.ChatFormMultipleDateDescription__textarea}
                      placeholder={'Описание'}
                      value={item.text}
                      onChange={(e) => {
                        const itemIndex = value.indexOf(item);
                        const newItem = { ...item, text: e.target.value };
                        onChange([...value.slice(0, itemIndex), newItem, ...value.slice(itemIndex + 1)]);
                      }}
                    />
                    <div className={s.ChatFormMultipleDateDescription__buttons}>
                      <Button
                        variant={ButtonVariant.secondary}
                        onClick={() => {
                          const newValue = value.filter((i: any) => i !== item);
                          if (Object.keys(newValue).length !== 0) {
                            onChange([...newValue]);
                          }
                        }}>
                        Удалить
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <Upload
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (!file) {
                  return;
                }

                onChange([...value, { file, text: '' }]);
                e.target.value = '';
              }}
            />

            <SimpleButton className={s.ChatFormMultipleRange__button} onClick={onSubmit} />
          </>
        )}
        name={registration.name!}
      />
    </div>
  );
};
