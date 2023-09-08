import {ReactFCC} from '../../../../../../utils/ReactFCC';
import {ChangeEvent} from 'react';
import s from '../ChatFormPhotoDescription/ChatFormPhotoDescription.module.scss';
import {UploadButton} from '../../../../../../components/UploadButton';
import {Control, Controller, FieldValues, UseFormRegisterReturn} from 'react-hook-form';
import {SimpleButton} from '../../../SimpleButton';
import clsx from 'clsx';

export interface ChatFormMultiplePhotoProps {
  className?: string;
  onSubmit: (e: any) => void;
  registration: Partial<UseFormRegisterReturn>;
  control: Control<FieldValues>;
}

export const ChatFormMultiplePhoto: ReactFCC<ChatFormMultiplePhotoProps> = (props) => {
  const {className, onSubmit, registration, control } = props;

  return (
    <div className={clsx(s.ChatFormPhotoDescription, className)}>
      <Controller control={control} render={({ field: { value, onChange }}) => (
        <>
          {value && Object.values(value).map((file: any, index) => (
            <p key={index}>Загружен файл: {file.name}</p>
          ))}

          <UploadButton
            multiple={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files) {
                return;
              }

              const files: any = { ...value };
              Array.from(e.target.files).forEach((file, index) => {
                files[`file_${Object.keys(files).length + 1}`] = file;
              });

              onChange({ ...files })
            }}
          />

          <SimpleButton onClick={onSubmit} />
        </>
      )} name={registration.name!} />
    </div>
  );
};

