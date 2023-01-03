/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE_BUNDLE_SIZE === 'true',
	openAnalyzer: process.env.ANALYZE_BUNDLE_SIZE === 'true',
});
const CONSTANTS = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
	/** @type {import('next').NextConfig} */
	const nextConfig = {
		cleanDistDir: true,
		// distDir: 'dist',
		reactStrictMode: true,
		eslint: {
			ignoreDuringBuilds: true,
		},
	};

	if (phase === CONSTANTS.PHASE_PRODUCTION_BUILD) {
		return withBundleAnalyzer(nextConfig);
	}
	return nextConfig;
};
