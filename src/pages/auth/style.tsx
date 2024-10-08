import styled, { keyframes } from 'styled-components'
import { transparentize } from 'polished'

const anim = keyframes`
  from { top: -70px; opacity: .2; }
  to { top: 0; opacity: 1; }
`
const anim2 = keyframes`
  from { opacity: .2; }
  to { opacity: 1; }
`

export const SignSection = styled.div`
  position: relative;
  height: 100dvh;

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      75deg,
      #000000 59.35%,
      rgba(0, 0, 0, 0.438729) 75.65%,
      rgba(0, 0, 0, 0) 102.78%
    );
    z-index: -1;
  }

  .bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
    animation: ${anim2} 0.4s linear forwards;
  }

  .content {
    display: grid;
    place-items: center center;
    width: 60%;
    height: 100%;

    form {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      animation: ${anim} 0.2s linear forwards;

      .top,
      .middle {
        width: 100%;

        &.top {
          .icon {
            font-size: 40px;
            color: ${(props) => transparentize(0.4, props.theme.text)};
            transition: 0.1s linear;
            cursor: pointer;

            &:hover {
              color: ${(props) => transparentize(0.2, props.theme.text)};
            }
          }

          .title {
            margin-block: 20px 30px;
            font: 24px 'Kanit Bold';
            text-align: center;

            & > span {
              color: ${(props) => props.theme.colors.primary};

              & > span {
                color: ${(props) => props.theme.text};
              }
            }
          }
        }

        &.middle {
          &:has(.input-box:nth-child(3)) {
            .input-box:nth-child(3) {
              margin-block-start: 20px;
            }
          }
          .input-box {
            position: relative;

            &:not(:nth-child(2)) {
              margin-block-end: 20px;
            }

            &:nth-child(2) input {
              padding-inline-end: 40px;
            }

            input {
              width: 100%;
              background-color: rgba(255, 255, 255, 0.1);
              border: none;
              padding: 17.5px 20px;
              border-radius: 0.35rem;
              color: ${(props) => props.theme.text};

              &.active + label,
              &:focus + label {
                top: -5px;
                left: 0;
                font-size: 12px;
              }
            }

            label {
              left: 20px;
              opacity: 0.4;
              text-transform: lowercase;
              font-size: 14px;
              transition: 0.1s linear;
            }

            label,
            .see-pass {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }

            .see-pass {
              right: 10px;
              width: 20px;
              height: 20px;
              text-align: center;
              cursor: pointer;

              .icon {
                font-size: 20px;
                color: ${(props) => transparentize(0.6, props.theme.text)};
                transition: 0.1s linear;

                &:hover {
                  color: ${(props) => transparentize(0.2, props.theme.text)};
                }
              }
            }

            .pass-strenght {
              position: absolute;
              top: calc(100% + 3px);
              right: 1.5px;
              display: flex;
              gap: 4px;
              height: 10px;
              width: 70px;
              /* background-color: rgba(255, 255, 255, 0.1); */

              &.weak {
                div:nth-child(1) {
                  background-color: #f00;
                }
              }

              &.medium {
                div:nth-child(1),
                div:nth-child(2),
                div:nth-child(3) {
                  background-color: #ff0;
                }
              }

              &.strong {
                div:nth-child(1),
                div:nth-child(2),
                div:nth-child(3),
                div:nth-child(4) {
                  background-color: green;
                }
              }

              &.very-strong {
                div:nth-child(1),
                div:nth-child(2),
                div:nth-child(3),
                div:nth-child(4),
                div:nth-child(5) {
                  background-color: lightgreen;
                }
              }

              div {
                width: 100%;
                height: 10px;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                transition: 0.1s linear;
              }
            }
          }
        }
      }

      .bottom {
        width: 90%;

        .or,
        .text {
          width: 100%;
        }

        .or {
          margin-block: 18px 24px;
          position: relative;
          height: 1px;
          background-color: ${(props) => transparentize(0.8, props.theme.text)};

          &::after {
            content: 'ou';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #000000;
            color: ${(props) => transparentize(0.6, props.theme.text)};
            padding: 0 15px;
          }
        }

        .text {
          text-align: center;
          color: ${(props) => transparentize(0.2, props.theme.text)};

          a {
            color: ${(props) => transparentize(0.2, props.theme.colors.primary)};
            text-decoration: none;
            transition: 0.1s linear;

            &:hover {
              color: ${(props) => transparentize(0, props.theme.colors.primary)};
            }
          }
        }
      }
    }
  }
`
