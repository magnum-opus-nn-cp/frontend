import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Heading, HeadingSize } from '../../components/Heading';
import { useUrlParam } from '../../hooks/useUrlParam';
import { TEXT_PAGE_PARAM } from '../../app/routes';
import { ETextVariants, Text } from '../../components/Text';
import { Tooltip } from '../../components/Tooltip';
import { Link } from '../../components/Link';
import { useSingleTimeout } from '../../hooks/useSingleTimeout';
import { DetailDescriptor, ScoreType, useText } from '../../api/process';
import { Loader } from '../../components/Loader';
import { BACKEND_MEDIA_PORT, BACKEND_URL } from '../../config';
import { getPercentageColor } from '../../utils/getPercentageColor';
import { ModalBody, ModalContainer, useModal } from '../../components/Modal';
import { getEntriesFromText } from './utils/getEntriesFromText';
import { getTextFromDetailed } from './utils/getTextFromDetailed';
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
  const isDetailedScoreType = !(['bert', 'f'] as ScoreType[]).includes(scoreType);

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
        // !isDetailedScoreType &&
        !data?.description?.[scoreType]?.file || !data?.description?.[scoreType]?.pdf ? TEXT_REFETCH_MS : false
    }
  });

  console.log(textEntity?.description?.nearest?.text);

  const parsedText = useMemo(
    () =>
      isDetailedScoreType
        ? getTextFromDetailed(textEntity?.description?.nearest?.text as DetailDescriptor[])
        : getEntriesFromText((textEntity?.description?.[scoreType]?.text as string) || ''),
    [isDetailedScoreType, scoreType, textEntity]
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

  // Модалка
  const [isOpen, setIsOpen] = useState(false);
  const [activeDetailedIndex, setActiveDetailedIndex] = useState<number>(-1);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const { modalIsVisible, isClosing, close } = useModal({ isOpen, onClose });
  const openDetailed = useCallback((index: number = -1) => {
    setActiveDetailedIndex(index);
    setIsOpen(true);
  }, []);
  const activeDetailed = (textEntity?.description?.nearest?.text as DetailDescriptor[])?.[activeDetailedIndex];

  useEffect(() => {
    if (!textRef.current) {
      return;
    }

    // ------ Обработка хинтов ------

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

    textRef.current.querySelectorAll('.hintText').forEach((item) => {
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

    // ------ Обработка текста с похожими текстами ------

    textRef.current.querySelectorAll('.detailedText').forEach((item) => {
      item.addEventListener('click', (e) => {
        const index = Number(item.getAttribute('data-index')) ?? -1;
        openDetailed(index);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedText, openDetailed]);

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

            <Text component={'div'} className={s.TextPage__prop} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
              Результат по методу{' '}
              <Tooltip className={s.TextPage__tooltip} content={'Bert + Annoy'}>
                <span className={s.TextPage__underline}>схожести</span>
              </Tooltip>
              : {textEntity.score.nearest.answer}
              {textEntity.score.nearest.metric && (
                <>
                  | Точность:{' '}
                  <span style={{ color: getPercentageColor(textEntity.score.nearest.metric / 100) }}>
                    {(textEntity.score.nearest.metric / 100).toFixed(2)}
                  </span>
                </>
              )}
            </Text>
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
              <option value="nearest">Схожести</option>
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

            {isDetailedScoreType ? (
              <>
                <div className={s.TextPage__fullText} dangerouslySetInnerHTML={{ __html: parsedText }} ref={textRef} />
              </>
            ) : (
              <>
                <div className={s.TextPage__fullText} dangerouslySetInnerHTML={{ __html: parsedText }} ref={textRef} />
                <div className={s.TextPage__textTip} ref={tipRef} />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={s.TextPage__loaderContainer}>
          <Loader className={s.TextPage__loader} />
        </div>
      )}

      <ModalContainer isOpen={modalIsVisible} onClose={close} isClosing={isClosing}>
        <ModalBody className={s.TextPage__modalBody}>
          {activeDetailed && (
            <>
              <p>
                <b>Рейтинг {activeDetailed.features[0]}</b>
              </p>
              <p>
                Точность{' '}
                <span style={{ color: getPercentageColor(activeDetailed.features[1] / 100) }}>
                  {(activeDetailed.features[1] / 100).toFixed(2)}
                </span>
              </p>
              {activeDetailed.features[2].map((text, index) => (
                <p className={s.TextPage__modalParagraph} key={index}>
                  {text}
                </p>
              ))}
            </>
          )}
        </ModalBody>
      </ModalContainer>
    </div>
  );
};
