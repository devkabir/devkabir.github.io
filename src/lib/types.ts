import type { Component } from 'svelte';

export type ProjectStatus = 'Live' | 'Maintained' | 'Archived' | 'In Development';

/** Frontmatter required in every src/content/projects/*.md file. */
export interface Project {
	slug: string;
	title: string;
	date: string;
	summary: string;
	status: ProjectStatus;
	/** Curated 4:3 carousel thumbnail. */
	thumb: string;
	featured?: boolean;
	draft?: boolean;
	tech?: string[];
	/** Omitted or empty when the link is private — consumers hide the action. */
	demo?: string;
	repo?: string;
	component: Component;
}

export interface Tech {
	name: string;
	category: string;
	/** Evidence label, e.g. "4 years" or "6 projects" — never a proficiency level. */
	evidence: string;
}

export interface Experience {
	company: string;
	role: string;
	start: string;
	/** Omitted while current. */
	end?: string;
	details?: string[];
}

export interface Education {
	institution: string;
	credential: string;
	start: string;
	end?: string;
}
