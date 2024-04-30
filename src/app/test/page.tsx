"use client";
import { Button } from "@/components/ui/button";
import { getAllMembers } from "@/services/clubServices";

  const handleData = async() => {
    const values = await getAllMembers(2);
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