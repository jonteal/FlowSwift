import { useState } from "react";
import { BarChart } from "../Charts/BarChart/BarChart";
import { PieChart } from "../Charts/PieChart/PieChart";
import { LineChart } from "../Charts/LineChart/LineChart";
import { useSelector } from "react-redux";

export const ChartContainer = ({ chartData }) => {
  const { charts, pieChart, barChart, lineChart } = useSelector(
    (state) => state.clientsList
  );

  const leadCount = chartData?.clients?.filter(
    (client) => client.status === "Lead"
  ).length;
  const prospectCount = chartData?.clients?.filter(
    (client) => client.status === "Prospect"
  ).length;
  const currentCount = chartData?.clients?.filter(
    (client) => client.status === "Current"
  ).length;
  const formerCount = chartData?.clients?.filter(
    (client) => client.status === "Former"
  ).length;
  const coldCount = chartData?.clients?.filter(
    (client) => client.status === "Cold"
  ).length;

  const clientCountByCategory = [
    {
      value: leadCount,
      status: "Lead",
    },
    {
      value: prospectCount,
      status: "Prospect",
    },
    {
      value: currentCount,
      status: "Current",
    },
    {
      value: formerCount,
      status: "Former",
    },
    {
      value: coldCount,
      status: "Cold",
    },
  ];

  const [clientChartData, setClientChartData] = useState({
    labels: clientCountByCategory?.map((data) => data?.status),
    datasets: [
      {
        label: "Client Breakdown",
        data: clientCountByCategory?.map((data) => data?.value),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <>
      {charts && (
        <div className="flex flex-row">
          {barChart && (
            <div className="w-1/2">
              <BarChart chartData={clientChartData} />
            </div>
          )}
          {pieChart && (
            <div className="w-1/4">
              <PieChart chartData={clientChartData} />
            </div>
          )}
          {lineChart && (
            <div>
              <LineChart chartData={clientChartData} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
