"use client";
import { Club } from "@/schemas/clubSchema";
import { ReactNode, createContext, useContext, useState } from "react";

interface AdminContextType {
  club: Club;
  setClub: (club: Club) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children, initialClub }: { children: ReactNode, initialClub: Club}) => {
  const [club, setClub] = useState<Club>(initialClub);

  return (
    <AdminContext.Provider value={{ club, setClub }}>
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

