import { Input } from "@/components/ui/input";
import React from "react";

export default function ProfileEditBody() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid-item">
        <h3>UPI (e.g. abc123)</h3>
        <Input />
      </div>
      <div className="grid-item">
        <h3>Student ID (e.g. 123456789)</h3>
        <Input />
      </div>
      <div className="grid-item">
        <h3>University</h3>
        <Input />
      </div>
      <div className="grid-item">
        <h3>Year Level</h3>
        <Input />
      </div>
      <div className="grid-item">
        <h3>Degree</h3>
        <Input />
      </div>
      <div className="grid-item">
        <h3>Specialisation/Majors</h3>
        <Input />
      </div>
    </div>
  );
}
