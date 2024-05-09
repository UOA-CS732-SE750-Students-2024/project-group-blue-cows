"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import NavSection from "./NavSection";
import NavTab from "./NavTab";
import { Club } from "@/schemas/clubSchema";

export default function NavShortcut() {
  const [clubs, setClubs] = useState<Club[]>([]);
  useEffect(() => {
    // Temporary until auth is set up
    const tempClubs: Club[] = [
      {
        id: 1,
        name: "Club 1",
        logo: "/club1.png",
        description: "Club 1",
        membership_fee: "0",
        category: "Sports",
      },
      {
        id: 2,
        name: "Club 2",
        logo: "/club2.png",
        description: "Club 2",
        membership_fee: "0",
        category: "Sports",
      },
    ];
    Promise.resolve(tempClubs).then(setClubs);
  }, []);

  return (
    <NavSection title="Shortcuts" loggedInOnly>
      {clubs.map(({ id, name, logo }) => (
        <NavTab
          key={id}
          href={`/clubs/${id}`}
          imgSrc={logo}
          imgAlt={`${name} Icon`}
        >
          {name}
        </NavTab>
      ))}
    </NavSection>
  );
}
