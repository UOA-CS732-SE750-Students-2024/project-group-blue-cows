// components/MembershipDashboard.tsx
import React from "react";
import PieChart from "./pie-chart";

interface MembershipData {
  degree: number;
  yearLevel: number;
}

interface MembershipDashboardProps {
  data: MembershipData;
}

const MembershipDashboard: React.FC<MembershipDashboardProps> = ({ data }) => {
  // Dummy data for the pie chart
  const pieChartData = {
    Degree: data.degree,
    "Year Level": data.yearLevel,
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2 p-4">
        {/* <PieChart data={pieChartData} /> */}
      </div>
      <div className="w-full md:w-1/2 p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Membership Data</h2>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Filter By:
          </label>
          <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option>degree</option>
            <option>year level</option>
          </select>
        </div>
        <div className="mb-4">
          <p>Some text about the membership data goes here.</p>
        </div>
        <div>
          <div className="flex items-center mb-1">
            <div className="w-4 h-4 bg-blue-500 mr-2"></div>
            <span>Category A</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="w-4 h-4 bg-green-500 mr-2"></div>
            <span>Category B</span>
          </div>
          {/* Add more categories as needed */}
        </div>
      </div>
    </div>
  );
};

export default MembershipDashboard;
