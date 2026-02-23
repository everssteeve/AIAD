// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'AIAD Framework',
			defaultLocale: 'root',
			locales: {
				root: { label: 'Français', lang: 'fr' },
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/everssteeve/AIAD' },
			],
			sidebar: [
				{
					label: 'Framework',
					items: [
						{ label: '01. Préambule', slug: '01-preambule' },
						{ label: '02. Vision & Philosophie', slug: '02-vision-philosophie' },
						{ label: '03. Écosystème', slug: '03-ecosysteme' },
						{ label: '04. Artefacts', slug: '04-artefacts' },
						{ label: '05. Boucles Itératives', slug: '05-boucles-iteratives' },
						{ label: '06. Synchronisations', slug: '06-synchronisations' },
						{ label: '07. Métriques', slug: '07-metriques' },
						{ label: '08. Annexes', slug: '08-annexes' },
					],
				},
				{
					label: 'Rôles',
					items: [
						{ label: 'Vue d\'ensemble', slug: 'roles' },
						{ label: 'Product Manager', slug: 'roles/product-manager' },
						{ label: 'Product Engineer', slug: 'roles/product-engineer' },
						{ label: 'Agents Engineer', slug: 'roles/agents-engineer' },
						{ label: 'QA Engineer', slug: 'roles/qa-engineer' },
						{ label: 'Tech Lead', slug: 'roles/tech-lead' },
					],
				},
				{
					label: 'Artefacts',
					items: [
						{ label: 'Vue d\'ensemble', slug: 'artefacts' },
						{ label: 'PRD', slug: 'artefacts/prd' },
						{ label: 'ARCHITECTURE', slug: 'artefacts/architecture' },
						{ label: 'AGENT-GUIDE', slug: 'artefacts/agent-guide' },
						{ label: 'SPECS', slug: 'artefacts/specs' },
						{ label: 'DoOD', slug: 'artefacts/dood' },
						{ label: 'DoOuD', slug: 'artefacts/dooud' },
					],
				},
				{
					label: 'Métriques',
					items: [
						{ label: 'Vue d\'ensemble', slug: 'metriques' },
						{ label: 'Productivité', slug: 'metriques/productivite' },
						{ label: 'Qualité', slug: 'metriques/qualite' },
						{ label: 'Efficacité IA', slug: 'metriques/efficacite-ia' },
						{ label: 'Outcomes', slug: 'metriques/outcomes' },
						{ label: 'Équipe', slug: 'metriques/equipe' },
					],
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
		react(),
	],
});
