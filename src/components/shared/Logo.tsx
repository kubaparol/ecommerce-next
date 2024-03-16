import { Bird } from "lucide-react";
import { type FC } from "react";

export interface LogoProps {}

export const Logo: FC<LogoProps> = (props) => {
	const {} = props;

	return (
		<div className="flex-center rounded-full border p-2">
			<Bird />
		</div>
	);
};
