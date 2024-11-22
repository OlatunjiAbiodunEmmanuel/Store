"use client";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utilis/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import React, { useCallback } from "react";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "./ActionBtn";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Client, Storage } from "appwrite"; 


const client = new Client();


client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("672dd1d3000fabe729bc");

const storage = new Storage(client); 


interface ManageProductClientProps {
  products: Product[];
}
const paginationModel = { page: 0, pageSize: 5 };
const ManageProductClient = ({ products }: ManageProductClientProps) => {
  const router = useRouter();
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        images: product.images,
        category: product.category,
        inStock: product.inStock,
        brand: product.brand,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "NAME", width: 220 },
    {
      field: "price",
      headerName: "PRICE",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    // { field: "images", headerName: "IMAGES", width: 220 },
    { field: "category", headerName: "CATEGORY", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "IN STOCK",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                text="In Stock"
                icon={MdClose}
                bg="bg-teal-200"
                color="text-slate-700"
              />
            ) : (
              <Status
                text="Out Of Stock"
                icon={MdDone}
                bg="bg-rose-200"
                color="text-slate-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "ACTIONS",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex justify-between items-center gap-4 w-full">
            <ActionBtn icon={MdCached} onClick={() => {handleToggleStock(params.row.id, params.row.inStock)}} />
            <ActionBtn icon={MdDelete} onClick={()=>{handleDelete(params.row.id, params.row.images)}}/>
            <ActionBtn icon={MdRemoveRedEye} onClick={()=>{router.push(`product/${params.row.id}`)}}/>
          </div>
        );
      },
    },
  ];
const handleToggleStock = useCallback((id: string, inStock: boolean)=>{
axios.put('/api/product', {
  id,
  inStock: !inStock
}).then((res)=>{
  toast.success("Product status Changed")
  router.refresh()
}).catch((err)=>{
  toast.error("Failed to update product status")
})
}, [])

const handleDelete =  useCallback(async (id:string, images:any[])=>{
  toast("Deleting Product, please wait!")
  const handleImageDelete = async () => {
    try {
      for (const item of images) {
        if (item.image) {
          await storage.deleteFile('672de0a8001e82cef20e', item.image);
        }
      }
    } catch (error) {
      console.log('Deleting image error', error);
    }
  };
  await handleImageDelete();
  axios.delete(`/api/product/${id}`).then((res)=>{
    toast.success("Product deleted")
    router.refresh()
  }).catch((err)=>{
    toast.error("Failed to Delete Product")
  })
}, [])










  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductClient;
