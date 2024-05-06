"use client";

import { useEffect, useState } from 'react';
import { getClubById } from '@/services/clubServices';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Club } from "@/schemas/clubSchema";
import Custom404 from '@/pages/404';

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
        //div below is equivalent to header_wrapper
        <div>
          <header></header>
          {/* div below is equivalent to cols_container */}
          <div>
            {/* div below is equivalent to left_col */}
            <div className='text-center  '>
              {/* div below is equivalent to img_container */}
              <div>
                <img src={clubData?.logo} alt="club logo" />
                <span></span>
              </div>
              <h2>{clubData?.name}</h2>
              {/* <p>{clubData?.aliases</p> JUST MOVE THIS LINE WHEREVER THE NAME IS FOR NOW, IT'LL GO UNDER THE NAME IF WE CHOOSE TO ACTUALLY DO THIS */}
              <p>Socials</p>
              <p>Social Media Data here once its ready to go</p>
            </div>

            {/* div below is equivalent to right_col */}
            <div>
              <nav>
                <button>Follow</button>
              </nav>

              <div>
                <img src={clubData?.logo} alt="club logo" />
                <img src={clubData?.logo} alt="club logo" />
                <img src={clubData?.logo} alt="club logo" />
                <img src={clubData?.logo} alt="club logo" />
                <img src={clubData?.logo} alt="club logo" />

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
