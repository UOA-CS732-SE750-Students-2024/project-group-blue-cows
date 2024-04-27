import React from "react";

export default function NavProfile() {
  return (
    <div className="flex items-center py-10">
      <img
        src="/Tristan-Midjourney.png"
        alt="User Profile"
        className="rounded-full w-10 h-10 mr-2"
      />
      <div>
        <p className="text-sm font-medium text-white">User Name</p>
        <button className="text-white hover:text-white-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
