import Image from "next/image";
import React from "react";
import loader from "../../assets/Images/loader.gif";
import { Label } from "../ui/label";
const Loader = () => {
  return (
    <div className="flex items-center justify-center flex-col ">
      <Image src={loader} alt="" width={120} />
      <Label className="text-[#15803D] font-semibold">
        Verifying Your Email...
      </Label>
    </div>
  );
};

export default Loader;
