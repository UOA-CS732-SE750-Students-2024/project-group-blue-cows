import { useState } from "react";
import FilterBadge from "./filter-badge";

export function FilterBar({
  filter,
  setFilter,
}: {
  filter: string | null;
  setFilter: (arg0: string | null) => void;
}) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(filter);

  const handleFilterClick = (value: string) => {
    setSelectedFilter(value === selectedFilter ? null : value);
    setFilter(value === selectedFilter ? null : value);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {[
        "All",
        "Academic and specialist",
        "Sport",
        "Special Interest",
        "Religious and spiritual",
        "Causes",
        "Cultural",
      ].map((option) => (
        <FilterBadge
          key={option}
          value={option}
          selected={selectedFilter === option}
          onClick={() => handleFilterClick(option)}
        />
      ))}
    </div>
  );
}
