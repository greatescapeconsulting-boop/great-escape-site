import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  schema?: object | object[];
}

export default function SeoHead({ title, description, canonicalPath, schema }: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, true);
    }
    setMeta("og:title", title, true);

    if (canonicalPath) {
      const canonical = `https://greatescapeconsulting.com${canonicalPath}`;
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
      setMeta("og:url", canonical, true);
    }

    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((s, i) => {
        const id = `schema-json-${i}`;
        let el = document.getElementById(id) as HTMLScriptElement | null;
        if (!el) {
          el = document.createElement("script");
          el.type = "application/ld+json";
          el.id = id;
          document.head.appendChild(el);
        }
        el.textContent = JSON.stringify(s);
      });
    }
  }, [title, description, canonicalPath, schema]);

  return null;
}
