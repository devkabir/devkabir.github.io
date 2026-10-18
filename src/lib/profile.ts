import type { Experience, Education, Tech, Highlight } from './types';

export const specializations: string[] = [
	'WordPress/WooCommerce',
	'Shopify Apps',
	'Security',
	'AI/Agent Integration'
];

export const highlights: Highlight[] = [
	{
		label: 'Created open-source CORS error-solving plugin adopted by 6,000+ websites worldwide',
		source: 'https://wordpress.org/plugins/enable-cors/'
	},
	{
		label: 'Delivered 38+ custom WordPress plugins with consistent 5-star client ratings',
		source: ''
	},
	{
		label: 'Migrated 60K+ lines of code to Vue 3 Composition API at WPMU DEV',
		source: ''
	}
];

export function formatPeriod(start: string, end?: string): string {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const format = (ym: string) => {
		const [year, m] = ym.split('-');
		return `${months[parseInt(m, 10) - 1]} ${year}`;
	};
	return `${format(start)} – ${end ? format(end) : 'Present'}`;
}

export const bio = {
	intro:
		'I build WordPress plugins and API integrations in PHP and JavaScript. At WPMU DEV, I work on Defender and Beehive and have migrated 60K+ lines of code to Vue 3 Composition API. I also created Enable CORS, an open-source plugin adopted by 6,000+ websites.',
	longBio: `I am a Senior Web Developer and WordPress Specialist. I build web applications and WordPress plugins. At WPMU DEV, I work on Defender (security) and Beehive (analytics), including migrating 60K+ lines of code to Vue 3 Composition API and shipping updates through automated CI/CD pipelines.

I have also delivered over 38 custom plugins on Fiverr with consistent 5-star ratings, mostly REST API integrations connecting WooCommerce with payment gateways, CRMs, and external shipping providers. I maintain open-source plugins too, including a CORS plugin adopted by over 6,000 websites.

I work in PHP, WordPress plugin architecture, JavaScript (React, Vue 3), Node.js, and MySQL.`
};

export const experiences: Experience[] = [
	{
		company: 'WPMU DEV',
		role: 'WordPress Plugin Developer',
		start: '2024-03',
		details: [
			'Migrated core plugin architecture from Vue 2 to Vue 3 (Composition API), modernizing codebase and reducing technical debt across 60K+ lines of code.',
			'Contributed to Defender (security) and Beehive (analytics) — plugins serving tens of thousands of active users.',
			'Regularly shipped incremental updates, bug fixes, and UX improvements in a CI/CD pipeline with peer code reviews.',
			'Collaborated with a distributed international team following open-source best practices.'
		]
	},
	{
		company: 'WordPress (Open Source & Independent)',
		role: 'Plugin Developer',
		start: '2022-01',
		details: [
			'Created an open-source CORS error-solving plugin adopted by 6,000+ websites worldwide.',
			'Engaged with the WordPress open-source community by providing continuous maintenance, documentation, and user support.'
		]
	},
	{
		company: 'Fiverr',
		role: 'WordPress Plugin Developer (Freelance)',
		start: '2020-01',
		details: [
			'Delivered 38+ custom WordPress plugins with consistent 5-star client ratings.',
			'Specialized in WooCommerce integrations connecting stores with third-party REST APIs (payment gateways, CRMs, shipping providers).',
			'Designed APIs and data synchronization between WooCommerce stores and external platforms.',
			'Diagnosed and resolved e-commerce API issues for international clients, working fully remote.'
		]
	}
];

export const educations: Education[] = [
	{
		institution: 'IDB-BISEW IT Scholarship project',
		credential: 'Diploma in Web Application Development (Laravel, React, Vue.js & WordPress)',
		start: '2018-08',
		end: '2019-08'
	}
];

export const techStack: Tech[] = [
	{
		name: 'PHP / WordPress',
		category: 'Backend',
		evidence: '5+ years, 38+ custom plugins & WPMU DEV products',
		icon: 'php'
	},
	{
		name: 'REST APIs & Integrations',
		category: 'Backend',
		evidence: 'WooCommerce third-party integrations & custom APIs',
		icon: 'api'
	},
	{
		name: 'Node.js',
		category: 'Backend',
		evidence: 'Custom tooling and API development',
		icon: 'nodedotjs'
	},
	{
		name: 'Vue 3 / Vue 2',
		category: 'Frontend',
		evidence: '60K+ LOC migration at WPMU DEV',
		icon: 'vuedotjs'
	},
	{
		name: 'React.js',
		category: 'Frontend',
		evidence: 'IDB-BISEW diploma & custom web applications',
		icon: 'react'
	},
	{
		name: 'Tailwind CSS / CSS3',
		category: 'Frontend',
		evidence: 'Modern web applications & UI components',
		icon: 'tailwindcss'
	},
	{
		name: 'JavaScript / TypeScript',
		category: 'Languages',
		evidence: '5+ years across all web & plugin projects',
		icon: 'javascript'
	},
	{
		name: 'MySQL',
		category: 'Database',
		evidence: '5+ years backend data modeling & performance optimization',
		icon: 'mysql'
	}
];
