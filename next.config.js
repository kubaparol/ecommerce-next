/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.graphassets.com",
				port: "",
			},
		],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	redirects: async () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/category/:slug",
				destination: "/category/:slug/1",
				permanent: false,
			},
			{
				source: "/collection/:slug",
				destination: "/collection/:slug/1",
				permanent: false,
			},
			{
				source: "/search",
				destination: "/search/1",
				permanent: false,
				has: [
					{
						type: "query",
						key: "query",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
