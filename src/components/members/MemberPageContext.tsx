"use client";
import { ReactNode, createContext } from "react";

const defaultMemberPageContextData = {
  // sorting: [],
  // setSorting: () => {},
  // columnFilters: [],
  // setColumnFilters: () => {},
  // columnVisibility: {},
  // setColumnVisibility: () => {},
  // rowSelection: {},
  // setRowSelection: () => {},
  // handleClick: () => {},
};

const MemberPageContext = createContext(defaultMemberPageContextData);

export function MemberPageContextProvider({
  data,
  children,
}: {
  data: {};
  children: ReactNode;
}) {
  return (
    <MemberPageContext.Provider value={data}>
      {children}
    </MemberPageContext.Provider>
  );
}
