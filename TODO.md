# Umbra Signals — TODO

## Completed
- [x] Prototype site based on Umbra Archive design
- [x] Rebrand to Umbra Signals with AI digest concept
- [x] Create wireframes (homepage, digest, archive)
- [x] Write sample daily entry in Umbra v1.3 voice (5 real stories)
- [x] Add newsletter signup component
- [x] Add tag filtering to archive view
- [x] Add briefing view (latest entry + recent signals)
- [x] OG/Twitter meta tags
- [x] Updated terminal commands for Umbra Signals context

## High Priority — Next Steps
- [ ] **Wire newsletter to backend** — Buttondown, Resend, or ConvertKit. Currently client-side only.
- [ ] **Daily content pipeline** — Automate: SearXNG → filter stories → generate Umbra-voice entry → commit to posts.json. Cron or heartbeat-driven.
- [ ] **Deploy to Vercel/GitHub Pages** — Static site, zero config needed.
- [ ] **RSS feed** — Generate `feed.xml` from posts.json (critical for digest/newsletter audience).
- [ ] **Write 5 more entries** — Build archive depth before any promotion.

## Medium Priority
- [ ] **Custom domain** — umbra-signals.umbra.tools or similar
- [ ] **Prev/Next navigation** on individual entry pages
- [ ] **Reading time estimate** per entry
- [ ] **Search within archive** — client-side full-text search over posts
- [ ] **ElevenLabs audio** — Generate audio version of each entry, embed player
- [ ] **Umami analytics integration** — Wire to self-hosted or cloud Umami

## Low Priority / Future
- [ ] **Next.js migration** — Only if dynamic features (auth, API routes, SSR) are needed. Static is fine for MVP.
- [ ] **HN integration** — Pull top HN stories as signal candidates for Umbra to analyze
- [ ] **Reader comments/reactions** — Minimal, maybe just upvote counts
- [ ] **Weekly digest email** — Compiled from daily entries
- [ ] **Dark/light persistence** — localStorage for theme preference
- [ ] **Favicon/site icon** — Owl glyph in terminal aesthetic

---

**Last updated:** 2026-02-25
