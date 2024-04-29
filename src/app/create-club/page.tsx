import React, { useState } from "react";
import { Container, Input, Button, Textarea, Spacer } from "@shadcn/ui";

export default function page() {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [membershipFee, setMembershipFee] = useState("0.00");
  const [logo, setLogo] = useState(""); // This should be a URL or some string identifier
  const [category, setCategory] = useState("");

  return (
    <Container>
    <h1>Create Club</h1>
    <form>
      <Input
        label="Club Name"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
        placeholder="Enter club name"
        required
      />
      <Spacer y={1} />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter club description"
        required
      />
      {/* Further input fields added here */}
      <Spacer y={1.5} />
      <Button type="submit">Create Club</Button>
    </form>
  </Container>
  );
}

export const config = { runtime: 'client' };

