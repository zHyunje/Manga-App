import styled, { keyframes } from 'styled-components'

const anim = keyframes`
  from { transform: rotateZ(0deg) }
  to { transform: rotateZ(360deg) }
`

export const LoadingSection = styled.div`
  display: grid;
  place-items: center center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: all;
  }

  .icon {
    font-size: 40px;
    animation: ${anim} 3s linear infinite;
  }
`
