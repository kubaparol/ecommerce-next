"use client";

export default function ErrorPage({
	error,
	// reset,
}: {
	error: Error & { digest: string };
	reset: () => void;
}) {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="text-center">
				<h1 className="mb-4 text-4xl font-bold">Error {error.digest}</h1>
				<p className="text-xl">Sorry, there was an error.</p>
			</div>
		</div>
	);
}
