"use client";

import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (value: string) => void;
  endPoint: "offerImage" | "menuImage" | "eventImage";
};

export default function UploadImage({ endPoint, value, onChange }: Props) {
  if (value) {
    return (
      <div className="relative w-[100px] h-[100px] ">
        <Image
          src={value}
          alt="Uploadthing image"
          width={90}
          height={90}
          className="rounded-xl shadow-xl border"
        />
        <div className="absolute -right-1 -top-2 w-6 h-6 flex items-center justify-center rounded-full border-[1px] border-gray-500 bg-white/10 cursor-pointer">
          <X onClick={() => onChange("")} className="text-rose-500 size-4 " />
        </div>
      </div>
    );
  }

  if (!value) {
    return (
      <main className="w-full h-full">
        <UploadButton
          endpoint={endPoint}
          onClientUploadComplete={(res) => {
            onChange(res[0].ufsUrl);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </main>
    );
  }

  return null;
}
