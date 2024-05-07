import React from 'react';
import Image from 'next/image';
import { Socials } from '@/schemas/socialsSchema';

// Helper object to map social media types to their icons
export const socialIcons = {
    facebook: '/public/socials/facebook.png',
    instagram: '/public/socials/facebook.png',
    discord: '/public/socials/facebook.png',
    web: '/public/socials/web.png'
  };

  const SocialLinks = ({ socials }: { socials: Socials[] }) => (
    <div className="flex flex-col space-y-4">
      {socials.map((social: Socials) => (
        <a key={social.id} href={social.link} className="flex items-center space-x-2">
          <Image
            src={socialIcons[social.type] || '/public/socials/web.png'} // Use the icon from the mapping or default (web) if not found
            alt={social.tag}
            width={24}
            height={24}
          />
          <span>{social.tag}</span>
        </a>
      ))}
    </div>
  );
  
  export default SocialLinks;
