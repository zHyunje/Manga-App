import React, { ChangeEvent } from 'react'
import { InputComp } from './style'

interface InputProps {
  type?: 'text' | 'password' | undefined
  classes?: string
  placeholder?: string
  value?: string
  style?: React.CSSProperties
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ type, classes, placeholder, value, style, onChange }) => {
  return (
    <InputComp
      type={type}
      className={classes}
      placeholder={placeholder}
      style={style}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input
