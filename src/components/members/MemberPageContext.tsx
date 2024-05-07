"use client";
import { studentData } from "@/gateway/member/getAllMembersForClub";
import { ReactNode, createContext, useContext, useState } from "react";

interface MemberPageContextType {
  members: studentData[];
  setMembers: (members: studentData[]) => void;
}

const MemberPageContext = createContext<MemberPageContextType>({
  members: [],
  setMembers() {},
});

export function MemberPageContextProvider({
  initialMembers,
  children,
}: {
  initialMembers: studentData[];
  children: ReactNode;
}) {
  const [members, setMembers] = useState(initialMembers);

  return (
    <MemberPageContext.Provider value={{ members, setMembers }}>
      {children}
    </MemberPageContext.Provider>
  );
}

export function useMemberPage() {
  return useContext(MemberPageContext);
}