import { darken } from 'polished'
import styled from 'styled-components'

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;

  .content {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 20px;
    margin: 20px auto 40px auto;
    width: 65%;
    height: 100%;

    .item {
      position: relative;

      &:nth-child(1) {
        padding: 10px;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -7px;
          width: 1px;
          height: 90%;
          background-color: rgba(0, 0, 0, 0.2);
        }

        .tab {
          position: relative;
          display: flex;
          align-items: center;
          padding: 7.5px 10px;
          border-radius: 3pt;
          background-color: rgba(0, 0, 0, 0.2);
          color: ${(props) => darken(0.1, props.theme.text)};
          opacity: 0.5;
          cursor: pointer;
          transition: 0.1s linear;
          text-decoration: none;

          &:hover,
          &.active {
            background-color: ${(props) => darken(0.05, props.theme.colors.primary)};
            opacity: 1;
            color: ${(props) => darken(0.1, props.theme.text)};

            &.active:hover {
              background-color: ${(props) => darken(0, props.theme.colors.primary)};
            }
          }

          &:not(:last-child) {
            margin-block-end: 10px;
          }

          .icon {
            margin-inline-end: 10px;
            font-size: 17px;
          }

          .ext-icon {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
          }
        }
      }

      &:nth-child(2) {
      }
    }
  }
`
