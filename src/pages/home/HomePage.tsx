import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import { ReactFCC } from '../../utils/ReactFCC';
import { Heading, HeadingSize } from '../../components/Heading';
import { ETextVariants, Text } from '../../components/Text';
import { Button, ButtonSize, ButtonVariant } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { Textarea } from '../../components/Textarea';
import { useCreateProcess } from '../../api/process';
import { useProcess } from '../../api/process/getProcess';
import { useSingleTimeout } from '../../hooks/useSingleTimeout';
import { Upload } from '../../components/Upload';
import { Attachment } from '../../components/Attachment';
import { ReactComponent as PlusIcon } from './assets/plus.svg';
import s from './HomePage.module.scss';

export type FormFields = {
  text?: string;
  files: File[];
};

export const PROCESS_POLLING_MS = 500;

export const HomePage: ReactFCC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormFields>({
    defaultValues: {
      files: []
    }
  });

  const [processId, setProcessId] = useState<string | null>(null);

  const { data: process, refetch: refetchProcess } = useProcess({
    processId: processId || '',
    config: {
      enabled: !!processId
    }
  });

  const { mutateAsync: createProcess, isLoading } = useCreateProcess();

  const timeout = useSingleTimeout();

  const onSubmit: SubmitHandler<FormFields> = useCallback(
    async (data) => {
      const response = await createProcess({
        text: data.text
      });

      setProcessId(response.id);
    },
    [createProcess]
  );

  useEffect(() => {
    if (processId) {
      const startPolling = () => {
        timeout.set(async () => {
          const { data: process } = await refetchProcess();
          if (process && process.done < process.count) {
            startPolling();
          }
        }, PROCESS_POLLING_MS);
      };

      if (processId) {
        startPolling();
      }
    }
  }, [processId, refetchProcess, timeout]);

  // todo it's mock!
  useEffect(() => {
    if (process && process.done === process.count) {
      alert(`Кредитный рейтинг ${process.texts[0].score}`);
    }
  }, [process]);

  // ------ Обработка DnD ------

  const currentText = watch('text');
  const currentFiles = watch('files');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue('files', [...currentFiles, ...acceptedFiles]);
    },
    [currentFiles, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true
    // todo подумать насчет валидации на фронте (нужна ли?)
    // accept: {
    //   'application/msword': ['.doc'],
    //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    //   'application/vnd.ms-excel': ['.xls'],
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    // }
  });

  // ------ Логика UI ------

  const isDisabled = !currentText && currentFiles.length === 0;

  return (
    <div className={s.HomePage}>
      <Heading size={HeadingSize.H2} className={s.HomePage__title}>
        Анализ текстовых пресс-релизов
      </Heading>

      <Text className={s.HomePage__text} variant={ETextVariants.BODY_M_REGULAR}>
        Позволяет оценить кредитный рейтинг компании на основе пресс-релиза с выделением в тексте меток по различным
        метрикам.
      </Text>

      <form className={s.HomePage__box} onSubmit={handleSubmit(onSubmit)}>
        <div
          className={clsx(s.HomePage__dropBox, {
            [s.HomePage__dropBox_hidden]: isDragActive
          })}
          {...getRootProps()}>
          {currentFiles.length === 0 ? (
            <Textarea
              className={s.HomePage__textarea}
              registration={register('text')}
              rows={8}
              placeholder={'Текст пресс-релиза...'}
              error={!!errors.text}
            />
          ) : (
            <div className={s.HomePage__filesContainer}>
              {currentFiles.map((item, index) => (
                <Attachment
                  file={item}
                  onClick={() => setValue('files', [...currentFiles.filter((i) => i !== item)])}
                  key={index}
                />
              ))}
            </div>
          )}

          <Text className={s.HomePage__uploadHint} variant={ETextVariants.CAPTION_S_REGULAR}>
            Загрузите файлы, перетащив их мышкой или нажав кнопку ниже <br />
            Доступны файлы Word, Excel, PDF, TXT, изображения
          </Text>

          <Upload {...getInputProps()}>
            <Button
              component={'div'}
              className={s.HomePage__uploadButton}
              variant={ButtonVariant.secondary}
              size={ButtonSize.small_x}>
              Загрузить файлы
            </Button>
          </Upload>

          <div className={s.HomePage__dropBoxPlaceholder}>
            <PlusIcon className={s.HomePage__dropBoxPlaceholderIcon} />
          </div>
        </div>

        {/*<Text className={s.HomePage__orHint} variant={ETextVariants.PROGRAMMING_CODE_MEDIUM}>*/}
        {/*  ИЛИ*/}
        {/*</Text>*/}

        {/*<Button className={s.HomePage__button} size={ButtonSize.large}>*/}
        {/*  Выбрать DOCX/PDF файл*/}
        {/*</Button>*/}

        {/*<Text className={s.HomePage__buttonHint} variant={ETextVariants.BODY_S_REGULAR}>*/}
        {/*  Или перетащите файл мышкой*/}
        {/*</Text>*/}

        <Divider className={s.HomePage__divider} />

        <Button
          type={'submit'}
          className={s.HomePage__button}
          size={ButtonSize.large_x}
          isLoading={isLoading}
          disabled={isDisabled}>
          Отправить
        </Button>
      </form>
    </div>
  );
};
