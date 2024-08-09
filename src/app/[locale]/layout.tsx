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

	return (
		<html lang={locale}>
			<body>
				<TolgeeNextProvider locale={locale}>{children}</TolgeeNextProvider>
			</body>
		</html>
	);
}
