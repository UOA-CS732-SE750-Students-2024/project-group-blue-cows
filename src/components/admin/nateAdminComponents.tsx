"use client";
import { updateClub } from "@/services/clubServices";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useAdmin } from "./AdminPageContext";

interface DescriptionProps {
  className?: string;
}

export function Description({ className }: DescriptionProps) {
  const { club, setClub } = useAdmin();

  function setDescription(description: string) {
    const updatedClub = {
      ...club,
      description,
    };
    setClub(updatedClub);
  }

  return (
    <Card className={`w-1/2 p-6 ${className}`}>
      <p className="uppercase">Description</p>
      <Textarea
        value={club.description}
        onChange={(event) => setDescription(event.target.value)}
        onBlur={() => {
          console.log("blur");
          updateClub(club.id, club);
        }}
      />
    </Card>
  );
}
