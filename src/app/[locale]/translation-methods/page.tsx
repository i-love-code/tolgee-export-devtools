import { getLocale, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import { Navbar } from "@/components/Navbar";
import { ALL_LOCALES, getStaticData } from "@/tolgee/shared";
import { TolgeeNextProvider } from "@/tolgee/client";

import { TranslationMethodsServer } from "./TranslationMethodsServer";
import { TranslationMethodsClient } from "./TranslationMethodsClient";

export async function generateStaticParams() {
	return ALL_LOCALES.map((locale) => ({ locale: locale }));
}

export default async function TranslationMethods({
	params: { locale },
}: { params: { locale: string } }) {
	unstable_setRequestLocale(locale);

	return (
		<TolgeeNextProvider locale={locale}>
			<main className="translation-methods">
				<Navbar>
					<div slot="menu-items">
						<Link href="/">The example app</Link>
					</div>
				</Navbar>
				<TranslationMethodsClient />
				<TranslationMethodsServer />
			</main>
		</TolgeeNextProvider>
	);
}
