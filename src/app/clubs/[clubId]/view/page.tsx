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
    <div className="flex h-screen overflow-auto">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div name="header_wrapper">
          <header></header>
          <div name="cols_container">
            <div name="left_col">
              <div name="img_container">
                <img src={clubData?.logo} alt="club logo" />
                <span></span>
              </div>
              <h2>{clubData?.name}</h2>
              {/* <p>{clubData?.aliases</p> JUST MOVE THIS LINE WHEREVER THE NAME IS FOR NOW, IT'LL GO UNDER THE NAME IF WE CHOOSE TO ACTUALLY DO THIS */}
              <p>Socials</p>
              <p>Social Media Data here once its ready to go</p>
            </div>

            <div name="right_col">
              <nav>
                <button>Follow</button>
              </nav>

              <div>
                <img src"{clubData?.logo}" alt="club logo" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
