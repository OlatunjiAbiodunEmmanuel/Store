import React from 'react'

interface ContainerProps{
    children: React.ReactNode
}

const Container = ({children}:ContainerProps) => {
  return (
    <div className='max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4 bg-red200'>
        {children}
    </div>
  )
}

export default Container