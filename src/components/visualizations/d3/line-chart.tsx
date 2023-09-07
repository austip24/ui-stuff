"use client";

import { cn } from "@/lib/utils";
import * as d3 from "d3";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { useMousePosition } from "@/lib/hooks/useMousePosition";

export type PlotConfigurations = {
	data: [number, number][];
	type: "line" | "scatter";
	lineClassName?: string;
};

export type PlotTitle = string;

type D3LineChartProps = {
	plots: Record<PlotTitle, PlotConfigurations>;
	chartTitle?: string;
	xTitle?: string;
	yTitle?: string;
};

const colors = [
	"text-blue-500",
	"text-yellow-500",
	"text-emerald-500",
	"text-red-500",
	"text-lime-500",
	"text-orange-500",
	"text-cyan-500",
	"text-indigo-600",
	"text-violet-600",
	"text-purple-400",
	"text-fuchsia-500",
	"text-pink-500",
];

// const textColors = colors.map((c) => `text-${c}`);
// const borderColors = colors.map((c) => `border-${c}`);

export const D3LineChart: React.FC<D3LineChartProps> = ({
	plots,
	chartTitle,
	xTitle,
	yTitle,
}) => {
	const [ref, bounds] = useMeasure();

	return (
		<div ref={ref} className="relative h-full grow">
			{bounds.width > 0 && (
				<ChartInner
					plots={plots}
					width={bounds.width}
					height={bounds.height}
					chartTitle={chartTitle}
					xTitle={xTitle}
					yTitle={yTitle}
				/>
			)}
		</div>
	);
};

type ChartInnerProps = {
	plots: Record<PlotTitle, PlotConfigurations>;
	width: number;
	height: number;
	chartTitle?: string;
	xTitle?: string;
	yTitle?: string;
};

const ChartInner: React.FC<ChartInnerProps> = ({
	plots,
	width,
	height,
	chartTitle,
	xTitle,
	yTitle,
}) => {
	const [hoveredData, setHoveredData] = useState<[number, number, number]>([
		0, 0, 0,
	]);
	const [tooltipRef, tooltipBounds] = useMeasure();
	const [chartTitleRef, chartTitleBounds] = useMeasure();
	const [xAxisTitleRef, xAxisTitleBounds] = useMeasure();
	const [yAxisTitleRef, yAxisTitleBounds] = useMeasure();
	const [showTooltip, setShowTooltip] = useState(false);
	const [chartRef, chartBounds] = useMeasure();
	const [yAxisLabelRef, yAxisLabelBounds] = useMeasure();
	const [xAxisLabelRef, xAxisLabelBounds] = useMeasure();
	const data = useMemo(() => Object.values(plots).map((p) => p.data), [plots]);
	const types = useMemo(() => Object.values(plots).map((p) => p.type), [plots]);

	// const x = data.map((d) => d[0]);
	const x = data.flat().map((d) => d[0]);
	// const y = data.map((d) => d[1]);
	const y = data.flat().map((d) => d[1]);

	const margin = {
		top: 60,
		right: 60,
		left: 60,
		bottom: 60,
	};

	const xScale = d3
		.scaleLinear()
		.domain([d3.min(x) ?? 0, d3.max(x) ?? 10])
		.range([margin.left, width - margin.right]);

	const yScale = d3
		.scaleLinear()
		.domain([d3.min(y) ?? 0, d3.max(y) ?? 10])
		.range([height - margin.bottom, margin.top]);

	// const yTicks = yScale.ticks()

	const line = d3
		.line()
		.x((d) => xScale(d[0]))
		.y((d) => yScale(d[1]))
		.curve(d3.curveMonotoneX);

	const lines = Object.values(data).map((d, i) => {
		if (types[i] === "line") return line(d) ?? "";
		return "";
	});
	// .curve(d3.curveLinear);
	// const d = line(data) ?? "";

	// const classNames = Object.values(lineClassNames ?? {});

	return (
		<>
			<svg
				ref={chartRef}
				className="bg-background border"
				viewBox={`0 0 ${width} ${height}`}
			>
				{/* Title */}
				<text
					ref={chartTitleRef}
					alignmentBaseline="middle"
					textAnchor="center"
					className="text-[24px]"
					fill="currentColor"
					transform={`translate(${
						xScale((d3.max(x) ?? 10 - (d3.min(x) ?? 10)) / 2) -
						chartTitleBounds.width / 2
					}, ${chartTitleBounds.height})`}
				>
					{chartTitle}
				</text>

				{/* Y Axis Title */}
				<text
					ref={yAxisTitleRef}
					className="text-[16px]"
					alignmentBaseline="middle"
					textAnchor="middle"
					transform={`translate(${
						margin.left - yAxisTitleBounds.height / 2 - 5
					}, ${yScale((d3.max(y) ?? 10 - (d3.min(y) ?? 10)) / 2)}) rotate(-90)`}
					fill="currentColor"
				>
					{yTitle}
				</text>

				{/* X Axis Title */}
				<text
					ref={xAxisTitleRef}
					className="text-[16px] text-center"
					alignmentBaseline="middle"
					textAnchor="middle"
					fill="currentColor"
					transform={`translate(${xScale(
						(d3.max(x) ?? 10 - (d3.min(x) ?? 10)) / 2
					)}, ${height - xAxisTitleBounds.height})`}
				>
					{xTitle}
				</text>

				{/* Y Scale */}
				{yScale.ticks(5).map((max) => (
					<g
						transform={`translate(0,${yScale(max)})`}
						key={max}
						className="text-foreground"
					>
						<line
							strokeDasharray="2,4"
							x1={margin.left}
							x2={width - margin.right}
							stroke="currentColor"
							className="text-slate-300 dark:text-slate-700"
						/>
						<text
							ref={yAxisLabelRef}
							transform={`translate(${
								margin.left - yAxisLabelBounds.width + 3
							}, 0)`}
							alignmentBaseline="middle"
							textAnchor="middle"
							fill="currentColor"
							className="text-[12px]"
						>
							{max}
						</text>
					</g>
				))}

				{/* Y Axis */}
				<g transform={`translate(${xScale(0)},${height})`}>
					<line
						y1={-height + yScale(0)}
						y2={-height + margin.top}
						stroke="currentColor"
						className="text-foreground"
					/>
				</g>

				{/* X Scale */}
				{xScale.ticks(5).map((max) => {
					if (max === 0) return;
					return (
						<g
							transform={`translate(${xScale(max)},${height})`}
							key={max}
							className="text-accent"
						>
							<line
								strokeDasharray="2,3"
								// y1={margin.top}
								// y2={margin.top - margin.bottom - height}
								y1={-height + yScale(0)}
								y2={-height + margin.top}
								alignmentBaseline="middle"
								stroke="currentColor"
								className="text-slate-300 dark:text-slate-700"
							/>
							<text
								ref={xAxisLabelRef}
								transform={`translate(0, ${
									yScale(0) - height + xAxisLabelBounds.height / 2 + 5
								})`}
								fill="currentColor"
								className="text-[12px] text-foreground"
								textAnchor="middle"
								alignmentBaseline="middle"
							>
								{max}
							</text>
						</g>
					);
				})}

				{/* X Axis */}
				<line
					x1={xScale(0)}
					x2={xScale(d3.max(x) ?? 10)}
					y1={yScale(0)}
					y2={yScale(0)}
					stroke="currentColor"
					className="text-foreground"
				/>

				{/* Line */}
				{lines.map((d, colorIdx) => (
					<path
						key={`line_${colorIdx}`}
						d={d}
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						className={cn(
							"text-primary",
							Object.values(plots)[colorIdx]?.lineClassName ?? colors[colorIdx]
						)}
					/>
				))}

				{/* Circles */}
				{Object.values(data).map((dataset, colorIdx) => {
					return dataset.map((d) => (
						<circle
							onMouseEnter={() => {
								setHoveredData([...d, colorIdx]);
								setShowTooltip(true);
							}}
							onMouseLeave={() => setShowTooltip(false)}
							className={cn(
								"text-primary stroke-background hover:stroke-foreground",
								Object.values(plots)[colorIdx]?.lineClassName ??
									colors[colorIdx]
							)}
							strokeWidth="2"
							fill="currentColor"
							key={d[0]}
							r="5"
							cx={xScale(d[0])}
							cy={yScale(d[1])}
						/>
					));
				})}
			</svg>
			<div
				ref={tooltipRef}
				className={cn(
					"absolute bg-background border p-2 rounded-lg flex flex-col gap-2 text-xs shadow invisible",
					showTooltip && "visible",
					colors[hoveredData[2]],
					"border-current"
				)}
				style={{
					left:
						xScale(hoveredData[0] ?? 0) + 10 + tooltipBounds.width >
						chartBounds.width
							? chartBounds.width - tooltipBounds.width - 10 - margin.right
							: xScale(hoveredData[0] ?? 0) + 10,
					top:
						yScale(hoveredData[1] ?? 0) - tooltipBounds.height > 0
							? yScale(hoveredData[1] ?? 0) - tooltipBounds.height
							: yScale(hoveredData[1] ?? 0),
				}}
			>
				<span className="text-foreground">x: {hoveredData[0].toFixed(2)}</span>
				<span className="text-foreground">y: {hoveredData[1].toFixed(2)}</span>
			</div>
		</>
	);
};
