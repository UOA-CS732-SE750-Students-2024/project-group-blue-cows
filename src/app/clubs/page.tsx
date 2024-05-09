"use client";

import { Card, CardContent } from "@/components/ui/card";
import DisplayBadge from "@/components/ui/display-badge";
import { FilterBar } from "@/components/ui/filter-bar";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Club } from "@/schemas/clubSchema";
import { getAllClubs } from "@/services/clubServices";
import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const updateClubsDebounced = useMemo(() => {
    return debounce(async (searchString: string) => {
      await getAllClubs(searchString, filter).then(setClubs);
      setLoading(false);
    }, 500);
  }, [filter]);

  useEffect(() => {
    updateClubsDebounced(searchString);
  }, [updateClubsDebounced, searchString, filter]);

  return (
    <main className="h-full w-full bg-customGrass">
      <ClubsSearch
        searchString={searchString}
        setSearchString={setSearchString}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="w-full flex bg-customGrass">
        {loading ? <LoadingSpinner /> : <ClubsList clubs={clubs} />}
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
    <div
      className="flex flex-col justify-center items-center gap-5 bg-cover py-4"
      style={{ backgroundImage: "url('/cow-pattern-background.svg')" }}
    >
      <h2 className="text-center text-black text-3xl font-semibold mt-3">
        Browse Clubs
      </h2>
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
      <div className="text-black pb-3">
        <FilterBar filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}

function ClubsList({ clubs }: { clubs: Club[] }) {
  return (
    <div className="w-5/6 lg:w-11/12 m-auto mb-10">
      <h2 className="text-4xl font-semibold mt-10">Results</h2>
      <div role="doc-subtitle" className="text-md">
        Displaying {clubs.length} results
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {clubs.map(({ name, logo, description, category, id }) => (
          <Card
            key={id}
            className="min-w-96 h-[17rem] shadow-sm shadow-slate-500 border-none"
          >
            <CardContent className="px-8 py-5">
              <Link href={`/clubs/${id}/view`}>
                <div className="flex gap-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`${name} logo`}
                    src={logo}
                    className="w-24 h-24 rounded-2xl mt-1"
                  />
                  <div className="overflow-hidden">
                    <div
                      role="doc-subtitle"
                      className="text-md mb-3 line-clamp-1 text-ellipsis"
                    >
                      <DisplayBadge value={category} />
                    </div>
                    <h3
                      className={`font-semibold text-wrap break-word line-clamp-2 ${
                        name.length > 30 ? "text-md" : "text-2xl"
                      }`}
                    >
                      {name}
                    </h3>
                  </div>
                </div>
                <p className="mt-6 text-md text-wrap break-word line-clamp-4">
                  {description}
                </p>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
