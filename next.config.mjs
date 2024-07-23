// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/login',
                has: [
                    {
                        type: 'cookie',
                        key: 'session',
                    },
                ],
                destination: '/',
                permanent: false,
            },
        ];
    },
    experimental: {
        output: 'export',
    },
};

export default nextConfig;