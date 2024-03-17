import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { type FC } from "react";

export interface HeroTemplateProps {}

export const HeroTemplate: FC<HeroTemplateProps> = (props) => {
	const {} = props;

	return (
		<section className="grid grid-cols-12 grid-rows-2 gap-2 px-8">
			<Card className="col-span-12 max-h-[500px] sm:col-span-4">
				<Image
					removeWrapper
					isZoomed
					alt="Card background"
					className="z-0 h-full w-full object-cover"
					src="/assets/placeholder-1.webp"
				/>
			</Card>

			<Card className="col-span-12 max-h-[500px] sm:col-span-4">
				<Image
					removeWrapper
					isZoomed
					alt="Card background"
					className="z-0 h-full w-full object-cover"
					src="/assets/placeholder-2.webp"
				/>
			</Card>

			<Card className="col-span-12 max-h-[500px] sm:col-span-4">
				<Image
					removeWrapper
					isZoomed
					alt="Card background"
					className="z-0 h-full w-full object-cover"
					src="/assets/placeholder-3.webp"
				/>
			</Card>

			<Card isFooterBlurred className="col-span-12 max-h-[500px] w-full sm:col-span-5">
				<Image
					removeWrapper
					isZoomed
					alt="Relaxing app background"
					className="z-0 h-full w-full object-cover"
					src="/assets/placeholder-4.webp"
				/>
				<CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-100/50 bg-white/30">
					<div>
						<p className="text-tiny text-black">Available soon.</p>
						<p className="text-tiny text-black">Get notified.</p>
					</div>
					<Button className="text-tiny" color="primary" radius="full" size="sm">
						Notify Me
					</Button>
				</CardFooter>
			</Card>

			<Card isFooterBlurred className="col-span-12 max-h-[500px] w-full sm:col-span-7">
				<Image
					removeWrapper
					isZoomed
					alt="Relaxing app background"
					className="z-0 h-full w-full object-cover"
					src="/assets/placeholder-5.webp"
				/>
				<CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 bg-black/40 dark:border-default-100">
					<div className="flex flex-grow items-center gap-2">
						<div className="flex flex-col">
							<p className="text-tiny text-white/60">Breathing App</p>
							<p className="text-tiny text-white/60">Get a good night sleep.</p>
						</div>
					</div>
					<Button radius="full" size="sm">
						Get App
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
};
