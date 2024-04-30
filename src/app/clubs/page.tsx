"use client";

import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { FilterForm } from "@/components/ui/filter-form";
import {
  Card,
  CardContent
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
    <div className="flex flex-col justify-center items-center gap-5 h-[30%] bg-[url('cow-banner.svg')] bg-cover">
      <h2 className="text-center text-4xl font-semibold">Browse Clubs</h2>
      <div role="doc-subtitle" className="text-center text-lg">
        Find a club that suits your interests and goals.
      </div>
      <div className="w-1/2 flex relative">
        <Image
          src="nav-search-icon.svg"
          alt=""
          width={5}
          height={5}
          className="brightness-75 w-6 h-auto absolute top-3 left-3.5"
        />
        <Input
          type="search"
          placeholder="Search"
          className="w-full h-12 rounded-lg pl-12 text-lg"
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
    <div className="w-5/6 lg:w-2/3 m-auto">
      <h2 className="text-4xl font-semibold mt-10">Results</h2>
      <div role="doc-subtitle" className="text-md">
        Displaying {clubs.length} results
      </div>
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        {clubs.map(({ name, logo, description, category, id }) => (
          <Card key={id} className="min-w-96 h-[19rem] shadow-sm shadow-slate-500 border-none">
            <CardContent className="px-8 py-5">
              <div className="flex gap-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`${name} logo`}
                  src={logo}
                  className="w-24 h-24 rounded-2xl mt-6"
                />
                <div className="overflow-hidden">
                  <div
                    role="doc-subtitle"
                    className="text-md mb-3 line-clamp-1 text-ellipsis"
                  >
                    {category}
                  </div>
                  <h3 className="text-3xl font-semibold text-wrap break-word line-clamp-2">
                    {name}
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-md text-wrap break-word line-clamp-4">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
