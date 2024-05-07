import ClubsList from "@/components/ui/clubs-list";
import UserNavCard from "@/components/ui/user-nav-card";

const dummyAdminClubs = [
  {
    imageUrl: "/wdcc-logo.png",
    name: "Web Development & Consulting Club",
    memberSince: 2021,
  },
  {
    imageUrl: "/sesa-logo.png",
    name: "Software Engineering Students Association",
    memberSince: 2020,
  },
];
const dummyClubs = [
  {
    imageUrl: "/wdcc-logo.png",
    name: "Web Development & Consulting Club",
    memberSince: 2021,
  },
  {
    imageUrl: "/sesa-logo.png",
    name: "Software Engineering Students Association",
    memberSince: 2020,
  },
  {
    imageUrl: "/wdcc-logo.png",
    name: "Web Development & Consulting Club",
    memberSince: 2021,
  },
  {
    imageUrl: "/sesa-logo.png",
    name: "Software Engineering Students Association",
    memberSince: 2020,
  },
  {
    imageUrl: "/wdcc-logo.png",
    name: "Web Development & Consulting Club",
    memberSince: 2021,
  },
  {
    imageUrl: "/sesa-logo.png",
    name: "Software Engineering Students Association",
    memberSince: 2020,
  },
];

export default function UserClubsPage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full mt-12 bg-customGrass">
      <div className="flex flex-col h-screen">
        <div
          className="flex flex-col sm:flex-row h-2/5 bg-cover bg-center"
          style={{ backgroundImage: "url('/grass-background.svg')" }}
        >
          <div className="w-full sm:w-1/4  flex justify-center items-center">
            <div className="w-3/4 h-3/4 flex justify-center items-center">
              <img
                src="/cute-cow.png"
                alt="Cute Cowmunity Cow"
                style={{ height: "auto" }}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/4 flex items-center">
            <div className="text-left">
              <h1 className="text-xl">
                Welcome back,
                <br />
                name here!
              </h1>
            </div>
          </div>
          <div className="w-full sm:w-1/4 flex justify-center items-center">
            <div className="w-5/6 h-3/4 flex justify-center items-center">
              <UserNavCard
                navigationLink="/clubs"
                imageUrl="/browse-clubs.png"
                imageAlt="Browse Clubs Image"
                textContent="Browse clubs that match your interests and goals!"
                buttonText="Browse and Join Clubs"
              />
            </div>
          </div>
          <div className="w-full sm:w-1/4 flex justify-center items-center mr-10">
            <div className="w-5/6 h-3/4 flex justify-center items-center">
              <UserNavCard
                navigationLink="/create-club"
                imageUrl="/register-clubs.png"
                imageAlt="Register Clubs Image"
                textContent="Can’t find the right club for you? Register your own!"
                buttonText="Register a Club"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row h-auto pt-6 bg-customGrass pb-10">
          <div className="w-full sm:w-1/2 flex justify-center items-center overflow-hidden">
            <div className="w-5/6 h-auto flex justify-center items-center overflow-hidden">
              <ClubsList
                listType={"View Clubs"}
                clubs={dummyClubs}
                numberOfClubs={dummyClubs.length}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 flex justify-center items-start overflow-hidden">
            <div className="w-5/6 h-auto flex justify-center items-start overflow-hidden">
              <ClubsList
                listType={"Manage Clubs"}
                clubs={dummyAdminClubs}
                numberOfClubs={dummyAdminClubs.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
