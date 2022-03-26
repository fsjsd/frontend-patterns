import styled from "styled-components";

export const CarouselWrapper = styled.div<{ width: string }>`
  max-width: ${props => props.width}px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
`;

export const SlideContainer = styled.div`
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 10px;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`;

export const SlideButton = styled.div<{ isForward: boolean }>`
  color: #ffffff;
  background-color: #000000;
  position: absolute;
  padding: 10px;
  opacity: .3;
  cursor: pointer;
  top: 10px;
  &:hover {
    opacity: 1;
  }
  ${props => props.isForward ? `right: 10px;` : `left: 10px;`}
`;

export const SlideIndicators = styled.div`
  display: flex;
  justify-content: center;
`;

export const SlideIndicator = styled.div<{ active?: boolean }>`
  height: 44px;
  width: 50px;
  display: flex;
  justify-items: center;
  cursor: pointer;
  &:after {
    content: "";
    background-color: #878787;
    height: 10px;
    margin-top: 10px;
    width: 40px;
  }
  ${props => props.active && `
    &:after{
      background-color: #000000;  
    }
  `}
  &:hover:after {
    background-color: #000000;
  }
`;

export const Slide = styled.div`
  scroll-snap-align: center;
  position: relative;
  min-width: 100%;
  padding-top: 50%;
  img {
    height: 100%;
    width: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const SlideBanner = styled.div`
  background-color: #000000;
  color: #ffffff;
  position: absolute;
  left: 0;
  bottom: 20px;
  padding: 15px;
  font-size: 2.5vw;
`;