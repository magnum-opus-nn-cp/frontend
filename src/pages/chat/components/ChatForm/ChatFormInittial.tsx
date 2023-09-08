import {ReactFCC} from '../../../../utils/ReactFCC';
import s from './components/ChatFormText/ChatFormText.module.scss';
import {Textarea} from '../../../../components/Textarea';
import {KeyboardEvent} from 'react';
import {isKey} from '../../../../utils/isKey';
import {Key} from 'ts-key-enum';
import {Button} from '../../../../components/Button';
import {Form} from '../../../../components/Form';
import {SubmitHandler} from 'react-hook-form';
import {ReactComponent as RightIcon} from '../../../../assets/icons/right.svg';

export interface ChatFormInitialProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  onSubmit: SubmitHandler<any>;
}

export const ChatFormInitial: ReactFCC<ChatFormInitialProps> = (props) => {
  const {onSubmit} = props;

  return (
    <Form>
      {({ register, handleSubmit }) => {
        return (
          <div className={s.ChatFormText__richInput}>
            <Textarea
              className={s.ChatFormText__input}
              placeholder={'Введите сообщение'}
              rows={1}
              cols={33}
              onKeyDown={(e: KeyboardEvent) => {
                if (isKey(e.nativeEvent, Key.Enter)) {
                  e.preventDefault();
                  handleSubmit(onSubmit)(e);
                }
              }}
              registration={register('description', {
                required: true,
                max: 1000,
              })}
            />

            <Button className={s.ChatFormText__richInputButton} onClick={handleSubmit(onSubmit)}>
              <RightIcon className={s.ChatFormText__buttonIcon} />
            </Button>
          </div>
        )
      }}
    </Form>
  );
};

