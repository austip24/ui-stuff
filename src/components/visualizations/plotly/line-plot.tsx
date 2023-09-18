"use client";

import dynamic from "next/dynamic";
import { Data } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export const PlotlyLinePlot: React.FC = () => {
	// Dummy data
	const data: Data[] = [
		{
			x: [1, 2, 3, 4, 5],
			y: [5, 4, 3, 2, 1],
			mode: "markers",
			type: "scatter",
			marker: { size: 8, color: "blue" },
			name: "Series 1",
		},
		{
			x: [1, 2, 3, 4, 5],
			y: [1, 2, 3, 4, 5],
			mode: "markers",
			type: "scatter",
			marker: { size: 8, color: "red" },
			name: "Series 2",
		},
	];

	const layout = {
		title: "Dummy Scatter Plot",
		xaxis: { title: "X-Axis" },
		yaxis: { title: "Y-Axis" },
	};
	return (
		<Plot
			className="[&_.main-svg_.infolayer]:!stroke-sky-500 [&_.svg-container:nth-child(0)]:!fill-rose-500"
			data={data}
			layout={layout}
		/>
	);
};
