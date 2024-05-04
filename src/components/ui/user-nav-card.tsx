import React from "react";
import { Card, CardHeader, CardContent } from "./card";
import { Button } from "./button";

interface UserNavCardProps {
  imageUrl: string;
  imageAlt: string;
  textContent: string;
  buttonText: string;
}

const UserNavCard: React.FC<UserNavCardProps> = ({
  imageUrl,
  imageAlt,
  textContent,
  buttonText,
}) => {
  return (
    <Card>
      <CardHeader className="flex justify-center items-center">
        <img
          src={imageUrl}
          alt={imageAlt}
          style={{ height: "8vh", width: "auto" }}
        />
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <p className="text-base sm:text-xs md:text-xs lg:text-sm">
          {textContent}
        </p>
        <Button className="mt-3" variant="outline">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserNavCard;
