/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["naszsklep-api.vercel.app"],
	},
	experimental: {
		typedRoutes: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ["@svgr/webpack"],
		});

		return config;
	},
};

module.exports = nextConfig;
