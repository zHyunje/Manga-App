import { darken } from 'polished'
import styled from 'styled-components'

export const GenreSection = styled.div`
  padding: 30px 0 30px 30px;
  overflow: hidden auto;

  .title {
    font: 25px 'Kanit Regular';
    margin-block-end: 10px;
  }

  .list {
    display: inline-flex;
    width: 100%;
    gap: 10px;

    &.scroll {
      overflow: scroll hidden;

      .item:last-child {
        margin-inline-end: 30px;
      }
    }

    .item {
      position: relative;
      flex: 0 0 auto;
      width: 130px;
      height: 180px;
      cursor: pointer;

      /* prettier-ignore */
      &::after, &::before, img { border-radius: 3pt; }
      /* prettier-ignore */
      &::after, img { width: 100%; height: 100%; }
      /* prettier-ignore */
      &::after, &::before {
        position: absolute;
        transition: .1s linear;
        opacity: 0;
      }
      /* prettier-ignore */
      &:hover::after, &:hover::before { opacity: 1; }

      &::after {
        content: '';
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
      }

      &::before {
        content: 'Ler Agora';
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 75%;
        background-color: ${(props) => darken(0.05, props.theme.colors.primary)};
        padding-block: 3px;
        text-align: center;
      }

      img {
        object-fit: cover;
      }
    }
  }
`
