'use client'
import { ImageType } from '@/app/admin/add-products/AddProductForm'
import React, { useCallback, useEffect, useState } from 'react'

interface SelectColorProps{
    item: ImageType
    addImageToState:(value: ImageType)=>void
    removeImageFromState:(value:ImageType)=>void
    isProductCreated: boolean
}


const SelectColor = ({item, addImageToState, removeImageFromState, isProductCreated}:SelectColorProps) => {

const [isSelected, setIsSelected] = useState(false)
const [file, setFile] = useState<File | null>(null)

useEffect(() => {
if (isProductCreated) {
    setIsSelected(false)
    setFile(null)
}
}, [isProductCreated])

const handleFileChange = useCallback((value: File)=>{
setFile(value)
addImageToState({...item, image: value})

}, [])
const handleCheck = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
setIsSelected(e.target.checked)
if (!e.target.checked) {
    setFile(null)
    removeImageFromState(item)
}

}, [])
  return (
    <div>
        
    </div>
  )
}

export default SelectColor