"use client"; // to get react to know it's a client component

import { React, useEffect, useState } from "react";
import { getAllSocialsForClub } from "@/services/socialsServices";
import SocialLinks from "../misc/social-links";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Socials } from "@/schemas/socialsSchema";
import SocialMediaEditor from "../misc/social-media-editor";

export default function ClubEditForm({ clubId }) {
  const { data: sessionData } = useSession(); // Get the session data
  const [socials, setSocials] = useState<Socials[]>([]);  // State to hold socials data

  useEffect(() => {
    getAllSocialsForClub(clubId).then(fetchedSocials => {
      setSocials(fetchedSocials);
    });
  }, [clubId, setSocials]); // Adding clubId to the dependency array to ensure re-fetching if clubId changes

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex">
        <div className="w-1/2 p-4">
          <Card className="p-2">
            <p>DESCRIPTION</p>
          </Card>
        </div>
        <div className="w-1/2 p-4">
          <Card className="p-2">
            <p>ADDITIONAL INFORMATION</p>
          </Card>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 p-4">
          <Card className="p-2">
            <SocialMediaEditor socials={socials} />
          </Card>
        </div>
        <div className="w-2/3 p-4">
          <Card className="p-2">
            <p>GALLERY</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
