import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
	title: 'Wag',

	appearance: 'dark',
	lastUpdated: true,
	cleanUrls: true,
	ignoreDeadLinks: 'localhostLinks',
	rewrites: {
		'en/:rest*': ':rest*',
	},
	head: [
		['link', { rel: 'icon', type: 'image/png', href: '/icon.png' }],
		['meta', { property: 'og:type', content: 'website' }],
		['meta', { property: 'og:site_name', content: 'Wag' }],
		['meta', { property: 'og:title', content: 'Wag | Management and MFA for Wireguard' }],
		// ['meta', { property: 'og:url', content: 'https://wag.dev' }],
		// ['meta', { property: 'og:image', content: 'https://wag.dev/image/social.png' }],
	],
	themeConfig: {

		logo: '/icon.png',
		search: {
			provider: 'local',
			options: {
			},
		},

		editLink: {
			pattern: 'https://github.com/NHAS/wag-docs/edit/main/:path',
		},

		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Guide', link: '/guide/what-is-wag' },
		],

		sidebar: [
			{
				text: 'Introduction',
				items: [
					{ text: 'What is Wag?', link: '/guide/what-is-wag' },
					{ text: 'Getting Started', link: '/guide/getting-started' },
				],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/NHAS/wag' },
		],

		footer: {
			message: 'Released under the MIT License',
		},
	},
})
