"use client";
import { GetSocialDto } from "@/Dtos/social/GetSocialDto";
import { updateClub } from "@/services/clubServices";
import { updateSocialLink } from "@/services/socialsServices";
import Image from "next/image";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useAdmin } from "./AdminPageContext";

interface DescriptionProps {
  className?: string;
}

export function AdminDescription({ className }: DescriptionProps) {
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

const defaultSocialTypes = ['facebook', 'instagram', 'discord', 'web'];

export async function AdminSocials({ className }: DescriptionProps) {
  const { club, setClub, socials, setSocials } = useAdmin();

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

// interface SocialMediaEditorProps {
//   socials: Socials[];
// }

// const SocialMediaEditor: React.FC<SocialMediaEditorProps> = () => {

//     const state = useAdmin();
    
//   // Initialize state with existing socials
// //   const [socialLinks, setSocialLinks] = useState<{ [type: string]: Socials }>(
// //     defaultSocialTypes.reduce((acc, type) => {
// //       acc[type] = socials.find(s => s.type === type) || { id: -1, clubId: -1, link: '', tag: '', type: type };
// //       return acc;
// //     }, {} as { [type: string]: Socials })
// //   );



//   const handleLinkChange = (type: string, value: string) => {
//     setSocialLinks({
//       ...socialLinks,
//       [type]: { ...socialLinks[type], link: value }
//     });
//   };

//   const saveLink = async (type: string) => {
//     const social = socialLinks[type];
//     if (social.id === -1) {
//       // Add new link
//       await addSocialLink({ ...social, link: social.link });
//     } else {
//       // Update existing link
//       await updateSocialLink(social.id, { ...social });
//     }
//   };

//   const deleteLink = async (type: string) => {
//     const social = socialLinks[type];
//     if (social.id !== -1) {
//       await removeSocialLink(social.id);
//       // Update local state
//       handleLinkChange(type, '');
//     }
//   };

//   return (
//     <div className="flex flex-wrap">
//       {defaultSocialTypes.map((type) => (
//         <div key={type} className="p-4">
//           <Image src={`/socials/${type}.png`} alt={type} width={24} height={24} />
//           <input
//             type="text"
//             placeholder={`Add ${type} link`}
//             value={socialLinks[type].link}
//             onChange={(e) => handleLinkChange(type, e.target.value)}
//             className="input input-bordered w-full max-w-xs"
//           />
//           <button className="btn btn-primary" onClick={() => saveLink(type)}>Save</button>
//           <button className="btn btn-ghost" onClick={() => deleteLink(type)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };
