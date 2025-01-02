import Image from "next/image";
import React from "react";
import loader from "@/assets/Images/loader.gif";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <Image src={loader} alt="Loading" width={120} height={120} className="animate-pulse" />
    </div>
  );
};

export default Loader;
