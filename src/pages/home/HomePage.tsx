import { ReactFCC } from '../../utils/ReactFCC';
import { Heading, HeadingSize } from '../../components/Heading';
import { ETextVariants, Text } from '../../components/Text';
import { Button, ButtonSize } from '../../components/Button';
import s from './HomePage.module.scss';

export const HomePage: ReactFCC = () => {
  return (
    <div className={s.HomePage}>
      <Heading size={HeadingSize.H2} className={s.HomePage__title}>
        Анализ текстовых пресс-релизов
      </Heading>

      <Text className={s.HomePage__text} variant={ETextVariants.BODY_M_REGULAR}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book.
      </Text>

      <div className={s.HomePage__box}>
        <Button className={s.HomePage__button} size={ButtonSize.large}>
          Выбрать DOCX/PDF файл
        </Button>

        <Text className={s.HomePage__buttonHint} variant={ETextVariants.BODY_S_REGULAR}>
          Или перетащите файл мышкой
        </Text>
      </div>

      {/*<Button className={s.HomePage__button} size={ButtonSize.large}>*/}
      {/*  Button*/}
      {/*</Button>*/}
      {/*<Button variant={ButtonVariant.secondary} size={ButtonSize.large}>*/}
      {/*  Button*/}
      {/*</Button>*/}
    </div>
  );
};
