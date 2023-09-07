"use client";

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
} from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";

type ChartProps = {
	data: unknown[];
	className?: string;
};

export const LineChart: React.FC<ChartProps> = ({ data, className }) => {
	return (
		<ReLineChart
			title="Data"
			width={500}
			height={300}
			data={data}
			className={className}
		>
			<XAxis dataKey="name" hide={true} />
			<YAxis dataKey="value" hide={true} />
			<Tooltip wrapperClassName="border !border-accent rounded-lg !bg-background !text-foreground" />
			<Line
				type="monotone"
				dataKey="value"
				stroke="hsl(217.2 91.2% 59.8%)"
				strokeWidth={2}
				activeDot
			/>
		</ReLineChart>
	);
};
