"use client";

import { ALL_LOCALES, TolgeeBase } from "./shared";
import { TolgeeProvider, useTolgeeSSR } from "@tolgee/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
	locale: string;
	children: React.ReactNode;
};

const tolgee = TolgeeBase().init();

export const TolgeeNextProvider = ({ locale, children }: Props) => {
	const fakeStaticData = ALL_LOCALES.reduce(
		// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
		(acc, loc) => ({ ...acc, [loc]: {} }),
		{},
	);

	const tolgeeSSR = useTolgeeSSR(tolgee, locale, fakeStaticData);
	const router = useRouter();

	useEffect(() => {
		const { unsubscribe } = tolgeeSSR.on("permanentChange", () => {
			router.refresh();
		});

		return () => unsubscribe();
	}, [tolgeeSSR, router]);

	return (
		<TolgeeProvider
			tolgee={tolgeeSSR}
			options={{ useSuspense: false }}
			fallback="Loading"
		>
			{children}
		</TolgeeProvider>
	);
};
