import React from 'react'
import ManageProductClient from './ManageProductClient'
import getProducts from '@/actions/getProduct'
import Container from '@/app/components/Container'
import { getCurrentUser } from '@/actions/getCurrentUser'

const ManageProducts = async () => {
  const product = await getProducts({category: null})
  const currentUser = await getCurrentUser()
  return (
<div className='p-8'>
<Container>
      <ManageProductClient/>
    </Container>
</div>
  )
}

export default ManageProducts