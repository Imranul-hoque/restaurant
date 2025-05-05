import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const getAuth = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new UploadThingError("Unauthorized");
  }
  return { userId };
};

export const ourFileRouter = {
  menuImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(getAuth)
    .onUploadComplete(() => { }),
  offerImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount : 1
    }
  })
    .middleware(getAuth)
    .onUploadComplete(() => {}),
  eventImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount : 1
    }
  })
    .middleware(getAuth)
    .onUploadComplete(() => {})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
