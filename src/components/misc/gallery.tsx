"use client";

interface GalleryProps {
  images: typeof Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="p-5 md:p-10">
      <div className="columns-1 gap-5 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
        {images.map((image) => (
          <img key={image.id} src={image.imageUrl} alt={image.title} className="border-2 border-blue-700" />
        ))}
      </div>
    </div>
  );
};

export default Gallery;