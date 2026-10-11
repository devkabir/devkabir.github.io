// src/lib/track.ts
export const track = (name: string, params?: Record<string, string>) => {
	try {
		(window as any).gtag?.('event', name, params);
	} catch {}
};
