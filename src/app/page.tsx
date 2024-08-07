import { redirect } from "next/navigation";

export async function generateStaticParams() {
	return [{}];
}

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
	redirect("/en");
}
