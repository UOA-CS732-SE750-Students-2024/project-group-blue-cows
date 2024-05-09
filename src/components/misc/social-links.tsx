import React from "react";
import Image from "next/image";
import { Socials } from "@/schemas/socialsSchema";

// Helper object to map social media types to their icons
export const socialIcons: { [key: string]: string } = {
  facebook: "/socials/facebook.png",
  instagram: "/socials/instagram.png",
  discord: "/socials/discord.png",
  web: "/socials/web.png",
};

const SocialLinks = ({ socials }: { socials: Socials[] }) => (
  <div className="flex flex-col space-y-2">
    {socials.map((social: Socials) => (
      <a
        key={social.id}
        href={social.link}
        className="flex items-center space-x-2"
      >
        <Image
          src={socialIcons[social.type] || "/socials/web.png"} // Use the icon from the mapping or default (web) if not found
          alt={social.tag}
          width={20}
          height={20}
        />
        <span className="text-sm">{social.tag}</span>
      </a>
    ))}
  </div>
);

export default SocialLinks;
