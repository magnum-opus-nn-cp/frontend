import clsx from 'clsx';
import {ReactFCC} from '../../../utils/ReactFCC';
import s from '../ChatPage.module.scss';
import {Message, MessageType, MessageVariant} from '../../../components/Message';
import {Fragment, memo} from 'react';
import {mediaQuery, useMediaQueryResult} from '../../../hooks/useMediaQueryResult';
import {ChatItem, ChatItemType} from '../store/history';

export interface ChatMockProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  history: ChatItem[];
}

export const ChatContent: ReactFCC<ChatMockProps> = memo(function ChatMock(props) {
  const { history } = props;

  const isLarge = useMediaQueryResult(mediaQuery.desktopMediumUp);
  const messageTypeForSend = isLarge ? MessageType.left : MessageType.right;
  const messageTypeClassForSend = isLarge ? s.ChatPage__message_left : s.ChatPage__message_right;

  return (
    <>
      {history.map((item, index) => (
        <Message
          className={clsx(s.ChatPage__message, {
            [messageTypeClassForSend]: item.type === ChatItemType.send,
            [s.ChatPage__message_left]: item.type === ChatItemType.receive,
          })}
          type={item.type === ChatItemType.send ? messageTypeForSend : MessageType.left}
          variant={item.type === ChatItemType.send ? MessageVariant.primary : MessageVariant.secondary}
          key={index}>
          {item.text}
        </Message>
      ))}
      {/*{Array(5).fill(null).map((_, index) => (*/}
      {/*  <Fragment key={index}>*/}
      {/*    <Message*/}
      {/*      className={clsx(s.ChatPage__message, s.ChatPage__message_left)}*/}
      {/*      type={MessageType.left}*/}
      {/*      variant={MessageVariant.secondary}>*/}
      {/*      Какие метрики вы используете чтобы отслеживать прогресс развития проекта?*/}
      {/*    </Message>*/}

      {/*    <Message*/}
      {/*      className={clsx(s.ChatPage__message, messageTypeClassForSend)}*/}
      {/*      type={messageTypeForSend}*/}
      {/*      variant={MessageVariant.primary}>*/}
      {/*      Возможными метриками для отслеживания прогресса могут быть: количество скачиваний и использования приложения/сервиса, количество активных пользователей, уровень удовлетворенности пользователей, объем продаж/дохода, показатели роста/расширения компании и др.*/}
      {/*    </Message>*/}

      {/*    <Message*/}
      {/*      className={clsx(s.ChatPage__message, s.ChatPage__message_left)}*/}
      {/*      type={MessageType.left}*/}
      {/*      variant={MessageVariant.secondary}>*/}
      {/*      На чем вы зарабатываете? Сколько и за что вам платят клиенты*/}
      {/*    </Message>*/}

      {/*    <Message*/}
      {/*      className={clsx(s.ChatPage__message, messageTypeClassForSend)}*/}
      {/*      type={messageTypeForSend}*/}
      {/*      variant={MessageVariant.primary}>*/}
      {/*      Проект может зарабатывать на платной подписке*/}
      {/*    </Message>*/}

      {/*    <Message*/}
      {/*      className={clsx(s.ChatPage__message, s.ChatPage__message_left)}*/}
      {/*      type={MessageType.left}*/}
      {/*      variant={MessageVariant.secondary}>*/}
      {/*      Какие метрики вы используете чтобы отслеживать прогресс развития проекта?*/}
      {/*    </Message>*/}

      {/*    <Message*/}
      {/*      className={clsx(s.ChatPage__message, messageTypeClassForSend)}*/}
      {/*      type={messageTypeForSend}*/}
      {/*      variant={MessageVariant.primary}>*/}
      {/*      Возможными метриками для отслеживания прогресса могут быть: количество скачиваний и использования приложения/сервиса, количество активных пользователей, уровень удовлетворенности пользователей, объем продаж/дохода, показатели роста/расширения компании и др.*/}
      {/*    </Message>*/}
      {/*  </Fragment>*/}
      {/*))}*/}
    </>
  );
});

