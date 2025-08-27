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
			text: 'Guides',
			collapsed: false,
			items: [
				{ text: 'Configuring SSO', link: 'sso.md' },
				{ text: 'Using a Reverse Proxy', link: 'reverse-proxy.md' },
				{ text: 'Setting up Automation', link: 'compiling' },

			],
		},
		{
			text: 'Resources',
			collapsed: false,
			items: [
				{ text: 'MFA', link: 'compiling' },
				{ text: 'Client API', link: 'compiling' },

				{ text: 'Access Control (ACLs)', link: 'access-control.md' },
				{ text: 'High Availability', link: 'clustering.md' },

			],
		},
		{
			text: 'Troubleshooting',
			collapsed: false,
			items: [
				{ text: 'Common Issues', link: 'common-issues' },
				{ text: 'Docker', link: 'docker-shell.md' },
				{ text: 'Admin Tools', link: 'docker-shell.md' },
			],
		},
		{

			text: 'Reference',
			collapsed: false,
			items: [
				{ text: 'CLI', link: 'cli-reference.md' },
				{ text: 'Webhooks', link: 'serve-on-subpath' },
				{ text: 'Configuration file', link: 'configuration-file.md' },
				{

					text: 'API', collapsed: true, items: [
						{ text: 'Public Endpoint', link: 'api/public.md' },
						{ text: 'Tunnel/Client', link: 'api/tunnel.md' },
						{ text: 'Management', link: 'api/management.md' },
					],
				},

			],
		}
	]
}
