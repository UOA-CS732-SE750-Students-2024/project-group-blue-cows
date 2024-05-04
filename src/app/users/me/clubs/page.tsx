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
    <div className="h-[calc(100vh-4rem)] w-full mt-10 bg-customGrass">
      <div className="flex flex-col h-screen">
        <div
          className="flex flex-row h-2/5 bg-cover bg-center"
          style={{ backgroundImage: "url('/grass-background.svg')" }}
        >
          <div className="w-1/4  flex justify-center items-center">
            <div className="w-3/4 h-3/4 flex justify-center items-center">
              <img
                src="/cute-cow.png"
                alt="Cute Cowmunity Cow"
                style={{ height: "auto" }}
              />
            </div>
          </div>
          <div className="w-1/4 flex justify-center items-center">
            <div className="text-left">
              <h1 className="text-3xl">Welcome back, name here!</h1>
            </div>
          </div>
          <div className="w-1/4 flex justify-center items-center">
            <div className="w-3/4 h-3/4 flex justify-center items-center">
              <UserNavCard
                imageUrl="/browse-clubs.png"
                imageAlt="Browse Clubs Image"
                textContent="Browse a range of clubs that match your interests and goals!"
                buttonText="Browse and Join Clubs"
              />
            </div>
          </div>
          <div className="w-1/4 flex justify-start items-center">
            <div className="w-3/4 h-3/4 flex justify-start items-center">
              <UserNavCard
                imageUrl="/register-clubs.png"
                imageAlt="Register Clubs Image"
                textContent="Can’t find the right club for you? Register your own club!"
                buttonText="Register a Club"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row h-auto pt-3 bg-customGrass">
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-5/6 h-auto flex justify-center items-center">
              <ClubsList
                listType={"View Clubs"}
                clubs={dummyClubs}
                numberOfClubs={dummyClubs.length}
              />
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-start">
            <div className="w-5/6 h-auto flex justify-center items-start">
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
    // <div className="bg-blue-200 h-full w-full">
    //   <p>fj</p>

    //   <h1>User Clubs</h1>
    //   <p>fj</p>
    //   <div
    //     className="bg-cover bg-center bg-red-700 h-8"
    //     style={{ backgroundImage: "url('/grass-background.svg')" }}
    //   >
    //     <h2> TEST ETEST</h2>
    //     <h3> why</h3>
    //   </div>
    // </div>
  );
}
