import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Route handlers for UploadThing
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
