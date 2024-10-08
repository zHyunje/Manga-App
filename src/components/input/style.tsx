import styled from 'styled-components'

export const InputComp = styled.input`
  margin-block: 10px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  padding: 17.5px 20px;
  border-radius: 0.35rem;
  color: ${(props) => props.theme.text};

  &.no-margin {
    margin: 0 !important;
  }

  &.py-sm {
    padding: 9px 12.5px;
  }
`
