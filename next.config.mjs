/** @type {import('next').NextConfig} */
const nextConfig = {
	// Outputs a Single-Page Application (SPA).
	distDir: './build', // Changes the build output directory to `./dist/`.
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
			},
		],
	},
};

export default nextConfig;
