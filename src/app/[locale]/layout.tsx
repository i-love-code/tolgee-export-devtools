import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { TolgeeNextProvider } from "@/tolgee/client";
import { ALL_LOCALES, getStaticData } from "@/tolgee/shared";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
	children: ReactNode;
	params: { locale: string };
};

export default async function LocaleLayout({
	children,
	params: { locale },
}: Props) {
	unstable_setRequestLocale(locale);

	if (!ALL_LOCALES.includes(locale)) {
		notFound();
	}

	// it's important you provide all data which are needed for initial render
	// so current locale and also fallback locales + necessary namespaces
	const locales = await getStaticData(["en", locale]);

	return (
		<html lang={locale}>
			<body>
				<TolgeeNextProvider locale={locale} locales={locales}>
					{children}
				</TolgeeNextProvider>
			</body>
		</html>
	);
}
