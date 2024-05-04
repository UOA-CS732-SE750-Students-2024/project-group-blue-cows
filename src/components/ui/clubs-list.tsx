import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Club {
  imageUrl: string;
  name: string;
  memberSince: number;
}

interface ClubListItemProps {
  imageUrl: string;
  clubName: string;
  memberSince: number;
}

const ClubListItem: React.FC<ClubListItemProps> = ({
  imageUrl,
  clubName,
  memberSince,
}) => {
  return (
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
        <p className="text-gray-700 mb-2">Member since {memberSince}</p>
      </div>
    </div>
  );
};

interface ClubsListProps {
  listType: String;
  clubs: Club[];
  numberOfClubs: number;
}

const ClubsList: React.FC<ClubsListProps> = ({
  listType,
  clubs,
  numberOfClubs,
}) => {
  return (
    <Card
      className="overflow-scroll"
      style={{ height: "auto", width: "100%", minHeight: "40vh" }}
    >
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
          <Card key={index} style={{ height: "auto", width: "100%" }}>
            <ClubListItem
              imageUrl={club.imageUrl}
              clubName={club.name}
              memberSince={club.memberSince}
            />
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default ClubsList;
