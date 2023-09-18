"use client";

import { Popover, PopoverTrigger } from "./ui/popover";

type ChartPopoverProps = {
  className?: string;
	options: string[];
};

export const ChartPopover: React.FC<ChartPopoverProps> = ({ className, options }) => {
	return (
		<Popover>
      <PopoverTrigger>
        
      </PopoverTrigger>
		</Popover>
	);
};
