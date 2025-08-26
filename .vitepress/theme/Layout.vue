<!-- docs/.vitepress/theme/Layout.vue -->
<script setup lang="ts">
import './style.css'
import DefaultTheme from 'vitepress/theme'
import HomeImages from './components/home-images.vue'

</script>

<template>
	<DefaultTheme.Layout>
		<template #home-hero-image>
			<HomeImages />
		</template>
	</DefaultTheme.Layout>
</template>
