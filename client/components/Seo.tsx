import { useEffect } from "react";

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "product";
  canonicalPath?: string; // e.g. "/product/123"
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    // Assign the identifying attribute from selector
    const [attr, value] = selector.replace(/^meta\[/, "").replace(/\]$/, "").split("=");
    if (attr && value) {
      el.setAttribute(attr, value.replace(/^\"|\"$/g, ""));
    }
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([k, v]) => el!.setAttribute(k, v));
}

export const Seo = ({ title, description, image, type = "website", canonicalPath }: SeoProps) => {
  useEffect(() => {
    const siteName = "PartyLight";
    const resolvedTitle = title ? `${title} | ${siteName}` : `${siteName} | Техническое обеспечение мероприятий`;
    const resolvedDesc = description ?? "Аренда света, звука, экранов и трансляций для мероприятий.";
    const resolvedImage = image ?? "/placeholder.svg";

    // Title
    document.title = resolvedTitle;

    // Canonical
    const url = new URL(window.location.href);
    const canonicalUrl = canonicalPath ? new URL(canonicalPath, url.origin).toString() : url.toString();
    let linkTag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkTag) {
      linkTag = document.createElement('link');
      linkTag.setAttribute('rel', 'canonical');
      document.head.appendChild(linkTag);
    }
    linkTag.setAttribute('href', canonicalUrl);

    // Basic description
    upsertMeta('meta[name="description"]', { name: 'description', content: resolvedDesc });

    // Open Graph
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: resolvedTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: resolvedDesc });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: resolvedImage });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'ru_RU' });

    // Twitter
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: resolvedTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: resolvedDesc });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: resolvedImage });
  }, [title, description, image, type, canonicalPath]);

  return null;
};

export default Seo;


