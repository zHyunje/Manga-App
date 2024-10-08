import React from 'react'
import { ButtonComp, StyledLink } from './style'
import { IconType } from 'react-icons'

type Props = {
  text?: string
  href?: string
  classes?: string
  textCenter?: boolean
  type?: 'button' | 'reset' | 'submit' | undefined
  disable?: boolean
  iconProps?: IconProps
  style?: React.CSSProperties
  onClick?: () => void
}

type IconProps = {
  icon: IconType
  size?: number
  color?: string
  opacity?: number
  noMargin?: boolean
  center?: boolean
  rotate?: number
}

// types (background): default, no-bg
// types (font-size): font-sm, font-md and font-lg
// types (font-weight): wg-sm, wg-md and wg-lg
// types (padding): px-sm/py-sm, px-md/py-md and px-lg/py-lg

const Button: React.FC<Props> = ({
  text,
  href,
  classes,
  textCenter,
  type,
  disable,
  iconProps,
  style,
  onClick,
}) => {
  const renderContent = () => (
    <>
      {iconProps && iconProps.icon && (
        <iconProps.icon
          style={{
            position: iconProps.center ? 'absolute' : 'relative',
            top: iconProps.center ? '50%' : 1,
            left: iconProps.center ? '50%' : 1,
            transform: iconProps.center
              ? 'translate(-50%, -50%)'
              : iconProps.rotate
              ? `rotateZ(${iconProps.rotate}deg)`
              : '',
            marginRight: iconProps.noMargin ? '0px' : '10px',
            fontSize: iconProps.size || 20,
            color: iconProps.color || 'white',
            opacity: iconProps.opacity || 1,
          }}
          className="icon"
        />
      )}
      <p
        style={{
          width: '100%',
          textAlign: textCenter ? 'center' : 'left',
        }}
      >
        {text}
      </p>
    </>
  )

  return href ? (
    <StyledLink
      to={href}
      className={classes}
      style={style}
      onClick={onClick}
      aria-disabled={disable}
    >
      {renderContent()}
    </StyledLink>
  ) : (
    <ButtonComp className={classes} style={style} type={type} onClick={onClick} disabled={disable}>
      {renderContent()}
    </ButtonComp>
  )
}

export default Button
