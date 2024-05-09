import React from "react";

interface DisplayBadgeProps {
  value: string;
}

const getImageSource = (value: string) => {
  switch (value) {
    case "Academic and Specialist":
      return "/club-category-icons/academic-icon.png";
    case "Sport":
      return "/club-category-icons/sports-icon.png";
    case "Special Interest":
      return "/club-category-icons/interests-icon.png";
    case "Religious and Spiritual":
      return "/club-category-icons/religious-icon.png";
    case "Causes":
      return "/club-category-icons/causes-icon.png";
    case "Cultural":
      return "/club-category-icons/cultural-icon.png";
    default:
      return "/club-category-icons/default-icon.png";
  }
};

const DisplayBadge: React.FC<DisplayBadgeProps> = ({ value }) => {
  return (
    <div
      className={`py-1 flex items-center rounded-full text-gray-500 overflow-hidden`}
    >
      <img
        src={getImageSource(value)}
        alt="check icon"
        className="mr-1 w-4 h-4"
      />
      <span className="truncate">{value}</span>
    </div>
  );
};

export default DisplayBadge;
