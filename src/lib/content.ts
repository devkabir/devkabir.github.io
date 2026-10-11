import { dev } from '$app/environment';
import type { Project } from './types';

const required = ['title', 'date', 'summary', 'problem', 'status', 'thumb'] as const;

const files = import.meta.glob('/src/content/projects/*.md', { eager: true }) as Record<
	string,
	{ default: any; metadata: Record<string, any> }
>;

export const projects: Project[] = Object.entries(files)
	.map(([path, mod]) => {
		const slug = path.split('/').pop()!.replace('.md', '');
		for (const key of required) {
			if (!mod.metadata?.[key]) throw new Error(`${slug}: missing "${key}"`);
		}
		return { slug, ...mod.metadata, component: mod.default } as Project;
	})
	.filter((p) => dev || !p.draft)
	.sort((a, b) => +new Date(b.date) - +new Date(a.date));
