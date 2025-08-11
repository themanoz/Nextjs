"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  mobile: {
    label: "Commits",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface ChartsProps {
  filteredContributions: Contribution[];
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  availableYears: number[];
}

interface Contribution {
  date: string;
  commits: number;
}

import { monthNames } from "@/types/types";

export function Charts({
  filteredContributions,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  availableYears,
}: ChartsProps) {
  // const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth);
  // const [selectedYear, setSelectedYear] = useState<number>(defaultYear);

  const filteredData = filteredContributions.filter(({ date }) => {
    const entryDate = new Date(date);
    return (
      entryDate.getMonth() === selectedMonth &&
      entryDate.getFullYear() === selectedYear
    );
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Daily Commits</CardTitle>
          {/* <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription> */}
        </div>
        <Select
          onValueChange={(value: string) => onMonthChange(Number(value))}
          value={selectedMonth.toString()}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {monthNames.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value: string) => onYearChange(Number(value))}
          value={selectedYear.toString()}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableYears.map((year, index) => (
                <SelectItem key={index} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="95%" stopColor="#1a7f37" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
              }
            />
            {/* <YAxis
              domain={[50, "dataMax"]}
              tickFormatter={(tick) => tick}
              tickMargin={8}
              interval={0}
            /> */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="commits"
              type="natural"
              fill="url(#fillMobile)"
              stroke="#1a7f37"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
