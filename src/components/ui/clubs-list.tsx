import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface Club {
  clubId: number;
  imageUrl: string;
  name: string;
  category: string;
}

interface ClubListItemProps {
  clubId: number;
  imageUrl: string;
  clubName: string;
  category: string;
  listType: string;
}

const ClubListItem: React.FC<ClubListItemProps> = ({
  clubId,
  imageUrl,
  clubName,
  category,
  listType,
}) => {
  return (
    <Link
      href={
        listType == "View Clubs"
          ? `/clubs/${clubId}/view`
          : `/clubs/${clubId}/admin`
      }
    >
      <div className="shadow-md bg-white rounded-lg p-2 flex items-center">
        <div className="w-1/5">
          <img
            src={imageUrl}
            alt="Image"
            className="object-cover h-full w-full rounded-md"
          />
        </div>
        <div className="w-4/5 pl-4">
          <p className="text-md font-semibold mb-2">{clubName}</p>
          <p className="text-gray-700 mb-2">Category: {category}</p>
        </div>
      </div>
    </Link>
  );
};

interface ClubsListProps {
  listType: string;
  clubs: Club[];
  numberOfClubs: number;
}

const ClubsList: React.FC<ClubsListProps> = ({
  listType,
  clubs,
  numberOfClubs,
}) => {
  return (
    <Card style={{ height: "auto", width: "100%", minHeight: "40vh" }}>
      <CardHeader>
        <CardTitle>{listType}</CardTitle>

        <CardDescription>
          {listType == "View Clubs"
            ? `You are a member of ${numberOfClubs} clubs.`
            : `You are an admin for ${numberOfClubs} clubs.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {clubs.map((club, index) => (
          <Card key={index} className="h-auto w-full mb-1">
            <ClubListItem
              clubId={club.clubId}
              imageUrl={club.imageUrl}
              clubName={club.name}
              category={club.category}
              listType={listType}
            />
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default ClubsList;
