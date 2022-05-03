/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from 'react'
import styled, { css, keyframes } from 'styled-components';
import { useEffectAsync } from '../../utils/hooks/useEffectAsync';
import { useIsOnScreen } from '../../utils/hooks/useIsOnScreen';
import { imagePromise } from '../../utils/imagePromise';
import { isNativeLazyLoadSupported } from './utils';

interface ImgDynamic extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadingComp: React.ComponentElement<any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorComp: React.ComponentElement<any, any>;
}

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Wrap = styled.div<{ triggerAnimation: boolean }>`
  position: relative;
  &> * {
    top: 0;
    left: 0;
    position: absolute;
  }
  & img {
    ${({ triggerAnimation }) => triggerAnimation &&
    css`animation: ${fadeInAnimation} ease 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    `}
  }
`;

/**
 * Dynamic image component. Does not load image until it's within viewport. Additionally,
 * allows custom loading to be provided while image is loading and custom error component
 * to be displayed if image load fails.
 * @param param0 props
 * @returns 
 */
const ImgDynamic = ({ loadingComp, errorComp, ...props }: ImgDynamic) => {
  const supportsLazyLoad = isNativeLazyLoadSupported();
  const [loadingState, setLoadingState] = React.useState<boolean | undefined>(undefined);
  const wrapperRef = useRef(null);
  const isOnScreen = useIsOnScreen(wrapperRef, supportsLazyLoad);

  useEffectAsync(async () => {
    if (!props.src || !isOnScreen)
      return;

    if (supportsLazyLoad) {
      return;
    }
    try {
      await imagePromise(props.src);
      setLoadingState(true);
    } catch (e) {
      setLoadingState(false);
    }
  }, [props.src, isOnScreen])

  // Enhancement for later: Always render image with visibility/display hidden,
  // then face in once on screen. Could potentially use a ref and mount the imagePromise
  // response element to the dom.

  return (<Wrap ref={wrapperRef} triggerAnimation={!!loadingState}>
    {loadingComp}
    {loadingState === false && errorComp}
    {!supportsLazyLoad && loadingState === true && <img {...props} />}
    {supportsLazyLoad &&
      <img
        {...props}
        style={{ visibility: loadingState === true ? 'visible' : 'hidden' }}
        loading="lazy"
        onLoad={() => setLoadingState(true)}
        onError={() => setLoadingState(false)}
      />
    }
  </Wrap>
  )
}

export default ImgDynamic