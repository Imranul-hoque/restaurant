"use client";

import React from "react";
import Succes from "@/lottie/success.json";
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });


const SuccessPage = () => {

    const router = useRouter();

    return (
        <div className="flex flex-col w-[95vw] h-[70vh] items-center justify-center"> 
            <Lottie className="w-[300px] h-[300px]" animationData={Succes} loop={false} />
            <Button onClick={() => router.push("/")}  variant={"ghost"} className="w-[40%] cursor-pointer bg-yellow-600 text-black">
                Home
           </Button>
      </div>
  )
};

export default SuccessPage;
