"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type ProviderProps = {
	children: React.ReactNode;
};

/** ----------------------------------------------------------------
 *								Theme Provider
 * 	----------------------------------------------------------------
 */

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	...props
}) => {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

/** ----------------------------------------------------------------
 *								Query Provider
 * 	----------------------------------------------------------------
 */

type QueryProviderProps = {} & ProviderProps;

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
