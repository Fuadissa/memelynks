"use client";

import { addDays, differenceInDays, formatISO9075, parseISO } from "date-fns";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from "recharts";

// Define the type for chart data
interface ChartData {
  date: string; // Explicit 'date' property
  [key: string]: number | string; // Allow other keys as number, but keep date as string
}

// Props for the Chart component
interface ChartProps {
  data: ChartData[];
}

export default function Chart({ data }: ChartProps) {
  if (!data || data.length === 0) {
    return <div className="flex justify-center items-center">No data available</div>;
  }

  // Safely extract the first numeric key (other than "date")
  const xLabelKey = Object.keys(data[0]).find((key) => key !== "date");

  if (!xLabelKey) {
    return <div>Invalid data format</div>;
  }

  // Initialize the dataWithoutGaps array
  const dataWithoutGaps: ChartData[] = [];

  // Fill gaps in the data
  data.forEach((value, index) => {
    const date = value.date;
    dataWithoutGaps.push({
      date,
      [xLabelKey]: value[xLabelKey] || 0,
    });

    const nextDate = data[index + 1]?.date;
    if (date && nextDate) {
      const daysBetween = differenceInDays(parseISO(nextDate), parseISO(date));
      if (daysBetween > 0) {
        for (let i = 1; i < daysBetween; i++) {
          const dateBetween = formatISO9075(addDays(parseISO(date), i)).split(
            " "
          )[0];
          dataWithoutGaps.push({
            date: dateBetween,
            [xLabelKey]: 0,
          });
        }
      }
    }
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={730}
          height={250}
          data={dataWithoutGaps}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid horizontal={false} strokeWidth="2" stroke="#f5f5f5" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: "#aaa" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: "#aaa" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={xLabelKey}
            stroke="#09f"
            strokeWidth="4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
