'use client'
import React from 'react'
import Container from '../Container'
import { Categories } from '@/utilis/Categories'
import CategoryComponent from './CategoryComponent'
import { usePathname, useSearchParams } from 'next/navigation'
const Category = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()

  const isMainPage = pathname== '/'
  if(!isMainPage) return null
  return (
    <div className='bg-slate-100'>
        <Container>
            <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {Categories.map((item)=>(
                  <div>
                    <CategoryComponent
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    selected={category === item.label || (category === null && item.label === 'All')}
                    />
                  </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Category