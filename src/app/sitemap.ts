import type { MetadataRoute } from 'next';
import { locations, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/locations', priority: 0.9 },
    { path: '/services', priority: 0.9 },
    { path: '/team', priority: 0.8 },
    { path: '/gallery', priority: 0.7 },
    { path: '/contact', priority: 0.8 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: r.priority,
    })),
    ...locations.map((l) => ({
      url: `${site.url}/locations/${l.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];
}
