'use client'
import { CartContextProvider } from '@/hooks/UseCart'
import React from 'react'

interface CartProviderProps{
    children: React.ReactNode
}



const CartProvider = ({children}:CartProviderProps) => {
  return (
<CartContextProvider>
    {children}
</CartContextProvider>  )
}

export default CartProvider