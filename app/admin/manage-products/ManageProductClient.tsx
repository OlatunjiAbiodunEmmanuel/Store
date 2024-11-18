"use client";
import { formatPrice } from "@/utilis/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import React from "react";

interface ManageProductClientProps {
  products: Product[];
}
const paginationModel = { page: 0, pageSize: 5 };
const ManageProductClient = ({ products }: ManageProductClientProps) => {
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
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'NAME', width: 220 },
    { field: 'price', headerName: 'PRICE', width: 100, renderCell:(params)=>{return(<div className="font-bold text-slate-800">{params.row.price}</div>)} },
    { field: 'images', headerName: 'IMAGES', width: 220 },
    { field: 'category', headerName: 'CATEGORY', width: 100 },
    { field: 'inStock', headerName: 'IN STOCK', width: 220 },
    { field: 'brand', headerName: 'BRAND', width: 100 },
  ];





  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
};

export default ManageProductClient;
