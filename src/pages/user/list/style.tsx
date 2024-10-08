import { transparentize } from 'polished'
import styled from 'styled-components'

export const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;

  .content {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 500px;
    gap: 10px;
    width: 80%;
    height: 100%;
    padding: 20px 30px;

    .item {
      &:nth-child(1) {
        .header {
          margin-block-end: 20px;
          font: 30px 'Kanit Semibold';
        }

        .list {
          height: 420px;
          overflow-y: scroll;
          padding-inline-end: 10px;

          .list-item {
            position: relative;
            width: 100%;
            display: grid;
            align-items: center;
            gap: 10px;
            grid-template-columns: 90px 1fr;
            cursor: pointer;
            transition: 0.1s linear;
            border-radius: 3pt;

            &:hover {
              background-color: rgba(255, 255, 255, 0.05);
            }

            &:not(:last-child) {
              margin-block-end: 20px;

              &::before {
                content: '';
                position: absolute;
                top: calc(100% + 12.75px);
                left: 50%;
                transform: translateX(-50%);
                width: 90%;
                height: 1px;
                background-color: rgba(255, 255, 255, 0.1);
              }
            }

            .image {
              width: 100%;
              height: 120px;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 2pt;
              }
            }

            .infos {
              width: 100%;

              .name {
                font: 20px 'Kanit Medium';
                width: 350px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .added {
                position: relative;
                top: -5px;
                font-size: 14px;
                opacity: 0.5;
              }

              .summary {
                margin-block-start: 10px;
                font-size: 14px;
                padding-inline-end: 10px;
              }
            }
          }
        }
      }

      &:nth-child(2) {
        margin-inline-start: 20px;

        .header {
          font: 20px 'Kanit Semibold';
        }

        .controllers {
          margin-block-start: 10px;

          .control-item {
            display: flex;
            align-items: center;
            width: 50%;
            padding: 7.5px 10px;
            opacity: 0.6;
            cursor: pointer;
            transition: 0.1s linear;

            &:hover {
              opacity: 1;
            }

            .icon {
              position: relative;
              top: 1.5px;
              margin-inline-end: 10px;
              font-size: 15px;
            }

            &:nth-child(1) {
              background-color: ${(props) => transparentize(0.8, props.theme.colors.primary)};
              color: ${(props) => props.theme.colors.primary};
              border-radius: 3pt;
            }
          }
        }
      }
    }

    .modal {
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
      transition: 0.1s linear;

      &.active {
        opacity: 1;
        pointer-events: all;

        .modal-content {
          top: 0;
        }
      }

      .modal-content {
        position: relative;
        top: -100px;
        width: 350px;
        background-color: ${(props) => props.theme.bg};
        padding: 10px;
        border-radius: 3pt;
        transition: 0.1s linear;

        .title {
          font-size: 18px;
        }

        .desc {
          margin-block-end: 10px;
          font-size: 15px;
          opacity: 0.8;
        }

        .controls {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 10px;

          button {
            border-radius: 3pt;
          }
        }
      }
    }
  }
`
