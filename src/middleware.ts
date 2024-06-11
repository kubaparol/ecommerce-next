import { authMiddleware } from "@clerk/nextjs";

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default authMiddleware({
	publicRoutes: [
		"/cart",
		"/category/(.*)",
		"/collection/(.*)",
		"/product/(.*)",
		"/products",
		"/search/(.*)",
		"/",
	],
});
