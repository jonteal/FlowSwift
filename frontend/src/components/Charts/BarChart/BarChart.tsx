import { Bar } from "react-chartjs-2";
import { ChartDataType } from "../../ChartContainer/ChartContainer";

export const BarChart = ({ chartData }: { chartData: ChartDataType }) => {
  //@ts-ignore
  return <Bar data={chartData} />;
};
