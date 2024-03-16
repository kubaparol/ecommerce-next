import Link from "next/link";
import { type FC } from "react";
import { Button } from "../ui/button";
import { ProjectUrls } from "@/constants";

export interface HeroTemplateProps {}

export const HeroTemplate: FC<HeroTemplateProps> = (props) => {
	const {} = props;

	return (
		<section className="grid flex-1 place-items-center">
			<Button size="lg" asChild className="button w-full sm:w-fit">
				<Link href={ProjectUrls.products}>Explore Now</Link>
			</Button>
		</section>
	);
};
