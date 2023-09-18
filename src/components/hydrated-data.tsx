import { getData } from "@/lib/api/requests";
import getQueryClient from "@/lib/get-query-client";
import { Hydrate, dehydrate } from "@tanstack/react-query";

type HydratedDataProps = {
	children: React.ReactNode;
};

export const HydratedData: React.FC<HydratedDataProps> = async ({
	children,
}) => {
	// get query client
	const queryClient = getQueryClient();

	// prefetch all data. you can do perform multiple requests
	// await queryClient.prefetchQuery(["haulage-data"], getHaulageData);
	await queryClient.prefetchQuery(["data"], getData);

	// dehydrate state and send it to client
	const dehydratedState = dehydrate(queryClient);

	return <Hydrate state={dehydratedState}>{children}</Hydrate>;
};
