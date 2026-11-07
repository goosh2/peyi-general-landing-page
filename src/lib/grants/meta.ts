import type { Metadata } from "next";

const BASE = "https://www.peyiai.com";

/** Shared metadata shape for Grants pages: title, description, canonical, Open Graph. */
export function grantsMeta(path: string, title: string, description: string): Metadata {
    const url = `${BASE}${path}`;
    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { title, description, url, type: "website", siteName: "Peyi Solutions" },
        twitter: { card: "summary_large_image", title, description }
    };
}
