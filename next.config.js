/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["imagedelivery.net"],
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
