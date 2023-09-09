import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { ReactFCC } from '../../utils/ReactFCC';
import { Heading, HeadingSize } from '../../components/Heading';
import { ETextVariants, Text } from '../../components/Text';
import { Button, ButtonSize, ButtonVariant } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { Textarea } from '../../components/Textarea';
import { useCreateProcess, useProcess } from '../../api/process';
import { useSingleTimeout } from '../../hooks/useSingleTimeout';
import { Upload } from '../../components/Upload';
import { Attachment } from '../../components/Attachment';
import { Loader } from '../../components/Loader';
import { PathBuilder } from '../../app/routes';
import { ReactComponent as PlusIcon } from './assets/plus.svg';
import s from './HomePage.module.scss';

export type FormFields = {
  text?: string;
  files: File[];
};

// 3207
export const PROCESS_POLLING_MS = 2000;

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

  // const [processId, setProcessId] = useState<string | null>(null);

  const {
    data: createProcessResponse,
    mutateAsync: createProcess,
    isLoading: createProcessLoading
  } = useCreateProcess();
  const processId = createProcessResponse?.id;

  const {
    data: process,
    refetch: refetchProcess,
    isFetching: processFetching
  } = useProcess({
    processId: processId || '',
    config: {
      enabled: !!processId
    }
  });

  const timeout = useSingleTimeout();

  const onSubmit: SubmitHandler<FormFields> = useCallback(
    async (data) => {
      await createProcess({
        text: data.text,
        files: data.files
      });
    },
    [createProcess]
  );

  useEffect(() => {
    if (processId) {
      const startPolling = () => {
        timeout.set(async () => {
          const { data: process } = await refetchProcess();
          if (process && process.current < process.total) {
            startPolling();
          }
        }, PROCESS_POLLING_MS);
      };

      if (processId) {
        startPolling();
      }
    }
  }, [processId, refetchProcess, timeout]);

  const navigate = useNavigate();

  useEffect(() => {
    if (processId && process && process.current === process.total) {
      navigate(PathBuilder.getProcessPath(processId));
    }
  }, [navigate, process, processId]);

  // ------ Обработка DnD ------

  const currentText = watch('text');
  const currentFiles = watch('files');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue('text', '');
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

  const isLoading =
    createProcessLoading || !!processId || processFetching || !!(process && process.current < process.total);
  const isDisabled = !currentText && currentFiles.length === 0;

  return (
    <div className={s.HomePage}>
      {!isLoading ? (
        <div className={s.HomePage__main}>
          <Heading size={HeadingSize.H2} className={s.HomePage__title}>
            Анализ текстовых пресс-релизов
          </Heading>

          <Text className={s.HomePage__text} variant={ETextVariants.BODY_M_REGULAR}>
            Позволяет оценить кредитный рейтинг компании на основе пресс-релиза с выделением в тексте ключевых фраз с
            использованием различных методов.
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
                  classes={{
                    input: s.HomePage__textareaInput
                  }}
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

            <Divider className={s.HomePage__divider} />

            <Button
              type={'submit'}
              className={s.HomePage__submitButton}
              size={ButtonSize.large_x}
              isLoading={isLoading}
              disabled={isDisabled}>
              Отправить
            </Button>
          </form>
        </div>
      ) : (
        <div className={s.HomePage__loaderContainer}>
          <Loader className={s.HomePage__loader} />
          <div className={s.HomePage__loaderText}>
            {process?.current ?? 0}/{process?.total ?? 0}
          </div>
        </div>
      )}
    </div>
  );
};
