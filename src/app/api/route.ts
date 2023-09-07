import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
	const data = [
		{ name: 100, value: 150 },
		{ name: 200, value: 200 },
		{ name: 300, value: 350 },
		{ name: 400, value: 300 },
		{ name: 500, value: 500 },
	];

	return NextResponse.json(data);
};
