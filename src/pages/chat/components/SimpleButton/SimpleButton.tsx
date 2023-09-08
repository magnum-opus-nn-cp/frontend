import clsx from 'clsx';
import s from './SimpleButton.module.scss';
import {Button} from '../../../../components/Button';
import {ReactFCC} from '../../../../utils/ReactFCC';
import {ReactComponent as RightIcon} from '../../../../assets/icons/right.svg';

export interface SimpleButtonProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  onClick?: (e: any) => void;
}

export const SimpleButton: ReactFCC<SimpleButtonProps> = (props) => {
  const {children, className, onClick} = props;

  return (
    <Button className={clsx(s.SimpleButton, className)} classes={{text: s.SimpleButton__text}} onClick={onClick}>
      {children || 'Вперед!'}
      <RightIcon className={s.ChatPage__buttonIcon} />
    </Button>
  );
};

