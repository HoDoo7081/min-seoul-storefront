import { useEffect, useRef, type ReactNode } from "react";
import { useLocale } from "@/hooks/useLocale";
import { translatePdp } from "@/lib/pdpDictionary";

/**
 * Wraps children and walks descendant text nodes, translating any English
 * strings that appear in the PDP dictionary. Re-runs whenever the locale
 * changes and observes DOM mutations so tab switches / conditional renders
 * are covered.
 */
export function AutoTranslate({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { locale } = useLocale();
  const originals = useRef<WeakMap<Text, string>>(new WeakMap());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const translateNode = (node: Text) => {
      let original = originals.current.get(node);
      if (original === undefined) {
        original = node.nodeValue ?? "";
        originals.current.set(node, original);
      }
      if (!original.trim()) return;
      // Preserve leading/trailing whitespace
      const match = original.match(/^(\s*)([\s\S]*?)(\s*)$/);
      if (!match) return;
      const [, lead, core, trail] = match;
      const translated =
        locale === "en" || locale === "ko"
          ? core
          : translatePdp(core, locale);
      const next = `${lead}${translated}${trail}`;
      if (node.nodeValue !== next) node.nodeValue = next;
    };

    const walk = (el: Node) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => {
          const parent = (n as Text).parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT")
            return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      let node = walker.nextNode();
      while (node) {
        translateNode(node as Text);
        node = walker.nextNode();
      }
    };

    walk(root);

    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "characterData") {
          const t = m.target as Text;
          // If React re-sets text, refresh the stored original
          if (!originals.current.has(t)) {
            originals.current.set(t, t.nodeValue ?? "");
          }
          translateNode(t);
        } else {
          m.addedNodes.forEach((n) => {
            if (n.nodeType === Node.TEXT_NODE) translateNode(n as Text);
            else if (n.nodeType === Node.ELEMENT_NODE) walk(n);
          });
        }
      }
    });
    obs.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    return () => obs.disconnect();
  }, [locale]);

  return <div ref={rootRef} data-auto-translate={locale}>{children}</div>;
}
