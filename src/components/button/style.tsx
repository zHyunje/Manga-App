// style.js
import { darken, lighten, transparentize } from 'polished'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const commonStyles = css`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 40px;
  cursor: pointer;
  border: none;
  transition: 0.1s linear;

  &.no-padding {
    padding: 0 !important;
  }

  &.w-full {
    width: 100% !important;
  }

  &.w-90 {
    width: 90% !important;
  }

  &.font-sm {
    font-size: 13px;
  }
  &.font-md {
    font-size: 16px;
  }
  &.font-lg {
    font-size: 19px;
  }

  // font weight
  &.wg-sm {
    font-family: 'Kanit Light';
  }
  &.wg-md {
    font-family: 'Kanit Medium';
  }
  &.wg-lg {
    font-family: 'Kanit Bold';
  }

  // margin
  &.margin-center {
    margin: 0 auto;
  }

  &.my-sm {
    margin-block: 8px;
  }
  &.my-md {
    margin-block: 15px;
  }
  &.my-lg {
    margin-block: 22px;
  }

  &.mx-sm {
    margin-inline: 8px;
  }
  &.mx-md {
    margin-inline: 15px;
  }
  &.mx-lg {
    margin-inline: 22px;
  }

  // padding x
  &.px-sm {
    padding-inline: 8px;
  }
  &.px-md {
    padding-inline: 14px;
  }
  &.px-lg {
    padding-inline: 20px;
  }

  // padding y
  &.py-sm {
    padding-block: 6px;
  }
  &.py-md {
    padding-block: 8px;
  }
  &.py-lg {
    padding-block: 10px;
  }

  .icon {
    transition: 0.1s linear;
  }

  &.no-radius {
    border-radius: 0;
  }

  &.rad-md {
    border-radius: 3pt !important;
  }

  &.default {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => lighten(0.5, props.theme.text)};

    &:hover {
      background-color: ${(props) => darken(0.035, props.theme.colors.primary)};
    }
  }

  &.gray {
    background-color: ${(props) => lighten(0.1, props.theme.bg)};
    color: ${(props) => darken(0.2, props.theme.text)};

    &:hover {
      background-color: ${(props) => lighten(0.2, props.theme.bg)};
      color: ${(props) => darken(0.1, props.theme.text)};
    }
  }

  &.no-bg {
    background-color: transparent;
    color: ${(props) => transparentize(0.6, props.theme.text)};

    &:hover {
      color: ${(props) => transparentize(0.3, props.theme.text)};
      .icon {
        opacity: 0.7 !important;
      }
    }
  }

  &.center {
    text-align: center;
  }

  &.bold {
    font-family: 'Kanit SemiBold';
    letter-spacing: 1px;
  }
`

export const ButtonComp = styled.button`
  ${commonStyles}

  [disabled='true'] {
    color: #f00 !important;
  }
`

export const StyledLink = styled(Link)`
  ${commonStyles}
  text-decoration: none;
`
