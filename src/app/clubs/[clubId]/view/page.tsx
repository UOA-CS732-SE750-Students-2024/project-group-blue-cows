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
    <div className="flex h-screen overflow-auto">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col justify-center items-center w-screen px-10">
          <h1>{clubData.name}</h1>
          <p>{clubData.description}</p>
        </div>
      )}
    </div>
  );
}
