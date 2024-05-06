"use client";

import { useEffect, useState } from 'react';
import { getClubById } from '@/services/clubServices';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Club } from "@/schemas/clubSchema";
import Custom404 from '@/pages/404';
import Image from 'next/image';
import TimelineHeader from "@/components/misc/timelineheader";

// Component definition accepting clubId as a prop
export default function ClubViewPage({ params }: { params: { clubId: string } }) {
  const [clubData, setClubData] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);

  // Effect to fetch club data using the provided clubId
  useEffect(() => {
    const fetchClubData = async () => {
      const data = await getClubById(Number(params.clubId));
      setClubData(data);
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
        <div className="grid grid-cols-2 gap-2 p-5">
            <div className="flex flex-col space-y-4 mt-20 ml-16 ">
              {/* Social Links Section */}
              <div><a href="#">Facebook</a></div>
              <div><a href="#">Twitter</a></div>
              <div><a href="#">LinkedIn</a></div>
              <div><a href="#">Other Socials</a></div>
            </div>
            <div>
              {/* Title, Description and Gallery Section */}
              <h2 className="text-lg font-bold">{clubData?.name}</h2>
              <p>{clubData?.description}</p>
              {/* Gallery can be implemented here */}
            </div>
      </div>
      </div>
      

      










      //   //div below is equivalent to header_wrapper
      //   <div>
      //     <header></header>
      //     {/* div below is equivalent to cols_container */}
      //     <div>
      //       {/* div below is equivalent to left_col */}
      //       <div className='px-[20px] py-[25px] text-center max-w-[350px] relative mx-auto  '>
      //         {/* div below is equivalent to img_container */}
      //         <div className='absolute -top-[60px] left-2/4 [transform:translatex(-50%)]'>
      //           <img src={clubData?.logo} alt="club logo" />
      //           <span></span>
      //         </div>
      //         <h2>{clubData?.name}</h2>
      //         {/* <p>{clubData?.aliases</p> JUST MOVE THIS LINE WHEREVER THE NAME IS FOR NOW, IT'LL GO UNDER THE NAME IF WE CHOOSE TO ACTUALLY DO THIS */}
      //         <p>Socials</p>
      //         <p>Social Media Data here once its ready to go</p>
      //       </div>

      //       {/* div below is equivalent to right_col */}
      //       <div>
      //         <nav>
      //           <button>Follow</button>
      //         </nav>

      //         <div>
      //           <img src={clubData?.logo} alt="club logo" />
      //           <img src={clubData?.logo} alt="club logo" />
      //           <img src={clubData?.logo} alt="club logo" />
      //           <img src={clubData?.logo} alt="club logo" />
      //           <img src={clubData?.logo} alt="club logo" />

      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // )}
      )}
    </div>
  );
}
