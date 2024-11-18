"use client";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import { Client, Storage } from "appwrite";  
import { Categories } from "@/utilis/Categories";
import { colors } from "@/utilis/Colors";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { MdDataExploration } from "react-icons/md";
import { useRouter } from "next/navigation";



export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const client = new Client();


client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("672dd1d3000fabe729bc");

const storage = new Storage(client); 

const AddProductForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      inStock: false,
      images: [],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected Image");
    }

    const handleImageUpload = async () => {
      toast("Creating product, please wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const file = item.image; 
            const fileName = `${new Date().getTime()}-${file.name}`;

            const response = await storage.createFile(
              "672de0a8001e82cef20e", 
              "unique()", 
              file
            );

        
            uploadedImages.push({
              color: item.color,
              colorCode: item.colorCode,
              image: response.$id, 
            });
          }
        }
        setIsProductCreated(true);
        setIsLoading(false);
        toast.success("Product created successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
        setIsLoading(false);
      }
    };

    await handleImageUpload();
    const productData ={...data, images: uploadedImages}
    



axios.post('/api/product', productData).then(()=>{
  toast.success('Product Created');
  setIsProductCreated(true)
  router.refresh()
  }).catch((error)=>{
    toast.error('something went wrong');
}).finally(()=>{
  setIsLoading(false);
})

  };

  useEffect(() => {
    setCostumValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const category = watch("category");

  const setCostumValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        return prev.filter((item) => item.color !== value.color);
      }
      return prev;
    });
  }, []);

  return (
    <>
      <Heading title="Add a Product" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox id="inStock" register={register} label="This product is in stock" />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select Categories</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {Categories.map((item) => {
            if (item.label === "All") return null;
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCostumValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the available product colors and upload their images.
          </div>
          <div className="text-sm">
            You must upload an image for each selected color; otherwise, your color selection will be ignored.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => (
            <SelectColor
              key={index}
              item={item}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
              isProductCreated={isProductCreated}
            />
          ))}
        </div>
      </div>
      <Button label={isLoading ? "Loading..." : "Add Product"} onClick={handleSubmit(onSubmit)} />
    </>
  );
};

export default AddProductForm;
