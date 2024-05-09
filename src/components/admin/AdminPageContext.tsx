"use client";
import { GetSocialDto } from "@/Dtos/social/GetSocialDto";
import { PostSocialDto } from "@/Dtos/social/PostSocialDto";
import { Club } from "@/schemas/clubSchema";
import { ReactNode, createContext, useContext, useState } from "react";

interface AdminContextType {
  club: Club;
  setClub: (club: Club) => void;
  socials: GetSocialDto[];
  setSocials: (socials: GetSocialDto[]) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children, initialClub, initialSocials }: { children: ReactNode, initialClub: Club, initialSocials: GetSocialDto[]}) => {
  const [club, setClub] = useState<Club>(initialClub);
  const [socials, setSocials] = useState<GetSocialDto[]>(initialSocials);

  return (
    <AdminContext.Provider value={{ club, setClub, socials, setSocials }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
};
