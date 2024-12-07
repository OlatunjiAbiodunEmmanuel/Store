'use client'
import React, { useState } from 'react'
import { SafeUser } from "@/types";
import { Order, Product, Review } from "@prisma/client"
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { comment } from 'postcss';
import Heading from '@/app/components/Heading';
import { Rating } from '@mui/material';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';


interface AddRatingProps{
    product: Product & {
        reviews:Review[]
    };
    user:(SafeUser & {
        orders: Order[]
    }) | null
}


const AddRating = ({product, user}:AddRatingProps) => {

const [isLoading, setIsLoading] = useState(false)
const router =useRouter()
const {register, handleSubmit, setValue, reset, formState:{errors}}= useForm<FieldValues>({
  defaultValues:{
    comment:'',
    rating:0
  }
})

const setCustomValue = (id:string, value:any)=>{
    setValue(id,value,{
        shouldValidate:true,
        shouldDirty:true,
        shouldTouch:true
    })
}

const onSubmit:SubmitHandler<FieldValues> =async (data)=>{
    // setIsLoading(true)
    console.log(data)
}

  return (
    <div className='flex flex-col gap-2 max-w-[500px]'>
<Heading title='Rate this product' />
<Rating onChange={(event, newValue)=>{
    setCustomValue('rating',newValue)
}}/>
<Input
id='comment'
label='Comment'
disabled={isLoading}
register={register}
errors={errors}
required
/>
<Button label={isLoading ? "Loading" : "Rate Product"} onClick={handleSubmit(onSubmit)}/>
    </div>
  )
}

export default AddRating