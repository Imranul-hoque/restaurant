"use client";

import React from "react";
import Cancel from "@/lottie/cancel.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const CancelPage = () => {
  return (
    <div className="w-[95vw] h-[70vh] flex items-center justify-center">
      <Lottie animationData={Cancel} loop />
    </div>
  );
};

export default CancelPage;
