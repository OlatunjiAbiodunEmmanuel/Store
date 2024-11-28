import React from 'react'
import Container from '../Container'
import { Categories } from '@/utilis/Categories'
const Category = () => {
  return (
    <div className='bg-white'>
        <Container>
            <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {Categories.map((item)=>(
                  <div>
                    
                  </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Category