# CLAUDE.md

Context for Claude Code working in this repo.

## What this is

Abrar Zamil's freelance portfolio. Plain HTML + CSS + a little vanilla JS.
**No framework, no build step, no package.json.** Hosted on GitHub Pages at
https://abrarshuvo.github.io — whatever is on `main` is live.

Keep it that way. Do not add React, Tailwind, a bundler, or npm unless I ask.

## Files

| File | Page |
|---|---|
| `index.html` | Home: hero, selected work, what I do, how I work |
| `projects.html` | Work: all projects, plus the free Glass Bento template (links out to its demo and repo) |
| `loom-to-tasks.html` | Case study: Loom to Tasks |
| `lead-tracker.html` | Case study: Lead Tracker |
| `sourcing-website.html` | Case study: Wholesalia website (live client site) |
| `services.html` | Services: four services, how I work, FAQ |
| `python-automation-for-agencies.html` | Landing page: Python automation for agencies, links to the three case studies |
| `how-i-turned-meeting-recordings-into-task-lists.html` | Article: how meeting recordings become task lists (Loom to Tasks) |
| `workflow-automation.html` | Service page: workflow automation |
| `ai-integrations.html` | Service page: AI integrations |
| `data-dashboards.html` | Service page: data dashboards |
| `websites.html` | Service page: websites |
| `about.html` | About: intro, experience timeline, tools |
| `contact.html` | Contact: name, email, about the task |
| `404.html` | Not found (root-relative links) |
| `sitemap.xml` | Sitemap: all pages except 404 |
| `robots.txt` | Allows all, points to sitemap.xml |
| `styles.css` | All shared styling and components |
| `script.js` | Mobile menu, hero parallax, contact prefill, copy-email, thank-you note, dark mode, scroll progress, back-to-top, card spotlight, reveal fallback, form sending state, Work-page Hero Parallax driver |
| `images/` | Photo, Wholesalia screenshots, favicon, link-preview cover |
| `fonts/` | Plus Jakarta Sans variable woff2, self-hosted (no Google Fonts) |

Nav on every page: Work · Services · About · Contact, plus "Let's talk".

## Preview

```
python -m http.server 8000
```

Open http://localhost:8000. Use a server, not file://, or `404.html` links break.

## Design system

Fonts: **Plus Jakarta Sans** (everything), self-hosted variable woff2 in
`fonts/` (`@font-face` in `styles.css`, weights 200–800). No Google Fonts,
no web-font requests. Headings are weight 800, tight tracking (-.03em).

| Token | Hex | Used for |
|---|---|---|
| Warm white | `#FDFDFC` | page background |
| Ink | `#090909` | headings, dark buttons |
| Body | `#1B1B1B` | body text |
| Muted | `#6E6E6E` | secondary text |
| Violet | `#5B29FE` | primary accent, buttons, links |
| Violet deep | `#4A23CC` | darker violet |
| Orange | `#FF531A` | warm accent, step numbers |
| Lemon | `#FFF84B` | highlight, CTA card accent |
| Lavender | `#F3EEF5` | (kept in CSS; no longer used on preview cards) |
| Beige | `#EDE0D5` | (kept in CSS; no longer used on preview cards) |
| Dark | `#141414` | CTA band, footer |
| Green | `#1F9D63` | available dot, pass states |

Three classes carry the whole look. Reuse them, don't reinvent them:

- `.glass` — flat card: solid white, 1px `#E5E5E5` hairline border, 24px radius.
  No blur, no shadow. (The name is kept so all fifteen pages keep working.)
- `.orb` — flat translucent-white circle used as a soft dot on colour panels.
- `.blob` — hidden (`display: none`); the markup stays on every page but no
  colour clouds render. The page background is flat `#FDFDFC`.

Nav is a sticky flat bar (full width, no pill, hairline bottom border when
scrolled). Hero is a flat white card with the headline, a gradient phrase
(orange → pink → violet) and the photo in a square-cornered frame. CTA is a
flat dark `#141414` band. Footer is a dark `#141414` band with link columns
and a giant cropped "ABRAR ZAMIL" wordmark. Project preview cards are
full-bleed media (Stokt / Cappen treatment, added 2026-11-26): the visual
fills the card edge-to-edge with no pastel panel, no browser frame and no
orbs; real screenshots use `object-fit: cover`, the Loom / Lead Tracker CSS
demo windows fill the card instead. Hover zooms the media slightly, darkens
the bottom with a gradient and shows a centred "View project →" pill
(`.proj-view`). On the home grid the second card sits 56px lower (Cappen
stagger). New Work entries reuse the same pattern: one `.proj` card, one
`.proj-visual` with the screenshot (16:10 works best) or a demo window.
Wholesalia card photo (round 3, 2026-11-26, still local): fresh screenshot of
https://gowholesalia.com/ taken 2026-11-26 — the "Featured products" section
(heading + 4 products + Wheelchair row), 1280×1018, which matches the card
visual's ratio so nothing is cropped. The live site's hero slideshow photo
does NOT load (empty pink panel on desktop and mobile — likely a missing
image on the client site, flag it to the client). The old hero shot
(1318×478, headline only) is superseded.

Motion + colour round 2 (Stokt / Cappen, added 2026-11-26, PUSHED LIVE
2026-11-26, commit 533a758):
- "What I work with" section on the home page (added 2026-11-26 round 4, still
  local): the same `.skills-strip` card as the About page — "/ Tools" eyebrow
  + "What I work with" heading + all 22 skill pills scrolling (48s loop,
  pauses on hover, edge fade). The old `.marquee` lemon strip is gone
  (removed from index.html and styles.css, Abrar said it looked bad and the
  About section was better). Keep the two strips in sync: same 22 skills,
  same icons, same order.
- Hero headline words rise one by one (`.hero .h1 .w`, staggered delays).
- Loom demo (`.demo`, home + loom-to-tasks.html): the 10s infinite loop is
  gone — it used to empty out and replay, so the first card often showed an
  empty "Reading the meeting…" right column. Since round 4 it plays ONCE when
  it scrolls into view (script.js adds `.play`, 12s sequence, outputs appear
  by ~4s) and holds the finished state; no JS or reduced motion shows the
  finished state directly. Columns are taller (min-height 370px) so the
  window fills the card instead of ending in empty white space.
- Hero Parallax on the Work page (Aceternity HeroParallax, added 2026-11-26
  round 5, still local): a 300vh section on projects.html, directly under the
  "Selected work" header and above the project list. The grid starts tilted
  (rotateX 15 / rotateZ 20, opacity .2) and flattens over the first 20% of the
  scroll; rows 1+3 slide one way, row 2 the other (script.js, spring
  approximated with a per-frame lerp). Cards are the real projects —
  Loom, Lead Tracker, Wholesalia, Glass Bento — plus 3 "Coming soon" dummy
  placeholders (Abrar will replace them with real projects), a "Your project
  here" card linking to contact, and a "More on GitHub" card. This is a
  vanilla CSS/JS port: the site has no React / Next.js / Tailwind / shadcn,
  so the .tsx component cannot be pasted in as-is (no build step, no
  framer-motion, no next/image). If the site ever moves to Next.js, the React
  version would live in components/ui (shadcn default) with framer-motion
  installed; until then the port keeps GitHub Pages working with zero deps.
  Reduced motion shows the rows as a plain wrapping grid; touch shows card
  names without hover. To swap a dummy for a real project, replace one
  `.px-card--dummy` block with an `<a class="px-card">` like the others.
  Round 6 (2026-11-26, pushed live 2026-11-26 ~22:01 WIB, same push as
  rounds 7+8): cards are now the demo's exact size, 480×384 (h-96 w-[30rem]),
  80px gaps, all four real projects image-led — Loom and Lead Tracker
  thumbnails are screenshots of their own live CSS demos
  (images/loom-thumb.jpg 920×414, images/lead-tracker-thumb.jpg 760×490,
  captured with puppeteer after the Loom demo finished playing);
  dummies / CTA / GitHub stay designed panels. Motion is now the authentic
  model: the stage is NOT sticky — the tall grid scrolls through the 300vh
  runway on translateY -700→500 (same numbers as the React original) while
  rows slide up to 1000px. Hover is shadow-2xl + lift -20px + black shade .8
  + title bottom-left. Note: `overflow:hidden` on .px-wrap used to break the
  old sticky stage; the stage is static now, so the clip rule is only about
  sideways rows (still keep it off — .page overflow-x:clip does that job).
  The two new thumbnails are binaries: they need a browser web upload at
  push time (like the font / og-cover / Wholesalia photo).
  Round 7 (2026-11-26, homepage banner as parallax, pushed live same push):
  the home "What I work with" banner is now a 200vh parallax runway — two
  rows of the same 22 skill pills (11/11, same icons, same order, no
  duplicates) sliding opposite ways on scroll, stage tilts rotateX 10->0 and
  fades in. The stage IS sticky here (unlike the showreel): the banner is
  only two rows tall, so it stays pinned while the runway scrolls — a
  non-sticky stage scrolled away and left the runway blank (caught in
  verification, fixed before pushing). One driver (`driveParallax` in
  script.js) serves both: the showreel uses progress over the full wrap
  height, the banner over the scrollable distance (wrapHeight - viewport).
  About keeps its 48s loop strip — content stays in sync (same 22 skills).
  Round 8 (2026-11-26, buttons with hover lift, pushed live same push as
  rounds 6+7; revised 2026-11-26, still local — Abrar re-sent the paste:
  "Buttons like this"): every .btn lifts 6px (was 2px) with a soft shadow
  on hover/focus-visible in the first version; the revision uses the demo's
  LITERAL values — whileHover y:-20 + shadow-2xl (0 25px 50px -12px
  rgba(0,0,0,.25)), .35s ease like the showreel cards — on every .btn
  site-wide (hero, nav "Let's talk", View project, form submit). Verified:
  hero/nav/View-project all translate 0 -20px + shadow-2xl, no overflow,
  dark mode OK. The nav button floats high on hover but stays inside the
  bar — looks deliberate, not broken. Reduced-motion disables the lift.
  Round 9 — SHOWREEL MOVED TO HOME (2026-11-26, still local — Abrar: "what
  you put on work I want that animation on the home page... for works I will
  think something later"): the 9-card showreel moved from projects.html to
  index.html, replacing the "Recent projects" grid. Home order is now hero →
  showreel → "What I work with" banner → stats. The grid's descriptions,
  results and inline Loom demo are gone from home (the demo still lives on
  loom-to-tasks.html and on the Work page list); the showreel cards link to
  the same case studies. An "All work →" link sits in the showreel header,
  and the section keeps id="work". The Work page is now a plain list
  (header + 4 project cards with live demos) until Abrar decides what it
  should be. No CSS/JS changes — the same driveParallax driver runs the
  showreel wherever it lives. Images are lazy: they read as unloaded at
  page load (below the hero fold) and load on scroll — that is normal, not
  a bug.
- Nav links roll on hover: the label slides up and a violet copy slides in
  (script.js adds `.roll` + `data-text`; no-JS keeps plain links).
- `.pill-label` — solid black pill section label (Cappen), used on the two
  work sections instead of the slash eyebrow.
- `.stats` — four real numbers (04 projects / 03 case studies / 02
  certificates / 223 automated checks) that count up on scroll (script.js,
  `data-count` + `data-pad`). Never invent a number.
- `.cert-list` / `.cert-row` — certificates as hairline rows on About; the
  hovered row turns solid orange with white text (Stokt awards table).
- The project-card hover pill (`.proj-view`) is orange, not white.
- Orange (`--orange`) is the second accent next to violet; lemon
  (`--lemon`) is used for the marquee and highlight pills. Both keep their
  light values in dark mode.
Section labels are Wavespace-style: a violet "/" then uppercase muted text.
Buttons are pills: `.btn-dark` is violet, `.btn-ondark` is white with violet
text (for dark bands), `.btn-glass` is white with a hairline border.

Supporting classes: `.tile` (hover lift), `.btn` / `.arr` (button + arrow nudge),
`.pop` (load-in), `.rv` (reveal on scroll), `.bob` (float), `.win` (app-window shadow),
`.par` + `.p1/.p2` (hero parallax), `.frost`, `.demo` (Loom live demo), `.dash` (dashboard mock).

## House rules

- Use the component classes in `styles.css` (`.wrap`, `.sec`, `.h1`/`.h2`, `.btn-dark`,
  `.btn-glass`, `.proj`, `.svc`, `.meta`, `.case-visual`, `.cta`, `.foot` …) so pages stay
  consistent. Small one-off tweaks can stay inline.
- The three case studies share one identical layout, in this order: back link, pill,
  title, tech tags, summary, two buttons side by side, meta row, hero visual, problem,
  three steps, decisions, result, screens, next project, CTA. Keep all three in sync.
- Every page repeats the same nav and footer markup. Change one, change all fifteen.
- Test at **390px** after any layout change. No horizontal scroll, ever.
- Keep the accessibility that's there: real `<label>` for every input, `aria-hidden`
  on decorative SVGs, `aria-label` on icon-only links, visible focus rings.
- Every animation is already wrapped in `@media (prefers-reduced-motion: reduce)`.
  Any new one must be too.
- `styles.css` and `script.js` are linked with a `?v=` tag on all fifteen pages. After changing
  either file, change the tag on every page (any new value), or visitors' browsers keep the
  old cached file and the page shows unstyled.
- Don't add third-party scripts (analytics, chat widgets, font loaders) without asking.

## SEO

- Every new page needs a unique `<title>` (under 60 characters), meta description (under 160), canonical, and og:title / og:description / og:type / og:url / og:image + twitter:card. Add it to `sitemap.xml`.
- Site URL is https://abrarshuvo.github.io/ — it is in a `<!-- SITE URL: ... -->` comment at the top of `<head>` in each page. Change that comment first, then find-replace the same URL in the canonical / og tags. Files containing it: all fifteen HTML files, `sitemap.xml`, `robots.txt`.
- `404.html` is noindex, with no canonical.
- One h1 per page, headings in order, meaningful alt text, width and height on images, `loading="lazy"` below the fold.

## Writing rules

- **No pricing or payment anywhere** — no prices, rates, "fixed price", deposits or
  invoices. Clients ask in their message. (Wholesalia's own product prices are fine,
  they're part of that case study.)
- Plain, specific client language. No hype lines, no engineer jargon.
- The About page presents Abrar as a developer, by his work. Don't lead with being a
  student or the scholarship.
- Explain numbers in plain words (e.g. "67/67 checks passed. Each compares the output
  with the right answer"). Don't put bare test counts on the home page.

## Contact form

`contact.html` has exactly three fields: name, email, about the task. It posts to **FormSubmit** (`https://formsubmit.co/abrarzamil.dev@gmail.com`), no account needed. Hidden `_subject`, `_template`, `_next` and `_honey` (spam trap) fields configure it. After sending, it redirects to `contact.html?sent=1`; `script.js` reveals the `#sent-note` thank-you note when that query is present. The form is activated. `services.html` "Ask about this" buttons link to `contact.html?service=<name>`, and `script.js` prefills the task box with it.

Email is already set: `abrarzamil.dev@gmail.com`

## Content rules — do not break these

- The sourcing case study names the client (**Wholesalia**) and links to 
  https://gowholesalia.com. The client agreed to this in November 2026. Never put the
  client's phone numbers, address or email on the portfolio, and never screenshot the
  live site's footer or its "Can't find the product you need?" contact section.
  Admin screenshots stay redrawn (the admin is private), and the code stays private.
- Every mockup uses **sample data** and is labelled as such. Keep those labels.
- `67/67` (Loom to Tasks) and `156` (Lead Tracker) come from real test suites.
  They appear only in the case studies (meta row and result panel).
- Don't invent metrics, testimonials, client logos or dates.
- About → Certificates lists only certificates actually issued, each linking to its
  public credential page (365 Data Science: Statistics, Jan 2025; Introduction to Data
  and Data Science, Nov 2024). Never add a certificate without its real link.

## Open decisions

- **Name:** resolved. The site says "Abrar Zamil", matching the LinkedIn profile. GitHub stays `AbrarShuvo`.
- Dark mode: done. A toggle in the nav sets `data-theme` on `<html>` and saves it in
  `localStorage` (`theme`). A tiny script in `<head>` applies it before paint. Every new
  component needs a `html[data-theme="dark"]` rule if its colours are hard-coded.
  The free template (github.com/AbrarShuvo/Glass-bento-portfolio) shares this design
  system; port improvements both ways.
- `abrarzamil.com`: after the first paid client.

## Deploying

**Restyle 2026-11-26: flat three-site language (Purple Softworks / Musemind /
Wavespace), same as the blog. Pushed live 2026-11-26 after Abrar approved the
preview (snapshot push; the motion round and full-bleed previews went live in
the same push).** Cache tag is now `?v=9a1f4b` (showreel move + literal button lift, pushed live 2026-11-26, commit `80af506`).

Push to `main`. GitHub Pages rebuilds in about a minute. There is no CI.
