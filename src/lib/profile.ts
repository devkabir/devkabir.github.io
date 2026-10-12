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
		'Senior Web Developer and WordPress Specialist with over 5 years of experience building scalable web applications and fast, reliable WordPress plugins. Currently developing and maintaining enterprise-scale plugins at WPMU DEV, including Defender and Beehive, serving tens of thousands of active sites. Focused on clean code, robust performance, and seamless user experiences across complex web solutions.',
	longBio: `I am a Senior Web Developer and WordPress Specialist with extensive experience architecting scalable web applications and modern WordPress plugins. At WPMU DEV, I engineer key plugins including Defender (security) and Beehive (analytics), modernizing legacy codebases—such as migrating 60K+ lines of code to Vue 3 Composition API—and shipping continuous improvements via automated CI/CD pipelines.

Beyond product engineering, I have delivered over 38 custom plugins on Fiverr with consistent 5-star ratings, specializing in REST API integrations connecting WooCommerce with payment gateways, CRMs, and external shipping providers. I also develop and maintain open-source community solutions, including a CORS resolution plugin adopted by over 6,000 websites worldwide.

My core technical foundation spans modern PHP, WordPress plugin architecture, JavaScript (React, Vue 3), Node.js, and relational database optimization with MySQL.`
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
			'Designed secure, scalable APIs and ensured reliable data synchronization between WooCommerce stores and external platforms.',
			'Diagnosed and resolved complex e-commerce API issues for international clients in fully remote settings.'
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
