import React, { memo, ReactNode, useCallback, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { Transition } from 'react-transition-group';
import clsx from 'clsx';
import { Placement } from '@popperjs/core';
import { useSingleTimeout } from '../../hooks/useSingleTimeout';
import { useToggle } from '../../hooks/useToggle';
import { useIsMobile } from '../../hooks/useIsMobile';
import s from './Tooltip.module.scss';

export interface TooltipProps {
  className?: string;
  children?: React.ReactElement;
  title?: ReactNode;
  content?: ReactNode;
  placement?: Placement;
  disableOnMobile?: boolean;
  offset?: [number, number];
  classes?: {
    content?: string;
    trigger?: string;
  };
  bgColor?: string;
}

const placementMapper: Partial<Record<Placement, string>> = {
  bottom: 'bottom',
  'bottom-start': 'bottom',
  'bottom-end': 'bottom',

  left: 'left',
  'left-start': 'left',
  'left-end': 'left',

  right: 'right',
  'right-start': 'right',
  'right-end': 'right',

  top: 'top',
  'top-start': 'top',
  'top-end': 'top'
};

export const Tooltip = memo((props: TooltipProps) => {
  const {
    title,
    content,
    children,
    className,
    placement = 'auto',
    disableOnMobile,
    classes,
    offset = [0, 11],
    bgColor
  } = props;
  const [isVisible, { set: setVisible, unset: unsetVisible }] = useToggle();
  const isMobile = useIsMobile();

  const nodeRef = useRef(null);

  const [referenceElement, setReferenceElement] = useState<HTMLSpanElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: 'fixed',
    placement: placement,
    modifiers: [
      { name: 'offset', options: { offset } },
      { name: 'arrow', options: { element: arrowElement } },
      { name: 'flip', options: { fallbackPlacements: ['bottom-start', 'top-start', 'right', 'left'] } },
      { name: 'preventOverflow', options: { rootBoundary: 'viewport', tether: false, altAxis: true } }
    ]
  });

  const timeout = useSingleTimeout();

  const set = useCallback(() => {
    timeout.clear();
    setVisible();
  }, [setVisible, timeout]);

  const unset = useCallback(() => {
    timeout.set(unsetVisible, 50);
  }, [unsetVisible, timeout]);

  if (isMobile && disableOnMobile) {
    return <>{children}</>;
  }

  return (
    <div className={clsx(s.Tooltip, className)}>
      <span
        className={clsx(s.Tooltip__trigger, classes?.trigger)}
        onMouseEnter={set}
        onMouseLeave={unset}
        ref={setReferenceElement}>
        {children}
      </span>

      {content && (
        <Transition unmountOnExit nodeRef={nodeRef} timeout={150} in={isVisible}>
          {(state) => (
            <div
              ref={nodeRef}
              className={clsx(s.Tooltip__contentWrapper, s[`Tooltip__contentWrapper_${state}`])}
              onMouseEnter={set}
              onMouseLeave={unset}>
              <div
                className={clsx(s.Tooltip__content, classes?.content)}
                ref={setPopperElement}
                style={{
                  ...styles.popper,
                  backgroundColor: bgColor
                }}
                {...attributes.popper}>
                {title && <div className={s.Tooltip__title}>{title}</div>}
                {content}
                <div
                  className={clsx(
                    s.Tooltip__arrow,
                    s[
                      `Tooltip__arrow_${
                        attributes.popper?.['data-popper-placement']
                          ? placementMapper[attributes.popper?.['data-popper-placement'] as Placement]
                          : ''
                      }`
                    ]
                  )}
                  ref={setArrowElement}
                  style={{
                    ...styles.arrow,
                    color: bgColor
                  }}
                  {...attributes.arrow}
                />
              </div>
            </div>
          )}
        </Transition>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';
