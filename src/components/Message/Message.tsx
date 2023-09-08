import clsx from 'clsx';
import s from './Message.module.scss';
import {ReactFCC} from '../../utils/ReactFCC';

export enum MessageVariant {
  primary = 'primary',
  secondary = 'secondary'
}

export enum MessageType {
  right = 'right',
  left = 'left'
}

export interface MessageProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  variant?: MessageVariant;
  type: MessageType;
}

export const Message: ReactFCC<MessageProps> = (props) => {
  const { children, className, variant, type } = props;

  return (
    <div className={clsx(s.Message, s[`Message_variant_${variant}`], s[`Message_type_${type}`], className)}>
      {children}
    </div>
  );
};

