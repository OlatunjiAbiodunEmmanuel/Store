import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
interface CategoryComponentProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}
const CategoryComponent = ({
  label,
  icon: Icon,
  selected,
}: CategoryComponentProps) => {
    const router = useRouter();
    const params = useSearchParams();
  const handleClick = useCallback(() => {
    if (label === 'All') {
        router.push('/')
    }else{{
        let currentQuery ={}
        if (params) {
            currentQuery = queryString.parse(params.toString());
        }
    }}
  }, []);

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center text-center gap-1 p-2 order-b-2 hover:text-slate-800 transition cursor-pointer
    ${
      selected
        ? "border-b-slate-800 text-slate-800"
        : "border-transparent text-slate-500"
    }
    `}
    >
      <Icon size={20} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryComponent;
