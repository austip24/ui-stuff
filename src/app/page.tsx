import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LineChart } from "@/components/visualizations/re-charts/line-chart";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/api/requests";
import { ChartDashboard } from "@/components/chart-dashboard";

const colors = [
	"bg-red-500",
	"bg-orange-500",
	"bg-yellow-500",
	"bg-lime-500",
	"bg-emerald-500",
	"bg-cyan-500",
	"bg-blue-500",
	"bg-indigo-600",
	"bg-violet-600",
	"bg-purple-400",
	"bg-fuchsia-500",
	"bg-pink-500",
];

const Homepage: React.FC = () => {
	return (
		<main className="flex flex-col gap-2 relative">
			<header className="flex items-center justify-end stick top-0 left-0 right-0 p-2 border-b">
				<ModeToggle />
			</header>
			<div>
				<ChartDashboard />
			</div>
			{/* <Button>Button</Button> */}
			<div className="flex flex-col gap-1 border">
				{colors.map((c, i) => (
					<div
						key={i}
						className="flex gap-2 text-foreground items-center text-sm"
					>
						<div className={`w-16 rounded aspect-[2/1] ${c}`} />
						<div>{c}</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default Homepage;
