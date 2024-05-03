import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import NavTab from "./NavTab";

export default function NavBrowse() {
  return (
    <div className="flex flex-col items-start py-2">
      <h1 className="text-white text-sm">BROWSE CLUBS</h1>
      <NavTab href="/clubs" imgSrc="nav-search-icon.svg" imgAlt="Search Icon">
        Search For Clubs
      </NavTab>
    </div>
  );
}
