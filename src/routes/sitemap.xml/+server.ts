import { projects } from '$lib/content';
import { env } from '$env/dynamic/public';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const siteUrl = (env.PUBLIC_SITE_URL || '').replace(/\/+$/, '');

	const urls = [
		{
			loc: siteUrl ? `${siteUrl}/` : '/',
			lastmod: new Date().toISOString().split('T')[0]
		},
		...projects.map((p) => ({
			loc: siteUrl ? `${siteUrl}/projects/${p.slug}` : `/projects/${p.slug}`,
			lastmod: p.date.split('T')[0]
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
	)
	.join('\n')}
</urlset>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
