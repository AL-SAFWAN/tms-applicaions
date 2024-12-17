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
