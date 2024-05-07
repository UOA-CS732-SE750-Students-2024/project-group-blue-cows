import React from 'react';
import Image from 'next/image';

// Helper object to map social media types to their icons
const socialIcons = {
  Facebook: '/path/to/facebook/icon.png',
  Instagram: '/path/to/instagram/icon.png',
  LinkedIn: '/path/to/linkedin/icon.png',
  Discord: '/path/to/discord/icon.png',
  TikTok: '/path/to/tiktok/icon.png',
};

const SocialLinks = ({ socials }) => (
  <div className="flex flex-col space-y-4">
    {socials.map((social) => (
      <a key={social.id} href={social.link} className="flex items-center space-x-2">
        <Image
          src={socialIcons[social.type] || '/path/to/default/icon.png'}
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
