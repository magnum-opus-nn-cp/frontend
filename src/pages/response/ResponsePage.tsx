import { FC, useCallback, useState } from 'react';
import { Heading, HeadingSize } from '../../components/Heading';
import { Link } from '../../components/Link';
import { getPercentageColor } from '../../utils/getPercentageColor';
import { EMDASH } from '../../utils/chars';
import { ModalBody, useModal, ModalContainer } from '../../components/Modal';
import { useIsMobile } from '../../hooks/useIsMobile';
import { TextItem } from './components';
import s from './ResponsePage.module.scss';

export const ResponsePage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const { modalIsVisible, isClosing, close } = useModal({ isOpen, onClose });

  const isMobile = useIsMobile();

  return (
    <div className={s.ResponsePage}>
      <Heading size={HeadingSize.H2} className={s.ResponsePage__title}>
        Результаты по запросу
      </Heading>

      <div className={s.ResponsePage__container}>
        {isMobile ? (
          <>
            <TextItem onClickSummary={() => setIsOpen(true)} />
            <TextItem />
          </>
        ) : (
          <table className={s.ResponsePage__table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>М. н-с.</th>
                <th>М. стат.</th>
                <th>М. п.</th>
                <th>Рез.</th>
                <th>Крат. сод.</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>file.txt</td>
                <td>
                  AA+ | <span style={{ color: getPercentageColor(0.63) }}>0.63</span>
                </td>
                <td>
                  AA+ | <span style={{ color: getPercentageColor(0.95) }}>0.95</span>
                </td>
                <td>
                  AA+ | <span style={{ color: getPercentageColor(0.95) }}>0.95</span>
                </td>
                <td>
                  AA+ | <span style={{ color: getPercentageColor(0.95) }}>0.95</span>
                </td>
                <td className={s.ResponsePage__tableSummary}>
                  <Link standalone={false}>Открыть</Link>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>{EMDASH}</td>
                <td>
                  AA+ | <span style={{ color: getPercentageColor(0.63) }}>0.63</span>
                </td>
                <td>
                  AA+ | <span style={{ color: getPercentageColor(0.95) }}>0.95</span>
                </td>
                <td>
                  AA+ | <span style={{ color: getPercentageColor(0.95) }}>0.95</span>
                </td>
                <td>
                  AA+ | <span style={{ color: getPercentageColor(0.95) }}>0.95</span>
                </td>
                <td className={s.ResponsePage__tableSummary}>
                  <Link
                    component={'button'}
                    standalone={false}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(true);
                    }}>
                    Открыть
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <ModalContainer isOpen={modalIsVisible} onClose={close} isClosing={isClosing}>
        <ModalBody>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </ModalBody>
      </ModalContainer>
    </div>
  );
};
