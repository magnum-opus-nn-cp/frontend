import { createPortal } from 'react-dom';
import { ReactFCC } from '../../utils/ReactFCC';

interface PortalProps {
  element?: Element | DocumentFragment | null;
}

export const Portal: ReactFCC<PortalProps> = (props) => {
  const { children, element = document.body } = props;

  if (!element) {
    return <>{children}</>;
  }

  return createPortal(children, element);
};
