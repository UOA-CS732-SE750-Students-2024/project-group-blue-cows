import { createContext, useContext, useState, ReactNode } from "react";
import { Club } from "@/schemas/clubSchema";

interface AdminContextType {
  club: Club | null;
  setClub: (club: Club | null) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const ClubProvider = ({ children, initialClub }: { children: ReactNode, initialClub: Club | null }) => {
  const [club, setClub] = useState<Club | null>(initialClub);

  return (
    <AdminContext.Provider value={{ club, setClub }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useClub = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
};
