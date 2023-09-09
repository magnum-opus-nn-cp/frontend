import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, HeadingSize } from '../../components/Heading';
import { Link } from '../../components/Link';
import { getPercentageColor } from '../../utils/getPercentageColor';
import { EMDASH } from '../../utils/chars';
import { ModalBody, useModal, ModalContainer } from '../../components/Modal';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useUrlParam } from '../../hooks/useUrlParam';
import { PathBuilder, RESPONSE_PAGE_PARAM } from '../../app/routes';
import { useProcess } from '../../api/process/getProcess';
import { TextItem } from './components';
import s from './ResponsePage.module.scss';

export const ResponsePage: FC = () => {
  const processId = useUrlParam(RESPONSE_PAGE_PARAM);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // ------ Работа с данными ------

  const { data } = useProcess({
    processId: processId || '',
    config: {
      enabled: !!processId
    }
  });

  const texts = data?.texts || [];

  // ------ Обработка модалки с саммари ------

  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const { modalIsVisible, isClosing, close } = useModal({ isOpen, onClose });

  const [summaryText, setSummaryText] = useState('');

  const openSummary = useCallback((text: string = '') => {
    setSummaryText(text);
    setIsOpen(true);
  }, []);

  return (
    <div className={s.ResponsePage}>
      <Heading size={HeadingSize.H2} className={s.ResponsePage__title}>
        Результаты по запросу
      </Heading>

      <div className={s.ResponsePage__container}>
        {isMobile ? (
          <>
            {texts.map((text, index) => (
              <TextItem
                text={text}
                onClick={() => navigate(PathBuilder.getTextPath(text.id))}
                onClickSummary={() => openSummary(text.summary)}
                key={index}
              />
            ))}
          </>
        ) : (
          <table className={s.ResponsePage__table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>М. н-с.</th>
                <th>М. стат.</th>
                <th>М. c.</th>
                {/*<th>Рез.</th>*/}
                <th>Крат. сод.</th>
              </tr>
            </thead>

            <tbody>
              {texts.map((text, index) => (
                <tr onClick={() => navigate(PathBuilder.getTextPath(text.id))} key={index}>
                  <td>{text.id}</td>
                  <td>{text.file_name.length > 10 ? `${text.file_name.slice(0, 10)}...` : text.file_name}</td>
                  <td>
                    {text.score.bert.answer}
                    {/*| <span style={{ color: getPercentageColor(0.99) }}>0.99</span>*/}
                  </td>
                  <td>
                    {text.score.f.answer}
                    {/*| <span style={{ color: getPercentageColor(0.99) }}>0.99</span>*/}
                  </td>
                  <td>
                    {text.score.nearest.answer}
                    {/*| <span style={{ color: getPercentageColor(0.99) }}>0.99</span>*/}
                  </td>
                  {/*<td>*/}
                  {/*  AA+ | <span style={{ color: getPercentageColor(0.95) }}>0.95</span>*/}
                  {/*</td>*/}
                  {/*<td>*/}
                  {/*  AA+ | <span style={{ color: getPercentageColor(0.95) }}>0.95</span>*/}
                  {/*</td>*/}
                  <td className={s.ResponsePage__tableSummary}>
                    <Link
                      component={'button'}
                      standalone={false}
                      onClick={(e) => {
                        e.stopPropagation();
                        openSummary(text.summary);
                      }}>
                      Открыть
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ModalContainer isOpen={modalIsVisible} onClose={close} isClosing={isClosing}>
        <ModalBody className={s.ResponsePage__modalBody}>{summaryText}</ModalBody>
      </ModalContainer>
    </div>
  );
};
