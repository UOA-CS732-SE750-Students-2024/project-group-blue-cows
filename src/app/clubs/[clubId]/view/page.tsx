"use client";

import { useEffect, useState } from "react";
import { getClubById } from "@/services/clubServices";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Club } from "@/schemas/clubSchema";
import NotFoundPage from "@/app/not-found";
import Image from "next/image";
import Gallery from "@/components/misc/gallery";
import { Image as ImageSchema } from "@/schemas/imagesSchema";
import { getAllImagesForClub } from "@/services/imageServices";
import SocialLinks from "@/components/misc/social-links";
import socialsSchema from "@/schemas/socialsSchema";
import { getAllSocialsForClub } from "@/services/socialsServices";
import Link from "next/link";
import router, { useRouter } from "next/navigation";

// Component definition accepting clubId as a prop
export default function ClubViewPage({
  params,
}: {
  params: { clubId: string };
}) {
  const [clubData, setClubData] = useState<Club | null>(null);
  const [images, setImages] = useState<(typeof Image)[]>([]);
  const [socials, setSocials] = useState<(typeof socialsSchema)[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Effect to fetch club data using the provided clubId
  useEffect(() => {
    const fetchClubData = async () => {
      const clubId = Number(params.clubId);
      const [data, images, socialLinks] = await Promise.all([
        getClubById(clubId),
        getAllImagesForClub(clubId),
        getAllSocialsForClub(clubId),
      ]);

      setClubData(data);
      setImages(images);
      setSocials(socialLinks);
      setLoading(false);
    };
    fetchClubData();
  }, [params.clubId]);

  // Rendering logic based on loading and data state
  if (!clubData && !loading) {
    return <NotFoundPage />;
  }
  const navigateToSignup = () => {
    router.push(`/clubs/${params.clubId}/signup`);
  };
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
              {/* Button below the logo */}
              <button
                onClick={navigateToSignup}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1 p-5">
            <div className="flex flex-col space-y-4 mt-20 ml-16 col-span-1">
              {/* Social Links Section */}
              <SocialLinks socials={socials} />
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
                <h1 className="text-lg font-bold">Gallery</h1>
                <Gallery images={images} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
