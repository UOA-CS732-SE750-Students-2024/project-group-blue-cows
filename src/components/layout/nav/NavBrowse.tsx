import React from "react";
import NavTab from "./NavTab";
import NavSection from "./NavSection";

export default function NavBrowse() {
  return (
    <NavSection title="Browse Clubs" tooltip="Club Search">
      <NavTab href="/clubs" imgSrc="/nav-search-icon.svg">
        Search For Clubs
      </NavTab>
    </NavSection>
  );
}
