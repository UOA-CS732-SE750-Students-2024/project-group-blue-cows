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
      getAllClubs(searchString).then(setClubs);
    }, 500);
  }, []);

  useEffect(() => {
    updateClubsDebounced(searchString);
  }, [updateClubsDebounced, searchString]);

  return (
    <main className="h-full">
      <ClubsSearch
        searchString={searchString}
        setSearchString={setSearchString}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="w-full flex">
        {/*  */}
        <ClubsList clubs={clubs} />
      </div>
    </main>
  );
}

function ClubsSearch({
  searchString,
  setSearchString,
  filter,
  setFilter,
}: {
  searchString: string;
  setSearchString: (arg0: string) => void;
  filter: string | null;
  setFilter: (arg0: string | null) => void;
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
      {/* <FilterForm filter={filter} setFilter={setFilter} /> */}
    </div>
  );
}

function ClubsList({ clubs }: { clubs: Club[] }) {
  return (
    <div className="max-w-full min-w-[50%] m-auto">
      <h2 className="text-2xl font-semibold">Results</h2>
      <div role="doc-subtitle" className="">
        Displaying {clubs.length} results
      </div>
      {clubs.map(({ name, logo, description, category, id }) => (
        <Card key={id} className="min-w-96">
          <CardContent className="flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={30}
              height={30}
              alt=""
              src={logo}
              className="w-30 h-auto"
            />
            <div>
              <div role="doc-subtitle">Type</div>
              <h2>Title</h2>
              <p>Text</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
