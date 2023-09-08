import { ComponentType, ElementType, ReactComponentElement } from 'react';
import clsx from 'clsx';
import { ReactFCC } from '../../utils/ReactFCC';
import { useHover } from '../../hooks/useHover';
import { ReactComponent as DocIcon } from './assets/doc.svg';
import { ReactComponent as XlsIcon } from './assets/xls.svg';
import { ReactComponent as PdfIcon } from './assets/pdf.svg';
import { ReactComponent as FileIcon } from './assets/file.svg';
import s from './Attachment.module.scss';

export interface AttachmentProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  /**
   * Объект файла
   */
  file: File;

  onClick?: () => void;
}

const extensionIcon: { [key: string]: ElementType } = {
  doc: DocIcon,
  docx: DocIcon,
  xls: XlsIcon,
  xlsx: XlsIcon,
  pdf: PdfIcon
};

export const Attachment: ReactFCC<AttachmentProps> = (props) => {
  const { className, file, onClick } = props;

  const ext = file.name.split('.')[file.name.split('.').length - 1];
  const Component = extensionIcon[ext] || FileIcon;

  const { hovered, ...hoverProps } = useHover();

  return (
    <div className={clsx(s.Attachment, className)} onClick={() => onClick?.()} {...hoverProps}>
      <Component className={s.Attachment__icon} />

      <div
        className={clsx(s.Attachment__text, {
          [s.Attachment__text_hidden]: hovered
        })}>
        {file.name}
      </div>

      <div
        className={clsx(s.Attachment__text, s.Attachment__text_x, {
          [s.Attachment__text_hidden]: !hovered
        })}>
        {'×'}
      </div>
    </div>
  );
};
