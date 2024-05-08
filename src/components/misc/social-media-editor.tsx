"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Socials } from '@/schemas/socialsSchema';
import { updateSocialLink, addSocialLink, removeSocialLink } from '@/services/socialsServices';

interface SocialMediaEditorProps {
  socials: Socials[];
}

const defaultSocialTypes = ['facebook', 'instagram', 'discord', 'web'];

const SocialMediaEditor: React.FC<SocialMediaEditorProps> = ({ socials }) => {
  // Initialize state with existing socials
  const [socialLinks, setSocialLinks] = useState<{ [type: string]: Socials }>(
    defaultSocialTypes.reduce((acc, type) => {
      acc[type] = socials.find(s => s.type === type) || { id: -1, clubId: -1, link: '', tag: '', type: type };
      return acc;
    }, {} as { [type: string]: Socials })
  );

  const handleLinkChange = (type: string, value: string) => {
    setSocialLinks({
      ...socialLinks,
      [type]: { ...socialLinks[type], link: value }
    });
  };

  const saveLink = async (type: string) => {
    const social = socialLinks[type];
    if (social.id === -1) {
      // Add new link
      await addSocialLink({ ...social, link: social.link });
    } else {
      // Update existing link
      await updateSocialLink(social.id, { ...social });
    }
  };

  const deleteLink = async (type: string) => {
    const social = socialLinks[type];
    if (social.id !== -1) {
      await removeSocialLink(social.id);
      // Update local state
      handleLinkChange(type, '');
    }
  };

  return (
    <div className="flex flex-wrap">
      {defaultSocialTypes.map((type) => (
        <div key={type} className="p-4">
          <Image src={`/socials/${type}.png`} alt={type} width={24} height={24} />
          <input
            type="text"
            placeholder={`Add ${type} link`}
            value={socialLinks[type].link}
            onChange={(e) => handleLinkChange(type, e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary" onClick={() => saveLink(type)}>Save</button>
          <button className="btn btn-ghost" onClick={() => deleteLink(type)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaEditor;
