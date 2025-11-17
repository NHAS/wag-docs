import { defineConfig } from 'vitepress'
import { shared } from './shared.ts'
import { en } from './en.ts'

import { withMermaid } from "vitepress-plugin-mermaid";



export default withMermaid({
	...shared,
	locales: {
		root: { label: 'English', ...en },
	},
})
