import { ChangeEvent } from 'react';
import { Control, Controller, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import { ReactFCC } from '../../../../../../utils/ReactFCC';
import { Textarea } from '../../../../../../components/Textarea';
import { Upload } from '../../../../../../components/Upload';
import { SimpleButton } from '../../../SimpleButton';
import s from './ChatFormPhotoDescription.module.scss';

export interface ChatFormPhotoDescriptionProps {
  className?: string;
  onSubmit: (e: any) => void;
  registration: Partial<UseFormRegisterReturn>;
  control: Control<FieldValues>;
}

export const ChatFormPhotoDescription: ReactFCC<ChatFormPhotoDescriptionProps> = (props) => {
  const { className, onSubmit, registration, control } = props;

  return (
    <div className={clsx(s.ChatFormPhotoDescription, className)}>
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            {value.file && <p>Загружен файл: {value.file.name}</p>}

            <Upload
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (!file) {
                  return;
                }

                onChange({ ...value, file });
                e.target.value = '';
              }}
            />

            <Textarea
              placeholder={'Текст'}
              value={value.text}
              onChange={(e) => {
                onChange({ ...value, text: e.target.value });
              }}
            />

            <SimpleButton onClick={onSubmit} />
          </>
        )}
        name={registration.name!}
      />
    </div>
  );
};
