import { defineConfig, type DefaultTheme } from 'vitepress'
import pkg from '../../package.json'

export const en = defineConfig({
	lang: 'en-US',
	description: 'MFA, Management and Automation',
	themeConfig: {
		nav: nav(),

		sidebar: {
			'/guide/': { base: '/guide/', items: sidebarGuide() },
		},

		editLink: {
			pattern: 'https://github.com/NHAS/wag-docs/edit/main/:path',
			text: 'Edit this page on GitHub',
		},

		footer: {
			message: 'Released under the MIT License',
		},
	},
})

function nav(): DefaultTheme.NavItem[] {
	return [
		{
			text: 'Guide',
			link: '/guide/what-is-wag',
			activeMatch: '/guide/',
		},

		{
			text: pkg.version,
			items: [
				{
					text: 'Releases',
					link: 'https://github.com/NHAS/wag/releases',
				},
				{
					text: 'New Issue',
					link: 'https://github.com/NHAS/wag/issues/new/choose',
				},
			],
		},
		{
			text: "<img src='https://github.com/NHAS/wag/actions/workflows/test_and_deploy.yml/badge.svg?query=branch%3Amain'/>",
			link: "https://github.com/NHAS/wag/actions?query=branch%3Amain"
		},
	]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'Introduction',
			collapsed: false,
			items: [
				{ text: 'What is Wag?', link: 'what-is-wag' },
				{ text: 'Getting Started', link: 'getting-started' },
			],
		},
		{
			text: 'Installation',
			collapsed: false,
			items: [
				{ text: 'Wag', link: 'hub-installation' },
				{ text: 'Client Deployment', link: 'agent-installation' },
			],
		},
		{
			text: 'Guides',
			collapsed: false,
			items: [
				{ text: 'Basic Operations', link: 'additional-disks' },
				{ text: 'Access Control (ACLs)', link: 'compiling' },
				{ text: 'Choosing MFA', link: 'compiling' },
				{ text: 'Configuring SSO', link: 'compiling' },
				{ text: 'Clustering', link: 'compiling' },
				{ text: 'Errors & Events', link: 'compiling' },
				{ text: 'Using a Reverse Proxy', link: 'compiling' },
			],
		},
		{
			text: 'Troubleshooting',
			collapsed: false,
			items: [
				{ text: 'Common Issues', link: 'common-issues' },
				{ text: 'Docker', link: 'docker-shell.md' },
				{
					text: 'Admin Tools', collapsed: true, items: [
						{ text: 'Generic', link: '/notifications/generic' },

					]
				},

			],
		},
		{

			text: 'Reference',
			collapsed: false,
			items: [
				{ text: 'Configuration file', link: 'serve-on-subpath' },
				{ text: 'CLI', link: 'serve-on-subpath' },
				{

					text: 'API', collapsed: true, items: [
						{ text: 'Registration', link: '/notifications/generic' },
						{ text: 'Tunnel', link: '/notifications/generic' },
						{ text: 'Management', link: '/notifications/generic' },
					],

				},
			],
		}
	]
}
