import { Line } from "react-chartjs-2";
import { ChartDataType } from "../../ChartContainer/ChartContainer";

export const LineChart = ({ chartData }: { chartData: ChartDataType }) => {
  // @ts-ignore
  return <Line data={chartData} />;
};
