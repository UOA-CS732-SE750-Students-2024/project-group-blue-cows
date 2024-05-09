"use client";
import { updateClub } from "@/services/clubServices";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useAdmin } from "./AdminPageContext";
import { GetSocialDto } from "@/Dtos/social/GetSocialDto";
import { updateSocialLink } from "@/services/socialsServices";
import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";

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

// const defaultSocialTypes = ['facebook', 'instagram', 'discord', 'web'];

export async function AdminSocials({ className, initialSocials }: DescriptionProps & { initialSocials: GetSocialDto[] }) {
  const [socials, setSocials] = useState<GetSocialDto[]>(initialSocials);

  function setSocial(social: GetSocialDto) {
    const updatedSocials = socials.map((s) => (s.type === social.type ? social : s));
    setSocials(updatedSocials);
  }

  return (
    <Card className={`w-1/3 p-6 ${className}`}>
      <p className="uppercase">Socials</p>
      {socials.map((social) => (
        <SocialInput key={social.type} social={social} setSocial={setSocial} />
      ))}
    </Card>
  );
}

function SocialInput({ social, setSocial }: { social: GetSocialDto, setSocial: (social: GetSocialDto) => void }) {
  const { link, type, tag } = social;

  function handleLinkChange(value: string) {
    const newSocial = { ...social, link: value };
    updateSocialLink(social.id, newSocial);
    setSocial(newSocial);
  }

  return (
    <div className="mt-2 flex gap-2 items-center">
      <Image src={`/socials/${type}.png`} alt={tag} width={30} height={30} className="h-full aspect-square" />
      <Input
        type="text"
        placeholder={`Add ${type} link`}
        value={link}
        onChange={(e) => handleLinkChange(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
}