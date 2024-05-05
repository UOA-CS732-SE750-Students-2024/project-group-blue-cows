"use client";
import { Modal, openModal } from "@/components/misc/Modal";
import {
  BackButton,
  BlueButton,
  YellowButton,
} from "@/components/misc/buttons";
import { Button } from "@/components/ui/button";
import { getAllMembers } from "@/services/clubServices";
import { showToastDemo } from "@/util/toastUtils";
import { toast } from "react-toastify";

const handleData = async () => {
  const values = await getAllMembers(2);
  console.log(values);
};

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Button className="ml-10" onClick={handleData}>
        Test
      </Button>

      <YellowButton onClick={() => showToastDemo("Yellow Button")}>
        Yellow Button
      </YellowButton>
      <BlueButton onClick={() => showToastDemo("Blue Button")}>
        Blue Button
      </BlueButton>
      <BackButton onClick={() => showToastDemo("Back Button")}></BackButton>

      <BlueButton onClick={() => openModal({content: "Wow", title: "Test"})}>Open Modal</BlueButton>
      <Modal></Modal>
    </div>
  );
};

export default page