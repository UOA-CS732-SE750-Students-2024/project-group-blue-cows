import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserClubsPage() {
  return (
    <div className="bg-blue-200 h-[calc(100vh-4rem)] w-full p-10">
      <div className="flex flex-col h-screen">
        <div className="flex flex-row h-2/5">
          <div className="w-1/4 bg-red-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-yellow-300 flex justify-center items-center">
              <img
                src="/cute-cow.png"
                alt="Cute Cowmunity Cow"
                style={{ height: "auto" }}
              />
            </div>
          </div>
          <div className="w-1/4 bg-purple-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-pink-300 flex justify-center items-center">
              <h1>Welcome back, NAME!</h1>
            </div>
          </div>
          <div className="w-1/4 bg-red-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-yellow-300 flex justify-center items-center">
              <Card className="h-13">
                <CardHeader>
                  <img
                    src="/browse-clubs.png"
                    alt="Register Clubs Image"
                    style={{ height: "auto", width: "100px" }}
                  />
                </CardHeader>
                <CardContent>
                  <p>
                    Browse a range clubs that match your interests and goals!
                  </p>
                  <Button className="mt-5" variant="outline">
                    Browse and Join Clubs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-1/4 bg-purple-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-pink-300 flex justify-center items-center">
              <Card>
                <CardHeader>
                  <img
                    src="/register-clubs.png"
                    alt="Register Clubs Image"
                    style={{ height: "auto", width: "100px" }}
                  />
                </CardHeader>
                <CardContent>
                  <p>
                    Can’t find the right club for you? Register your own club!
                  </p>
                  <Button className="mt-5" variant="outline">
                    Register a Club
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-row h-3/5">
          <div className="w-1/2 bg-orange-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-indigo-300 flex justify-center items-center">
              <Card style={{ height: "100%", width: "100%" }}>
                <CardHeader>
                  <CardTitle>Visit Clubs</CardTitle>
                  <CardDescription>
                    You are a member of X clubs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Card style={{ height: "10vh", width: "100%" }}>
                    <div className="shadow-md bg-white rounded-lg p-4 flex items-center">
                      <div className="w-1/5">
                        <img
                          src="/wdcc-logo.png"
                          alt="Image"
                          className="object-cover h-full w-full rounded-md"
                        />
                      </div>
                      <div className="w-4/5 pl-4">
                        <p className="text-md font-semibold mb-2">
                          Web Development & Consulting Club
                        </p>
                        <p className="text-gray-700 mb-2">Member since 2021</p>
                      </div>
                    </div>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-1/2 bg-teal-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-cyan-300 flex justify-center items-center">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Clubs</CardTitle>
                  <CardDescription>
                    You are an admin for Y clubs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
              </Card>
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
