import {
	ResponsiveContainer,
	ScatterChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ZAxis,
	Scatter,
	Dot,
	DotProps,
	Cell,
} from "recharts";

type ChartProps = {
	data: unknown[];
	className?: string;
};

const RenderDot: React.FC<DotProps> = ({ cx, cy }) => {
	return <Dot cx={cx} cy={cy} r={1} />;
};

const colors = [
	"fill-red-500",
	"fill-orange-500",
	"fill-yellow-500",
	"fill-lime-500",
	"fill-emerald-500",
	"fill-cyan-500",
	"fill-blue-500",
	"fill-indigo-600",
	"fill-violet-600",
	"fill-purple-400",
	"fill-fuchsia-500",
	"fill-pink-500",
];

export const ScatterPlot: React.FC<ChartProps> = ({ data, className }) => {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<ScatterChart
				margin={{
					top: 20,
					right: 20,
					bottom: 20,
					left: 20,
				}}
				className={className}
			>
				<XAxis
					type="number"
					dataKey="queue"
					name="Queue (s)"
					domain={[3, 1800]}
				/>
				<YAxis
					type="number"
					dataKey="hang"
					name="Hang (s)"
					domain={[3, 3600]}
				/>
				<ZAxis type="number" dataKey="hosload" name="Hour of Shift Load" />
				<Tooltip cursor={{ strokeDasharray: "3 3" }} />
				<Legend />
				<Scatter name="QxH" data={data} className="[&>circle]:radius-[2px]">
					{data.map((entry: any, idx) => (
						<Cell
							key={`cell-${idx}`}
							className={`${colors[entry?.hosload ?? 0]}`}
						/>
					))}
				</Scatter>
			</ScatterChart>
		</ResponsiveContainer>
	);
};
