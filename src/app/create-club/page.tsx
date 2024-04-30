"use client"; // to get react to know it's a client compponent

import React, { useState } from "react";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

import {Textarea} from "@/components/ui/textarea" 

export default function Page() {
    const [clubName, setClubName] = useState("");
    const [description, setDescription] = useState("");
    const [membershipFee, setMembershipFee] = useState("0.00");
    const [logo, setLogo] = useState(""); // This should be a URL or string identifier
    const [category, setCategory] = useState("");
  
    return (
      <div className="container">
        <h1>Create Club</h1>
        <form>
          <Input
            label="Club Name"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            placeholder="Enter club name"
            required
          />
          <div className="spacer"></div>
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter club description"
            required
          />
          {/* Further input fields added here */}
          <div className="spacer"></div>
          <Button type="submit">Create Club</Button>
        </form>
      </div>
    );
  }

export const config = { runtime: 'client' };

