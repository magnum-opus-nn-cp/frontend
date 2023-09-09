import clsx from 'clsx';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { ETextVariants, Text } from '../../../../components/Text';
import { getPercentageColor } from '../../../../utils/getPercentageColor';
import { Link } from '../../../../components/Link';
import s from './TextItem.module.scss';

export interface TextItemProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;

  onClickSummary?: () => void;
}

export const TextItem: ReactFCC<TextItemProps> = (props) => {
  const { className, onClickSummary } = props;

  return (
    <div className={clsx(s.TextItem, className)}>
      <div className={clsx(s.TextItem__row, s.TextItem__row_name)}>
        {/*<Text component={'span'} variant={ETextVariants.BODY_S_MEDIUM}>*/}
        {/*  Имя:*/}
        {/*</Text>{' '}*/}
        <Text className={s.TextItem__name} component={'span'} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          file.txt #1
        </Text>
        {/*{' | '}*/}
        {/*<Text component={'span'} variant={ETextVariants.BODY_S_REGULAR}>*/}
        {/*  file.txt*/}
        {/*</Text>*/}
      </div>

      <div className={s.TextItem__row}>
        <Text component={'span'} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          М. н-с: AA+ | <span style={{ color: getPercentageColor(0.63) }}>0.63</span>
        </Text>{' '}
      </div>

      <div className={s.TextItem__row}>
        <Text component={'span'} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          М. стат: AA+ | <span style={{ color: getPercentageColor(0.63) }}>0.63</span>
        </Text>{' '}
      </div>

      <div className={s.TextItem__row}>
        <Text component={'span'} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          М. п: AA+ | <span style={{ color: getPercentageColor(0.63) }}>0.63</span>
        </Text>{' '}
      </div>

      <div className={clsx(s.TextItem__row, s.TextItem__row_link)}>
        <Text component={'span'} variant={ETextVariants.BODY_S_REGULAR}>
          <Link component={'button'} standalone={false} onClick={() => onClickSummary?.()}>
            Краткое содержание
          </Link>
        </Text>
      </div>
    </div>
  );
};
