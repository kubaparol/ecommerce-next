import { Skeleton } from "@nextui-org/react";

export default function LoadingPage() {
	return (
		<div className="p-5 md:p-10">
			<div className="p-5 md:p-10">
				<ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
					{Array.from({ length: 8 }, (_, i) => (
						<li key={i} className="animate-pulse">
							<Skeleton />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
