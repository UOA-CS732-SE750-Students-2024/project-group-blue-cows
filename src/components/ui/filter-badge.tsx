import React from "react";

interface FilterBadgeProps {
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({
  value,
  selected,
  onClick,
}) => {
  return (
    <button
      className={`px-3 py-1 rounded-full ${
        selected ? "bg-customAccent text-black" : "bg-customPrimary text-white"
      }`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default FilterBadge;
