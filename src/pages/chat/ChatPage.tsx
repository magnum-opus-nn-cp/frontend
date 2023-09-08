import {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import s from './ChatPage.module.scss';
import {ReactFCC} from '../../utils/ReactFCC';
import {ChatContent} from './components/ChatContent';
import {ChatItemType, useChatHistory} from './store/history';
import {SubmitHandler} from 'react-hook-form';
import {getFirstQuestion, useCreateDeck} from '../../api/deck';
import {ChatFormInitial} from './components/ChatForm/ChatFormInittial';
import {useChatUi} from './hooks/useChatUi';
import {useQuestion} from '../../api/deck/getQuestion';
import {useCreateAnswer} from '../../api/deck/createAnswer';
import {QuestionFactory} from './components/ChatForm/QuestionFactory';
import {useSingleTimeout} from '../../hooks/useSingleTimeout';
import {usePrevious} from '../../hooks/usePrevious';
import {generateAnswerFromData} from './utils/generateAnswerFromData';
import {generateTextFromAnswer} from './utils/generateTextFromAnswer';
import {Button, ButtonVariant} from '../../components/Button';
import {useNavigate} from 'react-router-dom';
import {generateFieldsForFileAnswers} from './utils/generateFieldsForFileAnswers';

export interface ChatPageProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

const QUESTION_POLLING_MS = 1000;

const DEFAULT_DECK_ID = 0;
const DEFAULT_QUESTION_ID = 0;

export const ChatPage: ReactFCC<ChatPageProps> = (props) => {
  const {className} = props;

  const timeout = useSingleTimeout();

  // Работа с UI
  const { backgroundRef, containerRef, contentRef, inputContainerRef } = useChatUi();

  const { history, pushHistory } = useChatHistory();
  const initRef = useRef(false);

  // Устанавливаем первый вопрос в чат
  useEffect(() => {
    if (!initRef.current) {
      pushHistory({
        type: ChatItemType.receive,
        text: 'Введите описание проекта (не больше 2-3 предложений)',
      });
      initRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Работа с API
   */

  const [deckId, setDeckId] = useState(DEFAULT_DECK_ID);
  const [questionId, setQuestionId] = useState(DEFAULT_QUESTION_ID);

  const { mutateAsync: createDeck } = useCreateDeck();

  const onSubmitInitial: SubmitHandler<any> = useCallback(async (data) => {
    const deck = await createDeck({
      description: data.description
    });
    setDeckId(deck.id);
    pushHistory({
      type: ChatItemType.send,
      text: deck.description as string
    });

    const firstQuestion = await getFirstQuestion({ deckId });
    setQuestionId(firstQuestion.id);
  }, [createDeck, deckId, pushHistory]);

  // Начинаем пинг-понг вопросов-ответов

  const { data: question, refetch: refetchQuestion } = useQuestion({
    deckId,
    questionId,
    config: {
      enabled: !!(deckId && questionId),
      // keepPreviousData: true,
    }
  });

  const prevQuestion = usePrevious(question);

  useEffect(() => {
    if (question && question.id !== prevQuestion?.id) {
      timeout.clear();

      pushHistory({
        type: ChatItemType.receive,
        text: question.text
      });

      const startPolling = () => {
        timeout.set(async () => {
          const { data: newQuestion } = await refetchQuestion();
          if (newQuestion?.hint && !newQuestion.hint.type) {
            startPolling();
          }
        }, QUESTION_POLLING_MS);
      }

      if (question?.hint && !question.hint.type) {
        startPolling();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushHistory, question]);


  const { mutateAsync: createAnswer } = useCreateAnswer();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<any> = useCallback(async (data) => {
    if (!question || !data.value) {
      return;
    }

    timeout.clear();

    const answerValue = generateAnswerFromData(question, data);
    const additionalFields = generateFieldsForFileAnswers(question, data);

    const answer = await createAnswer({
      deckId,
      questionId,
      answer: answerValue,
      ...additionalFields,
      isFile: !!additionalFields && Object.keys(additionalFields).length !== 0
    });

    pushHistory({
      type: ChatItemType.send,
      text: generateTextFromAnswer(question.type, answer, additionalFields)
    });

    if (question.next_id) {
      setQuestionId(question!.next_id);
    } else {
      // navigate(DECK_PAGE_ROUTE.replace(`:${DECK_PAGE_PARAM}`, String(deckId)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createAnswer, deckId, pushHistory, question, questionId]);

  // Пропуск вопроса
  const onSkip = useCallback(() => {
    if (question && !question.params?.required) {
      if (question.next_id) {
        setQuestionId(question!.next_id);
      } else {
        // navigate(DECK_PAGE_ROUTE.replace(`:${DECK_PAGE_PARAM}`, String(deckId)))
      }
    }
  }, [deckId, navigate, question]);

  // ---------- Скролл чата ----------
  // todo при печатании текста тоже двигать скролл
  useEffect(() => {
    if (contentRef.current && inputContainerRef.current) {
      contentRef.current.style.paddingBottom = inputContainerRef.current.scrollHeight + 'px';
      containerRef.current?.scrollTo({ top: contentRef.current.scrollHeight });
    }
  }, [containerRef, contentRef, history, question, inputContainerRef]);

  return (
    <div className={clsx(s.ChatPage, className)}>
      <div className={s.ChatPage__inner} ref={backgroundRef}>
        <div className={s.ChatPage__container} ref={containerRef}>
          <div className={s.ChatPage__content} ref={contentRef}>
            <ChatContent history={history} />
          </div>
        </div>

        <div className={s.ChatPage__inputContainer} ref={inputContainerRef}>
          {question ? (
            <>
              <QuestionFactory onSubmit={onSubmit} {...question} />
              {!question.params?.required && (
                <Button
                  className={s.ChatPage__skipButton}
                  variant={ButtonVariant.secondary}
                  onClick={() => onSkip()}
                >Пропустить</Button>
              )}
            </>
          ) : !deckId ? (
            <ChatFormInitial onSubmit={onSubmitInitial} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

