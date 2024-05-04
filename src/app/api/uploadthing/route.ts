import { createRouteHandler } from "uploadthing/next";

import { uploadThingFileRouter } from "./core";

// Route handlers for UploadThing
export const { GET, POST } = createRouteHandler({
  router: uploadThingFileRouter,
});
