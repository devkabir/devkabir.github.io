// Single source of truth for identity, contact and links.
// Empty strings are unverified — fill them in Phase 0 before launch.
// Consumers must hide any action whose link is still empty.

export const site = {
	name: 'Dev Kabir',
	// TODO(phase-0): professional designation
	title: '',
	// TODO(phase-0): short tagline
	tagline: '',
	location: 'Barisal, Bangladesh',
	workplace: 'WPMU DEV',
	// TODO(phase-0): confirm the public-facing address (account email used as the default)
	email: 'kabir.signup@gmail.com',
	// TODO(phase-0): availability status text
	availability: '',
	// TODO(phase-0): path to the resume PDF in /static
	resume: '',
	// TODO(phase-0): meeting booking URL
	meeting: '',
	socials: [
		// TODO(phase-0): real profile URLs; a social is rendered only when url is set
		{ label: 'GitHub', url: '' },
		{ label: 'LinkedIn', url: '' }
	]
};

export type Site = typeof site;
