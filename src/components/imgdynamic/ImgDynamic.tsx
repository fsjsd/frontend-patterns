/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from 'react'
import styled, { keyframes } from 'styled-components';
import { useEffectAsync } from '../../utils/hooks/useEffectAsync';
import { useIsOnScreen } from '../../utils/hooks/useIsOnScreen';
import { imagePromise } from '../../utils/imagePromise';

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

const Wrap = styled.div`
  &> img {
    animation: ${fadeInAnimation} ease 2s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    z-index: -1;
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

  const [loadState, setLoadState] = React.useState<boolean | undefined>(undefined);
  const wrapperRef = useRef(null);
  const isOnScreen = useIsOnScreen(wrapperRef);

  useEffectAsync(async () => {
    if (!props.src || !isOnScreen)
      return;

    try {
      await imagePromise(props.src);
      setLoadState(true);
    } catch (e) {
      setLoadState(false);
    }
  }, [props.src, isOnScreen])

  // Enhancement for later: Always render image with visibility/display hidden,
  // then face in once on screen. Could potentially use a ref and mount the imagePromise
  // response element to the dom.

  return (<Wrap ref={wrapperRef}>
    {loadState === undefined && loadingComp}
    {loadState === false && errorComp}
    {loadState === true && <img {...props} />}
  </Wrap>
  )
}

export default ImgDynamic