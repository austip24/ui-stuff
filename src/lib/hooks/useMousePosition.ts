import { useState, useEffect, createRef, RefObject } from "react";

export type MousePosition = {
	x: number;
	y: number;
};

export const useMousePosition = (
	parentRef: RefObject<HTMLElement>
): MousePosition => {
	const [position, setPosition] = useState<MousePosition>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!parentRef.current) return;

			const parentRect = parentRef.current.getBoundingClientRect();
			const x = e.clientX - parentRect.left;
			const y = e.clientY - parentRect.top;
			setPosition({ x, y });
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [parentRef]);

	return position;
};
