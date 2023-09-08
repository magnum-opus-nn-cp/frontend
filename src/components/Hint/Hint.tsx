import clsx from 'clsx';
import s from './Hint.module.scss';
import {ReactFCC} from '../../utils/ReactFCC';
import {FC} from 'react';
import {useHover} from '../../hooks/useHover';
import {useIsMobile} from '../../hooks/useIsMobile';
import {useToggle} from '../../hooks/useToggle';
import {Button, ButtonVariant} from '../Button';

export interface HintProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  // children: string;
  onClick?: () => void;
}

export const Hint: ReactFCC<HintProps> = (props) => {
  const {children, className, onClick: onClickProp} = props;

  const isMobile = useIsMobile();

  const [hoveredMobile, { toggle }] = useToggle();

  const { hovered: hoveredDesktop, ...hoverProps } = useHover();

  const hintProps = isMobile ? {} : hoverProps;

  const onClick = () => {
    if (isMobile) {
      toggle()
    }
  }

  const hovered = isMobile ? hoveredMobile : hoveredDesktop;

  return (
    <div className={clsx(s.Hint__container, hovered && s.Hint__container_hovered)} onClick={() => {
      if (!isMobile) {
        onClickProp?.();
      }
    }}>
      <div className={s.Hint__tip} />
      <div className={clsx(s.Hint, className, {[s.Hint_hovered]: hovered})} {...hintProps} onClick={onClick}>
        {children}

        {isMobile && hovered && (
          <Button variant={ButtonVariant.secondary} className={s.Hint__button} onClick={(e: any) => {
            e.stopPropagation();
            if (isMobile) {
              onClickProp?.();
            }
          }}>Использовать</Button>
        )}
      </div>
    </div>
  );
};

export interface HintsContainerProps {
  isLoading?: boolean;
  margin?: boolean;
}

export const HintsContainer: ReactFCC<HintsContainerProps> = ({ children, isLoading, margin }) => {
  return (
    <div className={clsx(s.Hints, (children || isLoading) && margin && s.Hints_margin)}>{!isLoading ? children : (
      <div className={s.Hints__stub}>Загрузка подсказок...</div>
    )}</div>
  )
}
