import React from "react";
import { Card, CardHeader, CardContent } from "./card";
import { Button } from "./button";
import Link from "next/link";

interface UserNavCardProps {
  navigationLink: string;
  imageUrl: string;
  imageAlt: string;
  textContent: string;
  buttonText: string;
}

const UserNavCard: React.FC<UserNavCardProps> = ({
  navigationLink,
  imageUrl,
  imageAlt,
  textContent,
  buttonText,
}) => {
  return (
    <Card className="">
      <CardHeader className="flex justify-center items-center">
        <img
          src={imageUrl}
          alt={imageAlt}
          style={{ height: "8vh", width: "auto" }}
        />
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <p className="text-base text-center sm:text-xs md:text-xs lg:text-sm">
          {textContent}
        </p>
        <Link href={navigationLink}>
          <Button className="mt-3 bg-customAccent" variant="outline">
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserNavCard;
