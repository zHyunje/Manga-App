import styled from 'styled-components'

export const ProfileTabSection = styled.div`
  height: 100%;

  .top {
    position: relative;
    margin-block-end: 80px;

    .banner {
      position: relative;
      width: 100%;
      height: 150px;
      background-color: #0b0b0b;
      border-radius: 5pt;

      .palette {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        align-items: center;
        padding: 5px;

        .menu {
          margin-inline-end: 10px;
          display: flex;
          align-items: center;
          width: 0;
          background-color: #f2f2f2;
          transition: width 0.1s linear;

          &.active {
            width: fit-content;
            padding: 2px;
          }

          .color {
            width: 15px;
            height: 15px;
            cursor: pointer;

            &:not(:last-child) {
              margin-inline-end: 2px;
            }
          }
        }

        .opener {
          width: 25px;
          height: 25px;
          border-radius: 15px;
          background: conic-gradient(
            #ff7e5f 0%,
            #feb47b 25%,
            #a1c4fd 50%,
            #c2e9fb 75%,
            #ff7e5f 100%
          );
          cursor: pointer;
          opacity: 0.4;
          transition: 0.1s linear;

          &:hover {
            opacity: 1;
          }
        }
      }
    }

    .pfp {
      display: flex;
      align-items: flex-end;
      position: absolute;
      top: 100%;
      transform: translateY(-50%);
      width: 100%;
      height: 120px;
      padding: 0 40px;

      .username {
        width: 100%;
        padding: 0 0 20px 10px;

        div {
          &:not(.user) {
            font-size: 15px;
            letter-spacing: 1px;
            opacity: 0.6;
          }

          &.user {
            font: 16px 'Kanit SemiBold';
            line-height: 10px;
          }
        }
      }

      .profile-image {
        position: relative;

        &:hover > label {
          opacity: 1;
          pointer-events: all;
        }

        img {
          width: 120px;
          height: 100%;
          object-fit: cover;
          border-radius: 5pt;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
        }

        input[type='file'] {
          display: none;
        }

        label {
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.3);
          width: 100%;
          height: 120px;
          text-align: center;
          line-height: 120px;
          border-radius: 5pt;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transition: 0.1s linear;
          font-size: 30px;
        }
      }
    }
  }

  .middle {
    display: flex;
    align-items: center;

    button {
      margin-inline-start: 10px;
      height: 50px;
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
    background-color: rgba(0, 0, 0, 0.5);

    .modal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 250px;
      background-color: ${(props) => props.theme.bg};
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
      border-radius: 3pt;

      .title {
        margin-block-start: 10px;
      }

      .preview {
        margin: 20px auto;
        width: 170px;
        height: 170px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 3pt;
        }
      }

      .controls {
        display: flex;
        gap: 10px;
        width: 100%;
        padding-inline: 10px;
      }
    }
  }
`
