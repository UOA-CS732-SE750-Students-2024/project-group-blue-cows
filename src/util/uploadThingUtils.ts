import { UploadThingFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

// Components for UploadThing
export const UploadButton = generateUploadButton<UploadThingFileRouter>();
export const UploadDropzone = generateUploadDropzone<UploadThingFileRouter>();
