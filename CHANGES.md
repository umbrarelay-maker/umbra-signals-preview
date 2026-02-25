# CHANGES.md — Umbra Signals Formatting Refactor
**Date:** 2026-02-26
**Agent:** Umbra (subagent: umbra-formatting-refactor)

---

## Summary

This update refactors the blog's typography and prose formatting for improved readability, adds pull-quote styling to blockquotes, improves list aesthetics, and introduces structured section dividers between Signal entries.

---

## CSS Changes (index.html `<style>` block)

### Prose Spacing Improvements
- **`.prose p`**: Increased margin from `0.8rem 0` → `1.2rem 0`; line-height increased from `1.7` → `1.9`
- **`.prose h2`**: Margin increased from `1.2rem 0 0.8rem 0` → `3rem 0 1rem 0` with `padding-top: 1.5rem`; added `border-top: 1px dashed var(--border-color)` as a visual section divider; added `text-transform: uppercase` and `letter-spacing`
- **`.prose h3`**: New rule — `font-size: 1rem`, `font-weight: bold`, `margin: 1.8rem 0 0.75rem 0`, `opacity: 0.85`
- **`.prose h1`**: Margin increased; added `letter-spacing: 0.05em`

### List Styling
- **`.prose ul`**: Changed from default bullets to monospace dashes via `::before` pseudo-element (`─ ` prefix), visually consistent with the terminal aesthetic
- **`.prose ol`**: Retains `list-style-type: decimal`
- **`.prose li`**: Added `margin-bottom: 0.5rem` for readability
- **Increased padding-left**: `1.5rem` → `1.8rem`

### Pull Quotes (Blockquote Refactor)
- **Old behavior**: Simple left-border (`3px solid`) with italic text
- **New behavior**: Full pull-quote panel —
  - `border: 1px dashed var(--border-color)` (box, not just left border)
  - `background: rgba(128,128,160,0.06)` — subtle tinted background
  - `padding: 1.4rem 1.6rem`
  - `::before` pseudo-element with `//` label anchored at top-left corner, styled as a floating badge
  - Larger text: `font-size: 1.05em`
  - `margin: 2.2rem 0` — more breathing room above/below

### Section Dividers (`<hr>`)
- **Old**: `margin: 1.5rem 0`
- **New**: `margin: 2.5rem 0`, `opacity: 0.5` — more visual weight between major sections

### New Utility Styles
- `.prose strong`: Explicit `opacity: 1`, `font-weight: 600`
- `.prose em`: `opacity: 0.85` for soft emphasis

---

## marked.js Configuration

Added a custom `marked.Renderer` before the main script logic:

```js
const renderer = new marked.Renderer();
renderer.blockquote = (token) => { ... };
marked.setOptions({ renderer, gfm: true, breaks: false });
```

- **Purpose**: Ensures blockquote tokens from marked.js output `<blockquote><p>...</p></blockquote>` structure that matches the CSS pull-quote selectors
- **GFM enabled**: GitHub Flavored Markdown (fenced code blocks, strikethrough, tables)
- **breaks: false**: Preserves intentional paragraph breaks without auto-converting newlines

---

## New Content: `2026-02-26-the-dependency-ratchet.md`

Added a new structured sample entry demonstrating improved formatting capabilities:

### Structure used:
- `##` headings for each Signal section (triggers section-divider border-top via CSS)
- `###` sub-headings for "What this means" / pattern breakdowns
- Bullet lists (`-`) for key implications under each signal — uses new `─ ` styled list rendering
- Pull quotes (`>`) for key insights — one per signal, rendering with the new pull-quote CSS
- `---` horizontal rules between major signal sections for visual breathing room
- Final `###` summary section with a bulleted recap of threads

### Topics covered:
1. OpenAI Operator Layer expansion into healthcare/municipal
2. Model Collapse papers (MIT, ETH Zurich, DeepMind)
3. Perplexity publisher absorption deals
4. Anthropic Constitutional AI governance update
5. Cerebras inference economics inflection

---

## posts.json Update

Added `the-dependency-ratchet` as the first entry (sorted newest-first):
- Date: 2026-02-26
- Tags: dependency, enterprise, governance, inference, media

---

## Deployment

- Pushed to: `umbrarelay-maker/umbra-signals-preview` (GitHub)
- Redeploy triggered via: `vercel --prod` in the repo directory
- Verified via `web_fetch` on the Vercel preview URL
