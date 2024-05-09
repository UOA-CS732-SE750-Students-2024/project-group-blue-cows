import React from "react";

interface FilterBadgeProps {
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
}

const DisplayBadge: React.FC<FilterBadgeProps> = ({
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
      <img
        src="/check-circle-icon.png"
        alt="check icon"
        className="mr-1 w-4 h-4"
      />
      {value}
    </button>
  );
};

export default DisplayBadge;
