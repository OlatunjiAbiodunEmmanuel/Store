import { title } from "process";
import React from "react";
import AdminNav from "../components/Admin/AdminNav";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div><AdminNav/></div>
      {children}
    </div>
  );
};

export default AdminLayout;
