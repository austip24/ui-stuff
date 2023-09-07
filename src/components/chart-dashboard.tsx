"use client";

import { useQuery } from "@tanstack/react-query";
import { LineChart } from "./visualizations/line-chart";
import { getData, getHaulageData } from "@/lib/api/requests";
import { ScatterPlot } from "./visualizations/scatter-plot";
import { D3LineChart } from "./visualizations/d3/line-chart";
import { Card, Title, Text, ScatterChart } from "@tremor/react";

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
			<div className="w-[800px] h-52">
				<D3LineChart
					plots={{
						"Dataset 1": {
							data: [
								[0, 10],
								[5, 50],
								[15, 75],
								[55, 100],
								[75, 10],
								[100, 5],
								[120, 50],
								[140, 100],
								[170, 90],
							],
							type: "line",
						},
						"Dataset 2": {
							data: [
								[0, 20],
								[10, 40],
								[20, 40],
								[40, 90],
								[60, 100],
								[100, 30],
								[130, 60],
								[140, 90],
								[170, 40],
							],
							type: "line",
						},
						"Dataset 3": {
							data: [
								[0, 60],
								[10, 20],
								[30, 40],
								[60, 90],
								[70, 100],
								[90, 30],
								[120, 70],
								[150, 100],
								[170, 100],
							],
							type: "line",
						},
					}}
					// lineClassNames={{
					// 	"Dataset 1": "text-blue-500",
					// 	"Dataset 2": "text-emerald-500",
					// 	"Dataset 3": "text-yellow-500",
					// }}
					chartTitle="Chart With Dummy Data"
					xTitle="X Axis (s)"
					yTitle="Y Axis (s)"
				/>
				{/* <div className="w-full h-full">
					<D3LineChart
						plots={{
							"plot 1": {
								data: [
									[0, 0],
									[1, 3],
									[2, 6],
								],
								type: "line",
							},
						}}
						chartTitle="Some Points"
						xTitle="X Axis"
						yTitle="Y Axis"
					/>
				</div> */}
			</div>
			<div className="w-[800px] h-52">
				<D3LineChart
					plots={{
						"Dataset 1": {
							data: [
								[0, 10],
								[5, 50],
								[15, 75],
								[55, 100],
								[75, 10],
								[100, 5],
								[120, 50],
								[140, 100],
								[170, 90],
							],
							type: "line",
						},
						"Dataset 2": {
							data: [
								[0, 20],
								[10, 40],
								[20, 40],
								[40, 90],
								[60, 100],
								[100, 30],
								[130, 60],
								[140, 90],
								[170, 40],
							],
							type: "line",
						},
						"Dataset 3": {
							data: [
								[0, 60],
								[10, 20],
								[30, 40],
								[60, 90],
								[70, 100],
								[90, 30],
								[120, 70],
								[150, 100],
								[170, 100],
							],
							type: "line",
						},
					}}
					// lineClassNames={{
					// 	"Dataset 1": "text-blue-500",
					// 	"Dataset 2": "text-emerald-500",
					// 	"Dataset 3": "text-yellow-500",
					// }}
					chartTitle="Chart With Dummy Data"
					xTitle="X Axis (s)"
					yTitle="Y Axis (s)"
				/>
				{/* <div className="w-full h-full">
					<D3LineChart
						plots={{
							"plot 1": {
								data: [
									[0, 0],
									[1, 3],
									[2, 6],
								],
								type: "line",
							},
						}}
						chartTitle="Some Points"
						xTitle="X Axis"
						yTitle="Y Axis"
					/>
				</div> */}
			</div>

			{/* <LineChart data={data} className="border" />
			<ScatterPlot data={haulageData} className="border" /> */}
		</section>
	);
};
