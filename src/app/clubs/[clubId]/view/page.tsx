"use client";

import { useEffect, useState } from "react";
import { getClubById } from "@/services/clubServices";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Club } from "@/schemas/clubSchema";
import NotFoundPage from "@/app/not-found";
import Gallery from "@/components/misc/gallery";
import { Image, Image as ImageSchema } from "@/schemas/imagesSchema";
import { getAllImagesForClub } from "@/services/imageServices";
import SocialLinks from "@/components/misc/social-links";
import { Socials } from "@/schemas/socialsSchema";
import { getAllSocialsForClub } from "@/services/socialsServices";
import router, { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Component definition accepting clubId as a prop
export default function ClubViewPage({
  params,
}: {
  params: { clubId: string };
}) {
  const [clubData, setClubData] = useState<Club | null>(null);
  const [images, setImages] = useState<ImageSchema[]>([]);
  const [socials, setSocials] = useState<Socials[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true); // New state for image loading
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

      const filteredImages = images.filter(
        (image) => image.title !== null
      ) as Image[];

      setClubData(data);
      setImages(filteredImages);
      setSocials(socialLinks);
      setLoading(false);
    };
    fetchClubData();
  }, [params.clubId]);

  // Rendering logic based on loading and data state
  if (!clubData && !loading) {
    return notFound();
  }

  const navigateToRegister = () => {
    router.push(`/clubs/${params.clubId}/register`);
  };

  return (
    // top most div (below) is equivalent to body
    <div className="w-full m-0 p-0 box-border min-h-screen">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full">
          <div className="relative rounded-b flex justify-start w-full">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            <img
              src={clubData?.coverImage || "https://picsum.photos/id/1018/3000"}
              className={`h-[40vh] object-cover w-full rounded-b ${
                imageLoading ? "hidden" : ""
              }`}
              alt="cover"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
            <div className="absolute -bottom-5 left-20">
              <img
                src={clubData?.logo}
                className="object-cover border-8 border-white w-40 h-40 rounded-md"
                alt="club logo"
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5 p-10">
            <div className="flex flex-col space-y-4 ml-10 col-span-1">
              <div>
                {/* Membership Fee Section */}
                <h2 className="text-md font-semibold pb-2">MEMBERSHIP FEE</h2>
                <p>
                  {clubData?.membership_fee === "0.00"
                    ? "Free to sign up"
                    : `$${clubData?.membership_fee}`}
                </p>
                <Button
                  onClick={navigateToRegister}
                  className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded shadow-lg hover:shadow-xl transition duration-150 ease-in-out"
                >
                  Sign Up
                </Button>
              </div>
              {/* Social Links Section */}
              <h2 className="text-md font-semibold">SOCIAL MEDIA</h2>
              <SocialLinks socials={socials} />
            </div>
            <div className="col-span-4 mr-20">
              {/* Title, Description and Gallery Section */}
              <div>
                <h1 className="text-2xl font-bold pb-6">{clubData?.name}</h1>
                <h2 className="text-md font-semibold pb-2">DESCRIPTION</h2>
                <p>{clubData?.description}</p>
              </div>
              {/* Gallery implemented in div below */}
              <div>
                <h1 className="text-md font-semibold mt-5">GALLERY</h1>
                <Gallery images={images} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
