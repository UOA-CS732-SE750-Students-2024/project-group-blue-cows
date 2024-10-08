import { auth } from "@/util/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for UploadThing
export const uploadThingFileRouter: FileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const session = await auth();
      const user = session?.user;

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized. Please sign in.");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Runs on the server after file upload
      // TODO: remove before submission, this is just for debugging
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type UploadThingFileRouter = typeof uploadThingFileRouter;
