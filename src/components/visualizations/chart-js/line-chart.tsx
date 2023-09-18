"use client";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	type ChartOptions,
	type ChartData,
} from "chart.js";
// import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";
import colors from "tailwindcss/colors";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

const initialOptions: ChartOptions<"line"> = {
	maintainAspectRatio: false,
	animation: {
		duration: 750,
	},
	scales: {
		y: {
			min: 0,
      max: 100,
      ticks: {
        color: colors.slate['50'] 
      },
      grid: {
        color: colors.slate['100']
      }
    },
	},
	plugins: {
		legend: {
			position: "top" as const,
		},
		zoom: {
			pan: {
				enabled: true,
				mode: "x",
				modifierKey: "ctrl",
			},
			zoom: {
				drag: {
					enabled: true,
					backgroundColor: "rgba(100,116,139, 0.3)",
				},
				mode: "x",
			},
		},
	},
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data: ChartData<"line"> = {
	labels,
	datasets: [
		{
			label: "Dataset 1",
			data: labels.map(() => Math.random() * 100),
			backgroundColor: colors.blue["300"],
			borderColor: colors.blue["600"],
		},
	],
};

export const ChartjsLineChart: React.FC = () => {
	const [options, setOptions] = useState(initialOptions);

	useEffect(() => {
		const loadClientDependencies = async () => {
			const zoomPlugin = (await import("chartjs-plugin-zoom")).default;

			ChartJS.register(
				zoomPlugin // add zoom plugin
			);
			console.log("zoom plugin loaded");
		};

		loadClientDependencies();
	}, []);

	return (
		<Card className="w-full max-w-5xl mx-auto">
			<CardHeader>
				<CardTitle>Chart.js Line Chart</CardTitle>
				<CardDescription>Some dummy data to be displayed...</CardDescription>
			</CardHeader>
			{/* <ChartPopover options={[]} /> */}
			<CardContent className="relative w-full h-80 text-primary">
				<Line className="w-full text-current" options={options} data={data} />
			</CardContent>
		</Card>
	);
};
