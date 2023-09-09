import { FC, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Heading, HeadingSize } from '../../components/Heading';
import { useUrlParam } from '../../hooks/useUrlParam';
import { TEXT_PAGE_PARAM } from '../../app/routes';
import { ETextVariants, Text } from '../../components/Text';
import { Tooltip } from '../../components/Tooltip';
import { Link } from '../../components/Link';
import { useSingleTimeout } from '../../hooks/useSingleTimeout';
import { ScoreType, useText } from '../../api/process';
import { Loader } from '../../components/Loader';
import { BACKEND_MEDIA_PORT, BACKEND_URL } from '../../config';
import { getEntriesFromText } from './utils/getEntriesFromText';
import s from './TextPage.module.scss';

export type TextFields = {
  type: ScoreType;
};

export const TEXT_REFETCH_MS = 500;

export const TextPage: FC = () => {
  const textId = useUrlParam(TEXT_PAGE_PARAM, { parser: parseInt });

  // ------ Работа с данными ------

  const { register, watch } = useForm<TextFields>({
    defaultValues: {
      type: 'bert'
    }
  });

  const scoreType = watch('type');

  const {
    data: textEntity,
    isLoading,
    error
  } = useText({
    textId: textId || 0,
    type: scoreType,
    config: {
      enabled: !!textId,
      refetchInterval: (data) =>
        data?.description?.[scoreType]?.file && data?.description?.[scoreType]?.pdf ? false : TEXT_REFETCH_MS
    }
  });

  const parsedText = useMemo(
    () => getEntriesFromText(textEntity?.description?.[scoreType]?.text || ''),
    [scoreType, textEntity]
  );

  const docxHref = textEntity?.description?.[scoreType]?.file
    ? `${BACKEND_URL}:${BACKEND_MEDIA_PORT}${textEntity?.description?.[scoreType]?.file}`
    : undefined;
  const pdfHref = textEntity?.description?.[scoreType]?.pdf
    ? `${BACKEND_URL}:${BACKEND_MEDIA_PORT}${textEntity?.description?.[scoreType]?.pdf}`
    : undefined;

  // ------ Обработка UI ------

  const textRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const timeout = useSingleTimeout();

  useEffect(() => {
    if (!textRef.current) {
      return;
    }

    const resetTip = () => {
      if (tipRef.current) {
        tipRef.current.style.opacity = `0`;

        timeout.set(() => {
          if (tipRef.current) {
            tipRef.current.style.top = `0px`;
            tipRef.current.style.left = `0px`;
            tipRef.current.style.visibility = `hidden`;
            tipRef.current.innerText = ``;
          }
        }, 500);
      }
    };

    textRef.current.querySelectorAll('span').forEach((item) => {
      item.addEventListener('mouseover', () => {
        const rect = item.getBoundingClientRect();
        const value = Number(item.getAttribute('data-value'));

        if (tipRef.current && value > 0.1) {
          timeout.clear();
          tipRef.current.style.top = `${rect.y - 24}px`;
          tipRef.current.style.left = `${rect.x + 8}px`;
          tipRef.current.style.visibility = `visible`;
          tipRef.current.style.opacity = `1`;
          tipRef.current.innerText = `Точность ${value.toFixed(2)}`;
        }
      });

      item.addEventListener('mouseout', resetTip);
    });

    window.addEventListener('scroll', resetTip);
    window.addEventListener('touchmove', resetTip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedText]);

  // ------ Обработка ошибки ------

  if (error) {
    return null;
  }

  return (
    <div className={s.TextPage}>
      {textEntity && !isLoading ? (
        <div className={s.TextPage__container}>
          <Heading size={HeadingSize.H2} className={s.TextPage__title}>
            Результат обработки запроса №{textEntity.id}
          </Heading>

          <div className={s.TextPage__props}>
            <Text className={s.TextPage__prop} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
              Имя файла: {textEntity.file_name}
            </Text>

            <Text component={'div'} className={s.TextPage__prop} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
              Результат по{' '}
              <Tooltip className={s.TextPage__tooltip} content={'Языковая модель (Bert)'} placement={'right'}>
                <span className={s.TextPage__underline}>нейросетевому</span>
              </Tooltip>{' '}
              методу: {textEntity.score.bert.answer}
              {/*| Accuracy: <span style={{ color: getPercentageColor(0.95) }}>0.95</span>*/}
            </Text>

            <Text component={'div'} className={s.TextPage__prop} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
              Результат по{' '}
              <Tooltip
                className={s.TextPage__tooltip}
                content={'Лемматизация + TF/IDF + RandomForest'}
                placement={'right'}>
                <span className={s.TextPage__underline}>статистическому</span>
              </Tooltip>{' '}
              методу: {textEntity.score.f.answer}
              {/*| Accuracy: <span style={{ color: getPercentageColor(0.71) }}>0.71</span>*/}
            </Text>

            {/*<Text component={'div'} className={s.TextPage__prop} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>*/}
            {/*  Результат по методу{' '}*/}
            {/*  <Tooltip className={s.TextPage__tooltip} content={'Bert + Annoy'}>*/}
            {/*    <span className={s.TextPage__underline}>похожести</span>*/}
            {/*  </Tooltip>*/}
            {/*  : АА+ | Accuracy: <span style={{ color: getPercentageColor(0.63) }}>0.63</span>*/}
            {/*</Text>*/}
          </div>

          <div className={s.TextPage__summary}>
            <Heading size={HeadingSize.H4} className={s.TextPage__summaryHeading}>
              Краткое содержание
            </Heading>

            <Text className={s.TextPage__summaryText} variant={ETextVariants.BODY_M_REGULAR}>
              {textEntity.summary}
            </Text>
          </div>

          <div className={s.TextPage__full}>
            <Heading size={HeadingSize.H4} className={s.TextPage__fullHeading}>
              Полный текст
            </Heading>

            <Text className={s.TextPage__selectLabel} variant={ETextVariants.CAPTION_M_REGULAR}>
              Метод
            </Text>
            <select className={s.TextPage__select} {...register('type')}>
              <option value="bert">Нейросетевой</option>
              <option value="f">Статистический</option>
              {/*<option value="f">Схожести</option>*/}
            </select>

            <Link
              component={'a'}
              className={s.TextPage__summaryLink}
              href={docxHref}
              target={'_blank'}
              // download={textEntity.file_name}
              disabled={!docxHref}>
              Скачать DOCX
            </Link>
            <Link
              component={'a'}
              className={s.TextPage__summaryLink}
              href={pdfHref}
              target={'_blank'}
              // download={textEntity.file_name}
              disabled={!pdfHref}>
              Скачать PDF
            </Link>

            <div className={s.TextPage__fullText} dangerouslySetInnerHTML={{ __html: parsedText }} ref={textRef} />

            <div className={s.TextPage__textTip} ref={tipRef} />
          </div>
        </div>
      ) : (
        <div className={s.TextPage__loaderContainer}>
          <Loader className={s.TextPage__loader} />
        </div>
      )}
    </div>
  );
};
