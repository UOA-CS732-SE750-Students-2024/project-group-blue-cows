"use client";

import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { FilterForm } from "@/components/ui/filter-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Club } from "@/schemas/clubSchema";
import { getAllClubs } from "@/services/clubServices";

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  const updateClubsDebounced = useMemo(() => {
    return debounce((searchString) => {
      console.log("f called")
      getAllClubs(searchString).then(setClubs);
    }, 500)
  }, []);

  useEffect(() => {
    updateClubsDebounced(searchString);
  }, [updateClubsDebounced, searchString]);

  console.log(clubs);

  return (
    <main className="h-full">
      <ClubsSearch
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <div className="w-full flex">
        <FilterForm filter={filter} setFilter={setFilter} />
        <ClubsList />
      </div>
    </main>
  );
}

function ClubsSearch({
  searchString,
  setSearchString,
}: {
  searchString: string;
  setSearchString: (arg0: string) => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-1/3 bg-[url('cow-banner.svg')] bg-cover">
      <h2 className="text-center text-2xl font-semibold">Browse Clubs</h2>
      <div role="doc-subtitle" className="text-center">
        Find a club that suits your interests and goals.
      </div>
      <div className="w-1/2 flex relative">
        <Image
          src="nav-search-icon.svg"
          alt=""
          width={5}
          height={5}
          className="brightness-75 w-5 h-auto absolute top-2.5 left-2.5"
        />
        <Input
          type="search"
          placeholder="Search"
          className="w-full rounded-lg pl-10"
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
        />
      </div>
    </div>
  );
}

function ClubsList() {
  return (
    <>
      <Card>
        <CardContent className="flex">
          <Image
            width={30}
            height={30}
            alt=""
            src="/blue-cows.webp"
            className="w-30 h-auto"
          />
          <div>
            <h2>Title</h2>
            <p>Text</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
