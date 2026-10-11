// Single source of truth for identity, contact and links.
// Empty strings are unverified — fill them in Phase 0 before launch.
// Consumers must hide any action whose link is still empty.

export const site = {
	name: 'Dev Kabir',
	title: 'Senior Web Developer & WordPress Specialist',
	tagline:
		'Building scalable web applications, secure WordPress plugins, and high-performance integrations.',
	location: 'Barisal, Bangladesh',
	workplace: 'WPMU DEV',
	email: 'dev.kabir01@gmail.com',
	availability: 'Open to select consulting & freelance opportunities',
	resume: '/Profile.pdf',
	meeting: '',
	socials: [
		{ label: 'GitHub', url: 'https://github.com/devkabir' },
		{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/dev-kabir' }
	]
};

export type Site = typeof site;
