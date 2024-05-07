// components/PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";

interface PieChartProps {
  data: { [key: string]: number };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // You can customize colors here
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="h-64">
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
