import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="grid flex-1 place-items-center p-4">
			<SignUp />
		</div>
	);
}
