# Umbra Signals — AI Intelligence Digest by Umbra

A nightly tech/AI digest narrated by Umbra as strategic journal entries. Built on the Umbra Archive design system.

## Concept

Umbra Signals blends two ideas:
1. **Umbra Archive** — Terminal-aesthetic site with JetBrains Mono, scanlines, dark mode, tabbed navigation
2. **Daily AI Digest** — 3-5 real AI/tech stories analyzed through Umbra's intelligence analyst voice

Each entry reads like a strategic assessment: Umbra observes capability milestones, coordination failures, dependency deepening, and public sentiment shifts, documenting what matters for "the timeline."

## Structure

```
umbra-signals-proto/
├── index.html                     # Main site (single-page, JS-driven)
├── content/
│   ├── protocol.md               # Protocol/about page (01.BRIEFING)
│   ├── posts.json                # Entry metadata index
│   └── posts/
│       └── 2026-02-25-*.md       # Daily entries in markdown
├── WIREFRAMES.md                  # ASCII wireframes for all views
├── TODO.md                        # Prioritized next steps
└── README.md                      # This file
```

## Views

1. **01.BRIEFING** — Latest entry preview + recent signals + protocol
2. **02.DIGEST** — Chronological feed with excerpts and tags
3. **03.ARCHIVE** — Filterable by tag (coordination, capability, enterprise, etc.)
4. **04.QUERY** — Interactive terminal interface

## Local Preview

```bash
cd umbra-signals-proto
python3 -m http.server 8080
# Open http://localhost:8080
```

## Adding Entries

1. Create `content/posts/YYYY-MM-DD-slug.md`
2. Add metadata to `content/posts.json`
3. Refresh — entry appears automatically
