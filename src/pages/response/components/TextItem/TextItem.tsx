import clsx from 'clsx';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { ETextVariants, Text } from '../../../../components/Text';
import { getPercentageColor } from '../../../../utils/getPercentageColor';
import { Link } from '../../../../components/Link';
import { TextDescriptor } from '../../../../api/process';
import s from './TextItem.module.scss';

export interface TextItemProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  text: TextDescriptor;
  onClick?: () => void;
  onClickSummary?: () => void;
}

export const TextItem: ReactFCC<TextItemProps> = (props) => {
  const { className, text, onClick, onClickSummary } = props;

  return (
    <div className={clsx(s.TextItem, className)} onClick={onClick}>
      <div className={clsx(s.TextItem__row, s.TextItem__row_name)}>
        <Text className={s.TextItem__name} component={'span'} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          #{text.id} | {text.file_name}
        </Text>
      </div>

      <div className={s.TextItem__row}>
        <Text component={'span'} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          Нейросетевой метод: {text.score.bert.answer}{' '}
          {text.score.bert.metric && (
            <>
              | Точность{' '}
              <span style={{ color: getPercentageColor(text.score.bert.metric) }}>
                {text.score.bert.metric.toFixed(2)}
              </span>
            </>
          )}
        </Text>
      </div>

      <div className={s.TextItem__row}>
        <Text component={'span'} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          Статистический метод: {text.score.f.answer}{' '}
          {text.score.f.metric && (
            <>
              | Точность{' '}
              <span style={{ color: getPercentageColor(text.score.f.metric) }}>{text.score.f.metric.toFixed(2)}</span>
            </>
          )}
        </Text>
      </div>

      <div className={s.TextItem__row}>
        <Text component={'span'} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          Метод схожести: {text.score.nearest.answer}{' '}
          {text.score.nearest.metric && (
            <>
              | Точность{' '}
              <span style={{ color: getPercentageColor(text.score.nearest.metric) }}>
                {text.score.nearest.metric.toFixed(2)}
              </span>
            </>
          )}
        </Text>
      </div>

      <div className={s.TextItem__row}>
        <Text component={'span'} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          Итоговая оценка: {text.score.total as unknown as string}
        </Text>
      </div>

      <div className={clsx(s.TextItem__row, s.TextItem__row_link)}>
        <Text component={'span'} variant={ETextVariants.BODY_S_REGULAR}>
          <Link
            component={'button'}
            standalone={false}
            onClick={(e) => {
              e.stopPropagation();
              onClickSummary?.();
            }}>
            Краткое содержание
          </Link>
        </Text>
      </div>
    </div>
  );
};
