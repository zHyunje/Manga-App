import { darken, lighten, transparentize } from 'polished'
import styled from 'styled-components'

export const HomeSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100dvh;

  &::before {
    content: '';
    position: absolute;
    top: -40px;
    left: 0;
    width: 100%;
    height: calc(100% + 50px);
    z-index: -98;
    background: linear-gradient(
      90deg,
      #000000 39.5%,
      rgba(0, 0, 0, 0.438729) 73.46%,
      rgba(0, 0, 0, 0) 100%
    );
    filter: blur(10px);
  }

  .content-image {
    position: absolute;
    top: -6px;
    right: 0;
    width: 70%;
    height: 97.5%;
    z-index: -99;
    filter: blur(20px);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    /* margin-top: 120px; */
    display: grid;
    grid-template-columns: 1fr 550px;
    align-items: center;
    height: 100%;
    padding: 20px 30px 0 30px;
    background-color: #f00;

    .item {
      position: relative;

      &:nth-child(1) {
        .header .header-item {
          &:nth-child(1) {
            opacity: 0.5;
            font: 15px 'Kanit Thin';
          }

          &:nth-child(2) {
            margin: 0 0 20px 0;
            width: calc(100% - 150px);
            font: 35px 'Kanit SemiBold';
            letter-spacing: 1px;
            line-height: 40px;
          }

          &:nth-child(3) {
            display: flex;
            gap: 10px;

            .genre {
              padding: 3px 12.5px;
              background-color: ${(props) => transparentize(0.6, props.theme.colors.primary)};
              font-size: 12px;
              border-radius: 20px;
              border: 1px solid ${(props) => transparentize(0.4, props.theme.colors.primary)};
              color: ${(props) => lighten(0.1, props.theme.colors.primary)};
              cursor: pointer;
              transition: 0.1s linear;

              &:hover {
                background-color: ${(props) => transparentize(0.3, props.theme.colors.primary)};
                font-size: 12px;
                color: ${(props) => lighten(0.2, props.theme.colors.primary)};
              }
            }
          }
        }

        .summary {
          margin: 40px 0 30px 0;
          width: calc(100% - 150px);
          font: 15px 'Kanit ExtraLight';
          opacity: 0.7;
        }

        .controls {
          display: flex;
        }
      }

      &:nth-child(2) {
        width: 350px;
        height: 450px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
        }
      }
    }

    .carousel-controllers {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      display: flex;

      .control {
        position: relative;
        display: flex;
        width: 30px;
        height: 30px;
        opacity: 0.7;

        &:not(:last-child) {
          margin-inline-end: 10px;
        }

        &:hover {
          opacity: 1;
          transform: scale(1.2);
        }
      }
    }
  }

  .wrapper {
    margin-block-start: 55px;

    .categories,
    .listing {
      padding: 30px;

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-block-end: 10px;

        &:has(.grid) .grid {
          display: flex;
          gap: 5px;

          .grid-item {
            display: grid;
            place-items: center center;
            width: 27.5px;
            height: 27.5px;
            background-color: ${(props) => darken(0.025, props.theme.bg)};
            color: ${(props) => transparentize(0.5, props.theme.text)};
            cursor: pointer;
            border: 1px solid ${(props) => darken(0.05, props.theme.bg)};
            border-radius: 3pt;
            transition: 0.1s linear;

            &:hover,
            &.active {
              background-color: ${(props) => transparentize(0.5, props.theme.colors.primary)};
              border-color: ${(props) => props.theme.colors.primary};
              color: ${(props) => props.theme.colors.primary};

              &.active:hover {
                background-color: ${(props) => transparentize(0.4, props.theme.colors.primary)};
              }
            }
          }
        }

        .title {
          font: 25px 'Kanit SemiBold';
        }

        .subtitle {
          position: relative;
          font-size: 15px;
          cursor: pointer;
          transition: 0.1s linear;

          &:hover {
            color: ${(props) => props.theme.colors.primary};
            font-weight: 700;

            &::after {
              background-color: ${(props) => props.theme.colors.primary};
            }
          }

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            height: 1px;
            background-color: #fff;
            transition: 0.1s linear;
          }
        }
      }

      .category-list {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        gap: 10px;
        height: 50px;

        .item {
          position: relative;
          background-color: ${(props) => lighten(0.1, props.theme.bg)};
          height: 100%;
          border-radius: 3pt;
          overflow: hidden;
          cursor: pointer;

          &:hover {
            &::before {
              background: linear-gradient(90deg, #1a1a1a 60%, #1a1a1a, transparent);
            }

            .title {
              color: ${(props) => props.theme.colors.primary};
              font-weight: 900;
            }
          }

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 70%;
            height: 100%;
            background: linear-gradient(90deg, #161616 60%, #161616, transparent);
            z-index: 1;
            transition: 0.1s linear;
          }

          .title {
            position: relative;
            left: 10px;
            line-height: 48px;
            z-index: 1;
            transition: 0.1s linear;
          }

          .item-bg {
            position: absolute;
            top: 0;
            right: 0;
            width: 65px;
            height: 65px;

            &::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(1px);
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
`
