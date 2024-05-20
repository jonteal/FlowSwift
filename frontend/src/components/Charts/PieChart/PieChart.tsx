import { Pie } from "react-chartjs-2";
import { ChartDataType } from "../../ChartContainer/ChartContainer";

export const PieChart = ({ chartData }: { chartData: ChartDataType }) => {
  // @ts-ignore
  return <Pie data={chartData} />;
};
