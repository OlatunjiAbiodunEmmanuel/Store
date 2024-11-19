"use client";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utilis/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import React from "react";
import { MdClose, MdDone } from "react-icons/md";

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
      width: 100,
      renderCell: (params) => {
        return <div>Acion</div>;
      },
    },
  ];

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
          // sx={{ border: 0 }}
        />
      </div>
    </div>
  );
};

export default ManageProductClient;
