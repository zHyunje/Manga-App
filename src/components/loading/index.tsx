import React from 'react'
import { LoadingSection } from './style'

// icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type LoadingProps = {
  isLoading: boolean
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <LoadingSection className={isLoading ? 'active' : ''}>
      <AiOutlineLoading3Quarters className="icon" />
    </LoadingSection>
  )
}

export default Loading
