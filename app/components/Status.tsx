import React from "react";
import { IconType } from "react-icons";
interface StatusProps {
  text: string;
  bg: string;
  color: string;
  icon: IconType;
}
const Status = ({ text, bg, color, icon: Icon }: StatusProps) => {
  return (
    <div className={`${bg} ${color} px-1 rounded flex items-center gap-1`}>
      {text} <Icon size={15} />
    </div>
  );
};

export default Status;
