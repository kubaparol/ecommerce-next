import { Bird } from "lucide-react";
import { type FC } from "react";

export interface LogoProps {}

export const Logo: FC<LogoProps> = (props) => {
	const {} = props;

	return (
		<div className="flex-center rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 p-2 duration-300">
			<Bird />
		</div>
	);
};
