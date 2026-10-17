// Single source of truth for identity, contact and links.
// Empty strings are unverified — fill them in Phase 0 before launch.
// Consumers must hide any action whose link is still empty.

export const site = {
	name: 'Dev Kabir',
	title: 'Senior Web Developer & WordPress Specialist',
	tagline: 'Building web applications, WordPress plugins, and WooCommerce integrations.',
	location: 'Barisal, Bangladesh',
	workplace: 'WPMU DEV',
	email: 'dev.kabir01+portfolio@gmail.com',
	availability: 'Open to select consulting & freelance opportunities',
	resume: '/Profile.pdf',
	meeting: '',
	avatar:
		'https://gravatar.com/avatar/32df0955a7eb0afc0f11799622fe8dc4ad85a7235a32488497ec38a2d163e923?s=336',
	socials: [
		{ label: 'GitHub', url: 'https://github.com/devkabir' },
		{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/dev-kabir' }
	]
};

export type Site = typeof site;
