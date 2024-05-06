"use client";

import { useEffect, useState } from 'react';
import { getClubById } from '@/services/clubServices';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Club } from "@/schemas/clubSchema";
import Custom404 from '@/pages/404';
import Image from 'next/image';
import TimelineHeader from "@/components/misc/timelineheader";
import  Gallery  from '@/components/misc/gallery';
import { Image as ImageSchema } from '@/schemas/imagesSchema';
import { getAllImagesForClub } from '@/services/imageServices';

// Component definition accepting clubId as a prop
export default function ClubViewPage({ params }: { params: { clubId: string } }) {
  const [clubData, setClubData] = useState<Club | null>(null);
  const [images, setImages] = useState<typeof Image[]>([]);
  const [loading, setLoading] = useState(true);

  // Effect to fetch club data using the provided clubId
  useEffect(() => {
    const fetchClubData = async () => {
      const clubId = Number(params.clubId);
      const data = await getClubById(clubId);
      const images = await getAllImagesForClub(clubId);
      setClubData(data);
      setImages(images);
      setLoading(false);
    };
    fetchClubData();
  }, []);

  // Rendering logic based on loading and data state
  if (!clubData && !loading) {
    return <Custom404 />;
  }

  return (
    // top most div (below) is equivalent to body
    <div className="w-full m-0 p-0 box-border min-h-screen">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full">
          <div className="relative h-96 rounded-b flex justify-start w-full">
            <img
              src="https://picsum.photos/id/1018/3000"
              className="object-cover w-full h-full rounded-b"
              alt="cover"
            />
            <div className="absolute -bottom-20 left-20">
              <img
                src={clubData?.logo}
                className="object-cover border-8 border-white w-40 h-40 rounded-md"
                alt="club logo"
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1 p-5">
            <div className="flex flex-col space-y-4 mt-20 ml-16 col-span-1">
              {/* Social Links Section */}
              <div>
                <a href="#">Facebook</a>
              </div>
              <div>
                <a href="#">Twitter</a>
              </div>
              <div>
                <a href="#">LinkedIn</a>
              </div>
              <div>
                <a href="#">Other Socials</a>
              </div>
            </div>
            <div className="col-span-4 mr-20">
              {/* Title, Description and Gallery Section */}
              <div>
                <h1 className="text-lg font-bold pb-6">{clubData?.name}</h1>
                <h2 className="text-md font-semibold pb-2">DESCRIPTION</h2>
                <p>{clubData?.description}</p>
              </div>
              {/* Gallery implemented in div below */}
              <div>
                <h1 className='text-lg font-bold'>Gallery</h1>
                <Gallery images={images} />
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
