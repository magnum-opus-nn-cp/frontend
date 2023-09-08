import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useIsDesktop} from '../../../hooks/useIsDesktop';

export const useChatUi = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const [bgX, setBgX] = useState(50);
  const [bgY, setBgY] = useState(50);

  const isDesktop = useIsDesktop();

  useLayoutEffect(() => {
    if (contentRef.current && inputContainerRef.current) {
      containerRef.current?.scrollTo({ top: contentRef.current.scrollHeight });
      contentRef.current.style.paddingBottom = inputContainerRef.current.scrollHeight + 'px';
    }
  }, []);

  // useEffect(() => {
  //   function handler(e: MouseEvent) {
  //     if (isDesktop) {
  //       const modifierX = 17;
  //       const modifierY = 5;
  //
  //       setBgX(50 + (-e.clientX / window.innerWidth) * modifierX);
  //       setBgY(50 + (-e.clientY / window.innerHeight) * modifierY);
  //     }
  //   }
  //
  //   window.addEventListener('mousemove', handler);
  //
  //   return () => window.removeEventListener('mousemove', handler);
  // }, [isDesktop]);

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.backgroundPositionX = bgX + '%';
      backgroundRef.current.style.backgroundPositionY = bgY + '%';
    }
  }, [bgX, bgY]);

  return {
    backgroundRef,
    containerRef,
    contentRef,
    inputContainerRef
  }
}