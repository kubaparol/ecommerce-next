import { type PropsWithChildren, type FC } from "react";
import { Footer } from "@/components/UI/Footer/Footer";
import { Header } from "@/components/UI/Header/Header";

export interface DefaultLayoutProps extends PropsWithChildren {}

export const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
	const { children } = props;

	return (
		<div className="">
			<Header />
			<main className="bg-zinc-100 p-4">
				<div className="mx-auto min-h-[calc(100vh_-_112px)] max-w-[1400px]">{children}</div>
			</main>
			<Footer />
		</div>
	);
};
