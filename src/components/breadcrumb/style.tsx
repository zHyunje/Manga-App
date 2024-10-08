import styled from 'styled-components'

export const Bread = styled.div`
  display: flex;
  width: fit-content;
  margin-block-end: 30px;
  /* gap: 10px; */

  .bread-item {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.text};

    &.active {
      .title,
      .icon {
        opacity: 1;
        font-family: 'Kanit SemiBold';
        letter-spacing: 1px;
      }
    }

    .icon {
      margin-inline: 10px;
    }

    .title,
    .icon {
      opacity: 0.6;
      transition: 0.1s linear;
    }

    &:not(:has(a)) {
      cursor: context-menu;
    }

    &:has(a) {
      a {
        color: ${(props) => props.theme.text};
        text-decoration: none;

        &:hover {
          opacity: 1;
        }
      }

      .title {
        position: relative;
        display: inline-block;

        &::after {
          position: relative;
          content: '';
          display: block;
          left: 1px;
          border-bottom: solid 3px ${(props) => props.theme.colors.primary};
          border-radius: 5px;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.25s ease-in-out;
        }

        &:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      }
    }
  }
`
