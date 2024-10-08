import { darken, lighten, transparentize } from 'polished'
import styled from 'styled-components'

export const MangaSection = styled.div`
  /* display: flex; */
  /* height: 100%; */
  position: relative;
  padding: 0 30px 30px 30px;

  .content {
    .grid-content {
      display: grid;
      grid-template-columns: 270px 1fr 250px;
      grid-template-rows: 350px min-content;
      grid-template-areas:
        'image  content  ad'
        'chapter  chapter  chapter';
      width: 100%;
      gap: 20px;

      .item {
        &:nth-child(1) {
          grid-area: image;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 3pt;
          }
        }

        &:nth-child(2) {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          grid-area: content;

          .release {
            font: 14px 'Kanit Thin';
            letter-spacing: 1px;
            line-height: 10px;
            opacity: 0.6;
          }

          .title {
            font: 25px 'Kanit SemiBold';
          }

          .genres {
            display: inline-flex;
            overflow: scroll hidden;
            max-width: 500px;
            gap: 10px;

            .genre {
              flex: none;
              padding: 3px 12.5px;
              font-size: 12px;
              background-color: ${(props) => transparentize(0.65, props.theme.colors.primary)};
              color: ${(props) => lighten(0.1, props.theme.colors.primary)};
              border: 1px solid ${(props) => props.theme.colors.primary};
              border-radius: 20px;
              cursor: pointer;
              transition: 0.1s linear;

              &:hover {
                background-color: ${(props) => transparentize(0.4, props.theme.colors.primary)};
                color: ${(props) => lighten(0.2, props.theme.colors.primary)};
              }
            }
          }

          .author {
            margin-block: 15px;

            > span {
              font-family: 'Kanit SemiBold';
              cursor: context-menu;

              &:not(:is(.not-found)) {
                cursor: pointer;

                &:hover {
                  text-decoration: underline;
                }
              }
            }

            .icon {
              position: relative;
              top: 2.5px;
              margin-inline-end: 5px;
              font-size: 18px;
              color: ${(props) => transparentize(0.3, props.theme.colors.primary)};
            }
          }

          .summary {
            margin-block-end: 10px;
          }

          .controls {
            display: flex;
            align-items: center;
            gap: 10px;
          }
        }

        &:nth-child(3) {
          grid-area: ad;
        }

        &:nth-child(4) {
          grid-area: chapter;
          margin-block-start: 20px;

          .header {
            justify-content: space-between;

            &,
            .header-content {
              display: flex;
              align-items: center;
            }

            .header-content {
              gap: 10px;

              .header-item {
                &:nth-child(1) {
                  font: 20px 'Kanit Medium';
                }
              }
            }

            /* dropdown */
            &:not(:is(.header-content)) > .header-item {
              position: relative;

              .opener {
                padding: 3.5px 10px;
                background-color: ${(props) => darken(0.015, props.theme.bg)};
                border: 1px solid ${(props) => darken(0.04, props.theme.bg)};
                border-radius: 3pt;
                cursor: pointer;
                transition: 0.1s linear;

                &:hover,
                &.active {
                  background-color: ${(props) => transparentize(0.75, props.theme.colors.primary)};
                  border-color: ${(props) => transparentize(0.2, props.theme.colors.primary)};
                  color: ${(props) => darken(0.015, props.theme.colors.primary)};
                }
              }

              .dropdown-content {
                position: absolute;
                top: calc(100% + 5px);
                right: 0;
                width: 150px;
                background-color: ${(props) => darken(0.035, props.theme.bg)};
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
                padding: 5px;
                border-radius: 3pt;
                opacity: 0;
                pointer-events: none;
                transition: 0.1s linear;

                &.active {
                  opacity: 1;
                  pointer-events: all;
                }

                .option {
                  padding: 5px;
                  cursor: pointer;
                  background-color: ${(props) => lighten(0.005, props.theme.bg)};
                  border-radius: 3pt;
                  transition: 0.1s linear;

                  &:not(:last-child) {
                    margin-block-end: 5px;
                  }

                  &:hover {
                    background-color: ${(props) => lighten(0.02, props.theme.bg)};

                    span {
                      opacity: 1;
                    }
                  }

                  .icon {
                    position: relative;
                    top: 2.5px;
                    margin-inline-end: 5px;
                  }

                  span {
                    opacity: 0.8;
                    transition: 0.1s linear;
                  }
                }
              }
            }
          }

          .chapters {
            margin-block-start: 20px;
            display: grid;
            grid-template-rows: repeat(2, auto);
            grid-auto-flow: column;
            width: 100%;
            overflow: scroll hidden;
            padding-block-end: 10px;
            gap: 10px;

            .chapter {
              width: 100%;
              white-space: nowrap;
              padding: 7.5px 15px;
              border-radius: 3pt;
              background-color: ${(props) => darken(0.05, props.theme.bg)};
              text-align: center;
              cursor: pointer;
              transition: 0.1s linear;

              &:hover {
                background-color: ${(props) => darken(0.025, props.theme.bg)};
              }
            }
          }
        }
      }
    }
  }
`
