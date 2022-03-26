import styled from "styled-components";


export const InfiniteScrollWrapper = styled.div`
  position: relative;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    gap: 20px;
    margin: 0 auto;
    padding: 20px;

  @keyframes loadingAnimation {
    0% {
        background-color: var(--disabled-button-primary);
    }
    50% {
        background-color: var(--disabled-button-secondary);
    }
    100% {
        background-color: var(--disabled-button-primary);
    }
  }
`;

export const Sentinel = styled.div`
  position: absolute;
    bottom: 150vh;
`;

export const Item = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  font-size: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

export const InfiniteScrollButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 1em;
  width: 100%;
  font-size: 1em;
  &:enabled {
    color: var(--active-button-font);
    background-color: var(--active-button-primary);
  }
  &:disabled {
    color: var(--disabled-button-font);
    background-color: var(--disabled-button-primary);
    cursor: not-allowed;
    animation: 3s ease-in-out infinite loadingAnimation;
  }
  &:enabled .disabled-text {
    display: none;
  }
  &:disabled .active-text {
    display: none;
  }
`;