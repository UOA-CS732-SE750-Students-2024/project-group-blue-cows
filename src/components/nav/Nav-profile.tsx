"Use client";
import React from "react";

export default function NavProfile() {
  return (
    <div className="flex items-center py-5">
      <img
        src="/Tristan-Midjourney.png"
        alt="User Profile"
        className="rounded-full w-20 h-20 mr-5"
      />
      <div>
        <p className="text-m font-medium text-white">User Name</p>
        <button className="text-white hover:text-white-700 underline">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
