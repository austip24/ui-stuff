"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import {
	LineChart as ReLineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ReferenceArea,
	ReferenceAreaProps,
	Dot,
	CartesianGrid,
} from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";
import { AxisDomain, AxisDomainItem } from "recharts/types/util/types";
import { Button } from "../../ui/button";

type ChartProps = {
	data: unknown[];
	className?: string;
};

export const LineChart: React.FC<ChartProps> = ({ data, className }) => {
	const [isMouseDown, setIsMouseDown] = useState(false);

	const [initialXDomain] = useState<AxisDomain>([0, "dataMax"]);
	const [initialYDomain] = useState<AxisDomain>([0, "dataMax"]);
	const [initialData] = useState<any>(data);

	// const [xDomain, setXDomain] = useState<AxisDomain>(initialXDomain);
	// const [yDomain, setYDomain] = useState<AxisDomain>(initialYDomain);
	const [chartData, setChartData] = useState<typeof data>(initialData);

	const [refAreaIndices, setRefAreaIndices] = useState<[number, number]>([
		0, 0,
	]);

	const zoomIn = () => {
		// re-initialize refArea managers
		setIsMouseDown(false);
		setChartData(data.slice(refAreaIndices[0], refAreaIndices[1] + 1));
		setRefAreaIndices([0, 0]);
	};

	const zoomOut = () => {
		setChartData(initialData);
		setRefAreaIndices([0, 0]);
	};

	return (
		<>
			<Button onClick={zoomOut}>Zoom Out</Button>
			<ReLineChart
				title="Data"
				width={500}
				height={300}
				data={chartData}
				className={cn("relative", className)}
				onMouseDown={(e) => {
					setRefAreaIndices([
						e.activeTooltipIndex ?? 0,
						e.activeTooltipIndex ?? 0,
					]);
					setIsMouseDown(true);
				}}
				onMouseMove={(e) => {
					if (!isMouseDown) return;

					if (refAreaIndices.includes(e.activeTooltipIndex ?? 0)) return;

					const [x1, x2] = refAreaIndices;

					const activeIndex = e.activeTooltipIndex ?? 0;

					if (activeIndex > x2) {
						setRefAreaIndices([x1, activeIndex]);
					} else if (activeIndex < x1) {
						setRefAreaIndices([activeIndex, x2]);
					} else if (activeIndex > x1 && activeIndex < x2) {
						setRefAreaIndices([activeIndex, x2]);
					}
				}}
				onMouseUp={zoomIn}
			>
				<XAxis
					dataKey="name"
					stroke="currentColor"
					strokeWidth="2"
					fontSize="14"
					className="select-none"
					// domain={xDomain}
				/>
				<CartesianGrid
					strokeDasharray="2 3"
					stroke="currentColor"
					className="opacity-20"
				/>
				<YAxis
					strokeWidth="2"
					dataKey="value"
					stroke="currentColor"
					fontSize="14"
					className="select-none"
					// domain={yDomain}
				/>
				<Tooltip wrapperClassName="border !border-accent rounded-lg !bg-background !text-foreground" />
				<Line
					type="monotone"
					dataKey="value"
					stroke="hsl(217.2 91.2% 59.8%)"
					strokeWidth={2}
					animationDuration={300}
				/>
				{isMouseDown ? (
					<ReferenceArea
						x1={initialData[refAreaIndices[0]]?.name ?? 0}
						x2={initialData[refAreaIndices[1]]?.name ?? 0}
						strokeOpacity={0.3}
					/>
				) : null}
			</ReLineChart>
		</>
	);
};
