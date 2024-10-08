import styled from 'styled-components'
import { darken, lighten, transparentize } from 'polished'

export const NavbarSection = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  width: 100%;
  z-index: 1;
  grid-template-columns: repeat(2, 1fr);
  padding: 30px;
  transition: 0.1s linear;

  &.sticky {
    grid-template-columns: 200px 1fr;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${(props) => transparentize(0.1, props.theme.bg)};
    width: 75%;
    padding: 20px 30px;
    border-radius: 1rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);

    &::before {
      display: none;
    }

    .search {
      display: none;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.9) 20%,
      rgba(0, 0, 0, 0.75) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: -5;
  }

  .left,
  .menu {
    display: flex;
    align-items: center;

    &.left {
      .logo {
        margin: 0 40px 0 0;
        cursor: pointer;
        text-decoration: none;
        color: ${(props) => props.theme.text};

        img {
          width: 35px;
          height: 35px;
        }

        span {
          position: relative;
          bottom: 0.75px;
          font-size: 30px;
          font-family: 'Kanit SemiBold';

          > span {
            color: ${(props) => props.theme.colors.primary};
          }
        }
      }

      .search {
        position: relative;
        width: 75%;

        input {
          width: 100%;
          padding: 10px 30px 10px 10px;
          border-radius: 5px;
          border: 1px solid ${(props) => transparentize(0.8, props.theme.bg)};
          background-color: ${(props) => transparentize(0.5, props.theme.bg)};
          color: ${(props) => props.theme.text};
          transition: 0.1s linear;

          &:focus {
            border-color: ${(props) => transparentize(0.75, props.theme.colors.primary)};

            & ~ .icon {
              color: ${(props) => transparentize(0.1, props.theme.colors.primary)};
            }
          }
        }

        .icon {
          right: 0;
          transform: translateY(-50%);
          z-index: 1;
          color: ${(props) => lighten(0.25, props.theme.bg)};
          cursor: pointer;
          width: 30px;
          height: 37px;

          &,
          .icon-tag {
            position: absolute;
            top: 50%;

            &.icon-tag {
              left: 50%;
              transform: translate(-60%, -50%);
              transition: 0.1s linear;
            }
          }
        }
      }
    }

    &.menu {
      justify-content: right;

      & > .user {
        position: relative;
        text-decoration: none;

        .dropdown-opener {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: ${(props) => transparentize(0.3, props.theme.text)};
          background-color: ${(props) => transparentize(0.3, props.theme.bg)};
          padding-inline-start: 15px;
          border-radius: 3pt;
          transition: 0.1s linear;
          cursor: pointer;

          &:hover {
            color: ${(props) => transparentize(0, props.theme.text)};
            background-color: ${(props) => transparentize(0, props.theme.bg)};
          }

          img {
            margin-inline-start: 15px;
            width: 40px;
            height: 40px;
            border-radius: 3pt;
          }
        }

        .dropdown-content {
          position: absolute;
          top: calc(100% + 5px);
          right: 0;
          width: calc(100% + 50px);
          background-color: ${(props) => props.theme.bg};
          border-radius: 3pt;
          padding: 5px;
          opacity: 0;
          pointer-events: none;
          transition: 0.1s linear;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);

          &.active {
            opacity: 1;
            pointer-events: all;
          }

          .dropdown-item {
            &:not(:nth-child(2)) {
              margin-block-end: 5px;
            }

            &:nth-child(2) {
              p {
                position: relative;
                top: 1.5px;
              }
            }
          }
        }
      }

      li {
        position: relative;
        display: inline-block;
        cursor: pointer;

        a {
          text-decoration: none;
          color: ${(props) => props.theme.text};
        }

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

        &.active {
          font-family: 'Kanit SemiBold';
          a {
            color: ${(props) => props.theme.colors.primary};
          }

          &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 1px;
            width: 100%;
            height: 3px;
            background-color: ${(props) => props.theme.colors.primary};
            border-radius: 5px;
          }
        }

        &:not(:nth-child(4)) {
          margin: 0 30px 0 0;
        }

        &:nth-child(4) {
          margin: 0 60px 0 0;
        }
      }
    }
  }
`
