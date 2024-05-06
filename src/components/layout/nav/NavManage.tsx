"use client";
import React, { useContext, useEffect, useState } from "react";
import NavSection from "./NavSection";
import NavTab from "./NavTab";

export default function NavManage() {
  return (
    <NavSection title="Manage Clubs" tooltip="Manage your clubs" loggedInOnly>
      <NavTab href="/users/me/clubs" imgSrc="/nav-list-icon.svg">
        View My Clubs
      </NavTab>
      <NavTab href="/clubs/new" imgSrc="/nav-manage-icon.svg">
        Register a New Club
      </NavTab>
    </NavSection>
  );
}
