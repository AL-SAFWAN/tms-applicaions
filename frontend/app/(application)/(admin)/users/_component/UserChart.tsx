"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useUserChartInfo } from "@/hooks/users";
const chartData = [
  {
    date: "2024-08-29",
    users: 0,
  },
  {
    date: "2024-08-30",
    users: 0,
  },
  {
    date: "2024-08-31",
    users: 0,
  },
  {
    date: "2024-09-01",
    users: 0,
  },
  {
    date: "2024-09-02",
    users: 0,
  },
  {
    date: "2024-09-03",
    users: 0,
  },
  {
    date: "2024-09-04",
    users: 0,
  },
  {
    date: "2024-09-05",
    users: 0,
  },
  {
    date: "2024-09-06",
    users: 0,
  },
  {
    date: "2024-09-07",
    users: 0,
  },
  {
    date: "2024-09-08",
    users: 0,
  },
  {
    date: "2024-09-09",
    users: 0,
  },
  {
    date: "2024-09-10",
    users: 0,
  },
  {
    date: "2024-09-11",
    users: 0,
  },
  {
    date: "2024-09-12",
    users: 0,
  },
  {
    date: "2024-09-13",
    users: 0,
  },
  {
    date: "2024-09-14",
    users: 0,
  },
  {
    date: "2024-09-15",
    users: 0,
  },
  {
    date: "2024-09-16",
    users: 0,
  },
  {
    date: "2024-09-17",
    users: 0,
  },
  {
    date: "2024-09-18",
    users: 0,
  },
  {
    date: "2024-09-19",
    users: 0,
  },
  {
    date: "2024-09-20",
    users: 0,
  },
  {
    date: "2024-09-21",
    users: 0,
  },
  {
    date: "2024-09-22",
    users: 0,
  },
  {
    date: "2024-09-23",
    users: 0,
  },
  {
    date: "2024-09-24",
    users: 0,
  },
  {
    date: "2024-09-25",
    users: 0,
  },
  {
    date: "2024-09-26",
    users: 0,
  },
  {
    date: "2024-09-27",
    users: 0,
  },
  {
    date: "2024-09-28",
    users: 0,
  },
  {
    date: "2024-09-29",
    users: 0,
  },
  {
    date: "2024-09-30",
    users: 0,
  },
  {
    date: "2024-10-01",
    users: 0,
  },
  {
    date: "2024-10-02",
    users: 0,
  },
  {
    date: "2024-10-03",
    users: 0,
  },
  {
    date: "2024-10-04",
    users: 0,
  },
  {
    date: "2024-10-05",
    users: 0,
  },
  {
    date: "2024-10-06",
    users: 0,
  },
  {
    date: "2024-10-07",
    users: 0,
  },
  {
    date: "2024-10-08",
    users: 0,
  },
  {
    date: "2024-10-09",
    users: 0,
  },
  {
    date: "2024-10-10",
    users: 0,
  },
  {
    date: "2024-10-11",
    users: 0,
  },
  {
    date: "2024-10-12",
    users: 0,
  },
  {
    date: "2024-10-13",
    users: 0,
  },
  {
    date: "2024-10-14",
    users: 0,
  },
  {
    date: "2024-10-15",
    users: 0,
  },
  {
    date: "2024-10-16",
    users: 0,
  },
  {
    date: "2024-10-17",
    users: 0,
  },
  {
    date: "2024-10-18",
    users: 0,
  },
  {
    date: "2024-10-19",
    users: 0,
  },
  {
    date: "2024-10-20",
    users: 0,
  },
  {
    date: "2024-10-21",
    users: 0,
  },
  {
    date: "2024-10-22",
    users: 0,
  },
  {
    date: "2024-10-23",
    users: 0,
  },
  {
    date: "2024-10-24",
    users: 0,
  },
  {
    date: "2024-10-25",
    users: 0,
  },
  {
    date: "2024-10-26",
    users: 0,
  },
  {
    date: "2024-10-27",
    users: 0,
  },
  {
    date: "2024-10-28",
    users: 0,
  },
  {
    date: "2024-10-29",
    users: 0,
  },
  {
    date: "2024-10-30",
    users: 0,
  },
  {
    date: "2024-10-31",
    users: 0,
  },
  {
    date: "2024-11-01",
    users: 0,
  },
  {
    date: "2024-11-02",
    users: 0,
  },
  {
    date: "2024-11-03",
    users: 0,
  },
  {
    date: "2024-11-04",
    users: 0,
  },
  {
    date: "2024-11-05",
    users: 0,
  },
  {
    date: "2024-11-06",
    users: 0,
  },
  {
    date: "2024-11-07",
    users: 0,
  },
  {
    date: "2024-11-08",
    users: 0,
  },
  {
    date: "2024-11-09",
    users: 0,
  },
  {
    date: "2024-11-10",
    users: 0,
  },
  {
    date: "2024-11-11",
    users: 0,
  },
  {
    date: "2024-11-12",
    users: 0,
  },
  {
    date: "2024-11-13",
    users: 0,
  },
  {
    date: "2024-11-14",
    users: 0,
  },
  {
    date: "2024-11-15",
    users: 0,
  },
  {
    date: "2024-11-16",
    users: 0,
  },
  {
    date: "2024-11-17",
    users: 0,
  },
  {
    date: "2024-11-18",
    users: 0,
  },
  {
    date: "2024-11-19",
    users: 0,
  },
  {
    date: "2024-11-20",
    users: 0,
  },
  {
    date: "2024-11-21",
    users: 0,
  },
  {
    date: "2024-11-22",
    users: 0,
  },
  {
    date: "2024-11-23",
    users: 1,
  },
  {
    date: "2024-11-24",
    users: 0,
  },
  {
    date: "2024-11-25",
    users: 0,
  },
  {
    date: "2024-11-26",
    users: 0,
  },
  {
    date: "2024-11-27",
    users: 67,
  },
];
const total = 68;
const chartConfig = {
  views: {
    label: "Number of Users",
  },
  users: {
    label: "users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function UserChart() {
  const { data: chartData } = useUserChartInfo();

  const chart = "users" as keyof typeof chartConfig;
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-4 sm:py-0">
          <CardTitle>User Activity </CardTitle>
          <CardDescription>
            Showing total new users for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t bg-muted/50 px-4 py-2 text-left sm:border-l sm:border-t-0">
            <span className="text-xs text-muted-foreground">
              {chartConfig[chart].label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {chartData?.totalCount.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData?.data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={"users"}
              type="monotone"
              stroke={`var(--color-${"users"})`}
              strokeWidth={2}
              dot={false}
            ></Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
