import React from "react";
import { PostGalleryImageDto } from "@/Dtos/image/PostGalleryImageDto";

interface GalleryProps {
  images: PostGalleryImageDto[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div>
      {images.length === 0 ? (
        <p className="pt-1">No images provided</p>
      ) : (
        <div className="p-2 md:p-3 columns-1 gap-5 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
          {images.map((image) => (
            <img
              key={image.imageUrl}
              src={image.imageUrl}
              alt={image.title}
              className="border-2 border-blue-700"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
