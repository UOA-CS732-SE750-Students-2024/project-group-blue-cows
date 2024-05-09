import ClubsList from "@/components/ui/clubs-list";
import UserNavCard from "@/components/ui/user-nav-card";
import {
  getListOfClubsForAdmin,
  getListOfClubsForUser,
} from "@/services/clubServices";
import { getUserAuthentication } from "@/util/auth";
import { notFound } from "next/navigation";

export default async function UserClubsPage() {
  const user = await getUserAuthentication();
  const userName = user.name ?? "guest";
  let userId = user.id;
  if (!userId) return notFound();
  const adminClubs = await getListOfClubsForAdmin(userId);
  const clubs = await getListOfClubsForUser(userId);

  return (
    <div className="w-full mt-12 bg-customGrass">
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
                className="h-auto"
              />
            </div>
          </div>
          <div className="w-full sm:w-1/4 flex items-center">
            <div className="text-left">
              <h1 className="text-xl">
                Welcome back,
                <br />
                {userName}!
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
                navigationLink="/clubs/new"
                imageUrl="/register-clubs.png"
                imageAlt="Register Clubs Image"
                textContent="Can’t find the right club for you? Register your own!"
                buttonText="Register a Club"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row h-auto pt-6 pb-10">
          <div className="w-full sm:w-1/2 flex justify-center items-center overflow-hidden">
            <div className="w-5/6 h-auto flex justify-center items-center overflow-hidden">
              <ClubsList
                listType={"View Clubs"}
                clubs={clubs}
                numberOfClubs={clubs.length}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 flex justify-center items-start overflow-hidden">
            <div className="w-5/6 h-auto flex justify-center items-start overflow-hidden">
              <ClubsList
                listType={"Manage Clubs"}
                clubs={adminClubs}
                numberOfClubs={adminClubs.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
