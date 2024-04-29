"use client";
import { Button } from "@/components/ui/button";
import { getAllMembersForClub } from "@/gateway/getAllMembersForClub";

  const handleData = async() => {
    const values = await getAllMembersForClub(1);
    console.log(values)
  }

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <Button className="ml-10" onClick={handleData}>
      Test
    </Button>
  </div>
  )
}

export default page