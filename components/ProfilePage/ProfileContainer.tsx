import React from "react";
import Sidebar from "./Sidebar";

export default function ProfileContainer({
  children, className
}: {
  children: React.ReactNode;
  className?: string;
}) { 
  return (
    <div className="mt-36 sm:mt-48 lg:mt-52 xl:mt-56 sm:w-[600px] sm:mx-auto lg:w-[700px] xl:w-[1200px] lg:flex lg:justify-between lg:bg-[#27263C] lg:rounded-3xl lg:max-h-[778px] xl:max-h-[606px] overflow-hidden">
      <Sidebar />
      <div className={`xl:w-full ${className}`}>{children}</div>
    </div>
  );
}
