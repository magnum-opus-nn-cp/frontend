import { FC } from 'react';
import { Heading, HeadingSize } from '../../components/Heading';
import { useUrlParam } from '../../hooks/useUrlParam';
import { TEXT_PAGE_PARAM } from '../../app/routes';
import { ETextVariants, Text } from '../../components/Text';
import { getPercentageColor } from '../../utils/getPercentageColor';
import { Tooltip } from '../../components/Tooltip';
import { Link } from '../../components/Link';
import s from './TextPage.module.scss';

export const TextPage: FC = () => {
  const textId = useUrlParam(TEXT_PAGE_PARAM, { parser: parseInt });

  return (
    <div className={s.TextPage}>
      <Heading size={HeadingSize.H2} className={s.TextPage__title}>
        Результат обработки запроса №{textId}
      </Heading>

      <div className={s.TextPage__props}>
        <Text className={s.TextPage__prop} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          Имя файла: file.txt
        </Text>

        <Text component={'div'} className={s.TextPage__prop} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          Результат по{' '}
          <Tooltip className={s.TextPage__tooltip} content={'Языковая модель (Berd)'}>
            <span className={s.TextPage__underline}>нейросетевому</span>
          </Tooltip>{' '}
          методу: АА+ | Accuracy: <span style={{ color: getPercentageColor(0.95) }}>0.95</span>
        </Text>

        <Text component={'div'} className={s.TextPage__prop} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          Результат по{' '}
          <Tooltip className={s.TextPage__tooltip} content={'Лемматизация + TF/IDF + RandomForest'}>
            <span className={s.TextPage__underline}>статистическому</span>
          </Tooltip>{' '}
          методу: АА+ | Accuracy: <span style={{ color: getPercentageColor(0.71) }}>0.71</span>
        </Text>

        <Text component={'div'} className={s.TextPage__prop} variant={ETextVariants.PROGRAMMING_CODE_REGULAR}>
          Результат по методу{' '}
          <Tooltip className={s.TextPage__tooltip} content={'Berd + Annoy'}>
            <span className={s.TextPage__underline}>похожести</span>
          </Tooltip>{' '}
          : АА+ | Accuracy: <span style={{ color: getPercentageColor(0.63) }}>0.63</span>
        </Text>
      </div>

      <div className={s.TextPage__summary}>
        <Heading size={HeadingSize.H4} className={s.TextPage__summaryHeading}>
          Summary
        </Heading>

        <Text className={s.TextPage__summaryText} variant={ETextVariants.BODY_M_REGULAR}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </Text>
      </div>

      <div className={s.TextPage__full}>
        <Heading size={HeadingSize.H4} className={s.TextPage__fullHeading}>
          Полный текст
        </Heading>

        <Link className={s.TextPage__summaryLink}>Скачать DOCX</Link>
        <Link className={s.TextPage__summaryLink}>Скачать PDF</Link>

        <Text className={s.TextPage__fullText} variant={ETextVariants.BODY_M_REGULAR}>
          Повышение кредитного рейтинга Акционерного общества «Уральская сталь» (далее — «Уральская сталь», Компания)
          вызвано улучшением качественной оценки ликвидности в связи с рефинансированием краткосрочного банковского
          кредита посредством выпуска облигационного займа с погашением в 2025 году. Также{' '}
          <span className={s.TextPage__tag}>пересмотр стратегических планов</span> по реализации ряда инвестиционных
          проектов способствовал улучшению показателя «капитальные затраты к выручке». Улучшение ценовой конъюнктуры на
          мировом рынке чугуна обеспечило запуск доменной печи №3, находившейся ранее в резерве, что окажет
          дополнительное положительное влияние на денежный поток Компании в 2023 году. Кредитный рейтинг Компании
          определяется средними рыночной позицией, бизнес-профилем и уровнем корпоративного управления, а также средней
          оценкой за размер бизнеса. Показатели рентабельности, ликвидности, долговой нагрузки, обслуживания долга и
          денежного потока получили высокие оценки. «Уральская сталь» — один из крупнейших в России производителей
          товарного чугуна, мостостали и стали для производства труб большого диаметра (ТБД). В начале 2022 года
          Акционерное общество «Загорский трубный завод» ( рейтинг АКРА — rating, прогноз «Стабильный» ; далее — ЗТЗ)
          <span className={s.TextPage__tag}>приобрело 100% уставного капитала</span> Компании у АО «ХК «МЕТАЛЛОИНВЕСТ» (
          рейтинг АКРА — rating, прогноз «Стабильный» ). Ключевые факторы оценки Средняя оценка рыночной позиции
          обусловлена оценкой рыночных позиций «Уральской стали» по основным видам продукции (мостосталь, штрипс и
          чугун), взвешенных с учетом их доли в консолидированной выручке Компании. Средняя оценка бизнес-профиля
          Компании определяется: низкой оценкой степени вертикальной интеграции, которая отсутствует в Компании,
          поскольку она не обеспечена собственными углем и железорудным сырьем; средней оценкой за долю продукции с
          высокой добавленной стоимостью, которая учитывает сталь для ТБД и мостосталь как высокотехнологичные виды
          продукции; средней оценкой за характеристику и диверсификацию рынков сбыта, так как рынки сбыта основной
          продукции «Уральской стали» характеризуются умеренной цикличностью и насыщенностью, а продуктовый портфель
          Компании умеренно диверсифицирован. Средняя оценка географической диверсификации является следствием наличия
          экспорта чугуна, толстолистового проката и заготовки, доля которого формирует до{' '}
          <span className={s.TextPage__tag}>50% консолидированной выручки</span>
          Компании. С одной стороны, это обуславливает высокую оценку субфактора «доступность и диверсификация рынков
          сбыта», а с другой — очень низкую оценку субфактора «концентрация на одном заводе». Средний уровень
          корпоративного управления обусловлен прозрачной структурой бизнеса и успешной реализацией Компанией стратегии
          роста и расширения продуктового портфеля. Топ-менеджмент Компании представлен экспертами с большим опытом
          работы в отрасли. «Уральская сталь» применяет отдельные элементы системы риск-менеджмента (например,
          хеджирование валютного риска в определенных случаях), однако единые документы по стратегии и управлению
          рисками, а также по дивидендной политике пока не утверждены. Совет директоров и ключевые комитеты пока не
          сформированы. Структура бизнеса проста. Компания готовит отчетность по МСФО. Высокая оценка финансового
          риск-профиля Компании обусловлена: высокой оценкой за рентабельность (рентабельность по FFO до процентов и
          налогов за 2022 год составила 12% и ожидается АКРА на уровне{' '}
          <span className={s.TextPage__tag}>около 18%</span> в 2023-м); высокой оценкой за обслуживание долга (отношение
          FFO до чистых процентных платежей к процентным платежам составило 24,7х по результатам 2022 года и
          прогнозируется АКРА на уровне около 11,7х в 2023-м); высокой оценкой за долговую нагрузку (отношение общего
          долга с учетом поручительства по долгу ЗТЗ к FFO до чистых процентных платежей ожидается АКРА на уровне 2,5х
          (0,8х без учета поручительств) по результатам 2023 года); средней оценкой размера бизнеса (абсолютное значение
          годового FFO до чистых процентных платежей и налогов — менее 30 млрд руб.). Высокая оценка уровня ликвидности.
        </Text>
      </div>

      {/*<div className={s.TextPage__downloads}>*/}
      {/*  <a href="#">Скачать DOCX</a>*/}
      {/*</div>*/}
    </div>
  );
};
