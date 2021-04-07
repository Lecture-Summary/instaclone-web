import { InputHTMLAttributes, VFC } from 'react'
import styled from 'styled-components'

const SButton = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
`

const Button: VFC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <SButton {...props}></SButton>
}

export default Button
