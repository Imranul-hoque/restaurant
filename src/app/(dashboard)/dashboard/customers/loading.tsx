import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-[95vh] flex items-center justify-center">
      <Loader className="size-5 animate-spin" />
    </div>
  );
}
