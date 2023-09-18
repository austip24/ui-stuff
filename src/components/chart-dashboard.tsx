"use client";

import { useQuery } from "@tanstack/react-query";
import { LineChart } from "./visualizations/re-charts/line-chart";
import { getData } from "@/lib/api/requests";
import { ScatterPlot } from "./visualizations/re-charts/scatter-plot";
import { Chart } from "./visualizations/d3/chart";
import { Card, Title, Text, ScatterChart } from "@tremor/react";
import { PlotlyLinePlot } from "./visualizations/plotly/line-plot";
import { ChartjsLineChart } from "./visualizations/chart-js/line-chart";
import colors from 'tailwindcss/colors'
import { ChartOptions } from "chart.js";

const initialOptions: ChartOptions<"line"> = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
			font: {
				size: 18,
			},
			color: colors.slate["50"],
		},
	},
};

type ChartDashboardProps = {};

export const ChartDashboard: React.FC<ChartDashboardProps> = () => {
	const { data } = useQuery({
		queryKey: ["data"],
		queryFn: getData,
	});

	// const { data: haulageData } = useQuery({
	// 	queryKey: ["haulage-data"],
	// 	queryFn: getHaulageData,
	// });

	// console.log(data);

	return (
		<section className="w-full h-full flex flex-col items-center justify-center">
			{/* <LineChart data={data} className="" /> */}
			{/* <ScatterPlot data={haulageData} className="border" /> */}
			{/* <PlotlyLinePlot /> */}
			<ChartjsLineChart />
		</section>
	);
};
