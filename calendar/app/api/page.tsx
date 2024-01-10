import { NextApiRequest, NextApiResponse } from "next";

const generateChartData = () => {
  // Implement logic to generate chart data here
  // Example data:
  const chartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "1 AM",
        data: [3, 5, 2, 8, 10, 6, 4],
      },
      // Add more datasets for other times
    ],
  };

  const chartOptions = {
    // Configure chart options as needed
  };

  return { chartData, chartOptions };
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { chartData, chartOptions } = generateChartData();
  res.status(200).json({ chartData, chartOptions });
};
