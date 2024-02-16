import Link from "next/link";
import { type FC } from "react";
import NextImage from "next/image";
import { Button } from "../ui/button";
import { ProjectUrls } from "@/constants";

export interface HeroTemplateProps {}

export const HeroTemplate: FC<HeroTemplateProps> = (props) => {
	const {} = props;

	return (
		<section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
			<div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
				<div className="flex flex-col justify-center gap-8">
					<h1 className="h1-bold">Discover Unique Artworks</h1>

					<p className="p-regular-20 md:p-regular-24">
						Join a community of craft enthusiasts.
						<br />
						Buy unique items or sell your own creations.
					</p>

					<Button size="lg" asChild className="button w-full sm:w-fit">
						<Link href={ProjectUrls.products}>Explore Now</Link>
					</Button>
				</div>

				<NextImage
					src="/assets/hero.webp"
					alt="Hero"
					width={1000}
					height={1000}
					priority
					className="max-h-[70vh] rotate-2 rounded-full object-cover object-center shadow-2xl 2xl:max-h-[50vh]"
				/>
			</div>
		</section>
	);
};
