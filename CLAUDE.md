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
  Round 10 (2026-11-26, "More projects" showreel on the 3 case-study pages,
  PUSHED LIVE 2026-11-27 ~04:02 WIB with rounds 11+12 — Abrar asked: middle, first or end, which fits
  better): END wins — the reader came for this project, so the showreel sits
  after the story and before the final "Want something like this?" CTA (the
  CTA stays the last beat); first would bury the case study, middle would
  interrupt it. Same 9-card showreel as home (no JS/CSS changes — the driver
  picks up any page with .px-wrap + #px-stage), heading "More projects",
  lead "Other things I've built — scroll through the rest.", no header link.
  Each page's OWN project card is swapped for a violet "All work" panel card
  (→ projects.html) so no card links to the page you're already on.
  Verified on Loom page: 9 cards, All work first in row 1, CTA directly
  after, p=0 tilted 15°/20°/-700 op .2, p=0.45 flat, dark + mobile overflow 0.
  Round 11 (2026-11-27, all recent projects added, PUSHED LIVE 2026-11-27
  ~04:02 WIB with rounds 10+12 — Abrar: "go for all of them... improve later, I need projects to
  customize"): 6 new projects. Showreel dummies replaced in all 4 copies
  (home + 3 case-study pages): RxGuard (real homepage screenshot
  images/rxguard-hero.jpg, 1280x640, grey band cropped off), The Last
  Visitor (rain-town still, images/last-visitor-hero.jpg, 1280x800),
  The Deleted City (white --git panel, no public link yet — artifact
  unshared, side chat still editing it). Work page: 10 cards now — the 6
  new ones are RxGuard (Live demo + View code buttons), The Last Visitor
  (Play it live → muse.ai link, which still serves the previous version
  until the side chat re-shares), The Deleted City, AI CV Coach (draft,
  deadline Dec 1 05:00 WIB), Wavespace (client project, no details yet),
  Personal AI assistant (319 checks passing). The 4 without a live link
  are .proj-panel visuals (violet/dark/paper, new CSS) with a "Full case
  study coming soon." line instead of a button — no invented links or
  results. Card images regenerated 2026-11-27 ~03:35 WIB per Abrar ("RX
  card colours not good, top/bottom header-footer layers, don't need lots
  of detail — main thing showing; the game photo is AI-generated, make it
  better, from the context, good and well detailed"): RxGuard is now a
  clean generated image — mint shield + checkmark over a prescription
  paper, "RxGuard" text, no UI clutter (was a busy homepage screenshot);
  The Last Visitor is a new detailed anime still — Nao with her glowing
  lantern in the rain town, torii, wet reflections (was the older rain-town
  still). Both 1280 wide, alts updated. Image rework 2026-11-27 ~03:45 WIB
  per Abrar ("RxGuard has a screenshot — no header/footer in the preview;
  Last Visitor: generate a good photo card showing the game interface;
  AI CV Coach and Wavespace got no photo card preview"): RxGuard is now
  the REAL headline "Decode Your Prescription & Lab Report" lifted from
  the homepage screenshot (luminance-keyed onto flat mint, 1280x720) —
  no header, no footer, no step cards, no grey band; the generated shield
  is gone. Last Visitor is now a game-interface image — Nao from behind
  with her lantern, objective + HP bar + map/pause buttons + controls
  hint, same HUD layout as the real game. AI CV Coach and Wavespace got
  photo cards too (robot + resume with green checkmark; laptop with a
  glowing workflow over blue waves) — the violet/dark panels are gone.
  Only The Deleted City and the assistant bot still use .proj-panel
  visuals. 4 binary images to upload on the push: rxguard-hero.jpg
  (40 KB), last-visitor-hero.jpg (232 KB), ai-cv-coach-hero.jpg (79 KB),
  wavespace-hero.jpg (81 KB). Stats row still says 04 projects —
  left alone on purpose, needs Abrar's number when we improve them. New
  images are binary: push them via browser web upload, not the snapshot.
  Verified: home showreel 9 cards in order, Work 10 titles + 2 panels,
  all 6 images load, no overflow, dark + mobile OK.
  Round 12 (2026-11-27 ~04:00 WIB) per Abrar — "RxGuard too bland, make
  it animated from video; Last Visitor still looks AI + bad resolution;
  AI CV Coach + Wavespace too AI-generated, use a real screenshot or
  think and make the best detailed preview": (1) RxGuard is now a
  LOOPING VIDEO — 6s clip (t=0-6) cut from the explainer V2
  (~/workspace/goals/hackathons/files/RxGuard-explainer-30s-v2.mp4),
  header cropped off (1280x660, 506 KB, no audio), <video autoplay muted
  loop playsinline> with the static headline image as poster; plays only
  while on screen (IntersectionObserver, 200px margin), still poster when
  reduced motion is on. CSS .px-visual--video + .proj-visual video;
  JS cardVideos block in script.js. (2) Last Visitor is now a frame from
  the Kling video (t=3.5s — Nao close, lantern, rain town), right edge
  cropped to 1120x720 to remove the KlingAI watermark. A live screenshot
  of the real game was attempted first (puppeteer to the artifact URL)
  but the VM proxy blocks it (ERR_TUNNEL_CONNECTION_FAILED), so the
  frame from the game's own reference video is used instead. (3) AI CV
  Coach + (4) Wavespace are now DETAILED UI MOCKS built in HTML/CSS and
  screenshotted (no real app exists to screenshot — no hosted URL or
  repo for either): CV Coach = CV + score 78 + 4 suggestions + jobs
  matched; Wavespace = automation dashboard (3 workflows, runs table,
  how-it-works, connected apps). Mocks are 1280x896 (1.43:1, the Work
  visual's aspect) so nothing is cropped — the 1280x720 versions lost
  their side content to the cover crop. Mock sources: /tmp/mock-cv.html,
  /tmp/mock-wavespace.html (not in the repo). Cache tag ?v=35ef37.
  Binaries to upload on the push: rxguard-loop.mp4 (506 KB),
  rxguard-hero.jpg (40 KB, video poster), last-visitor-hero.jpg
  (108 KB), ai-cv-coach-hero.jpg (148 KB), wavespace-hero.jpg (99 KB).
  Text files: 15 HTML + styles.css + script.js + CLAUDE.md.
  PUSHED LIVE 2026-11-27 ~04:02 WIB: text commit 4754f9f (18 files) + media
  commit 0baf200 (5 binaries, one web upload). Verified live: home /
  projects / loom-to-tasks 200, ?v=35ef37, video ref on home, all 5 binaries
  200 with exact byte sizes.
  Round 13 (2026-11-27, Item 2 — all five effects from the three-site study,
  LOCAL, not pushed): (1) Project marquee — full-bleed dark band after the
  home showreel, the 9 project names scrolling (CSS-only, duplicate track,
  -50% loop, edge fade, pauses on hover). (2) Scroll-linked word reveal —
  .wr headings flip word by word grey -> ink as they travel through the
  viewport (script.js, scroll-scrubbed); applied to home "Four ways I can
  help" + "Simple, from first call to handover", services "Simple, from
  first call to handover", and the problem headings on loom-to-tasks.html
  and lead-tracker.html (sourcing-website.html has no matching problem
  heading — skipped). (3) Count-up — the stats row already counted up, so
  the study's numbered-band treatment was applied instead: mono 001-004
  labels above each stat. (4) Split-letter roll-in on the home hero H1 —
  letters roll up with a 26ms stagger; the gradient word "automated." is
  NEVER split (background-clip:text does not paint through transformed
  child spans — verified: the word went invisible when split) and keeps
  its word rise. (5) "What do you need?" picker on services.html —
  Purple Softworks calculator pattern, NON-PRICE: 4 need buttons swap the
  matching service card, all copy verbatim from the service cards above
  (Good for / Typical time / Learn more); first option active in the
  markup so no-JS still shows a real result. Cache tag ?v=a13f27 on all
  15 pages. Verified: hero (gradient intact), marquee, word reveal
  mid-flip, stats labels, widget default + swapped option, 390px (0
  overflow), Loom problem heading, dark mode. Previews in
  ~/workspace/portfolio-preview/effects13-*.jpg. NOT pushed — awaiting
  Abrar's approval with items 3+4.
  Round 14 (2026-11-27, Item 3 — home header polish, LOCAL, not pushed):
  the home hero is no longer a card. The `.glass` container is gone —
  copy and photo sit directly on the flat page background with more air
  (new `.hero-flat` scope on index.html only, so About keeps its `.hero`
  card). The giant ghost "automate" word was removed: without the card
  it doubled the gradient word. The photo caption moved out of the frame
  to plain text underneath the photo (no more overlay card). Buttons got
  a real hierarchy on the flat background: "See my work" is now violet
  `.btn-dark`, "Contact me" an outline `.btn-glass` (both were white
  before and read as one flat pair). One real bug caught in verification:
  the `.hero.hero-flat` two-column rule outranked the ≤860px media query
  (specificity), so mobile stayed two-column and "automated." overlapped
  the photo — fixed with a `.hero.hero-flat` 1fr override in the media
  query, plus `white-space:nowrap` on the hero pill so it doesn't wrap
  at 390px. Round 13 work preserved: split-letter roll-in still runs,
  gradient word intact (verified settled in shots), no-JS word rise
  untouched. Cache tag ?v=9f2c41 on all 15 pages. Verified: desktop
  light + dark, 390px (0 overflow), About hero unchanged. Previews in
  ~/workspace/portfolio-preview/header14-home-hero.jpg,
  header14-home-mobile2.jpg (use this, not header14-home-mobile.jpg
  which shows the overlap bug), header14-home-dark.jpg. NOT pushed —
  awaiting Abrar's approval with item 4.
  Round 15 (2026-11-27, Item 4 — header brand wordmark, LOCAL, not pushed):
  the violet "A" logo mark is retired. The brand is now the name "Abrar Zamil"
  in clean 800 type, with a violet line that draws itself left to right under
  the name on load (.55s, .3s delay) and ends in a violet dot at the line's
  right end (dot pops in at .9s, .35s with a small overshoot); line + dot stay
  as the static wordmark once settled. Same markup on all 15 pages, nav AND
  footer (30 instances total — the footer brand carried the "A" mark too, so
  it got the wordmark for consistency; 404.html uses href="/" like before).
  The dead `.brand-mark` CSS rule is removed. Reduced motion shows the static
  wordmark (animation:none, transform:none — verified via computed style).
  Rounds 13+14 preserved: hero roll-in + gradient word intact, flat hero
  untouched, nav links/buttons/toggle/hamburger untouched. Cache tag
  ?v=c4d8a1 on all 15 pages. Verified: home settled + mid-sweep (line half
  drawn, dot not yet in), dark mode, 390px (0 overflow), services page,
  footer on dark. Previews in ~/workspace/portfolio-preview/brand15-*.jpg.
  NOT pushed — awaiting Abrar's approval with items 2+3.
  Rounds 13+14+15 PUSHED LIVE 2026-11-27 ~11:41 WIB: snapshot commit
  9e67d98 (18 files: 15 HTML + styles.css + script.js + CLAUDE.md).
  Verified live: home 200, ?v=c4d8a1, 0 brand-mark references, hero-flat
  present.
  Round 16 (2026-11-27 — photo galleries + 7 new case-study pages,
  Abrar: "Push all"): all 69 photos wired into pages. Galleries on the 3
  existing case studies (Loom 7, Lead Tracker 7, Wholesalia 7) + 7 NEW
  case-study pages (Glass Bento 7, RxGuard 6, Last Visitor 7, Deleted City
  7, AI CV Coach 7, Wavespace 7, Personal AI assistant 7). Aria pattern:
  story first, then ALL photos full-width in order 01→07, no captions,
  loading="lazy" + width/height + meaningful alts, existing classes only
  (.sec, .sec-head, figure.shot.glass). New pages follow the Loom layout
  exactly (back link, pill, h1, tags, summary, buttons, meta row, hero,
  problem, steps, decisions, result, screens, gallery, next project,
  showreel, CTA); SEO per page (title <60, desc <160, canonical,
  og/twitter). Next-project cycle now closes the loop: Loom → Lead
  Tracker → Wholesalia → Glass Bento → RxGuard → Last Visitor → Deleted
  City → AI CV Coach → Wavespace → Assistant → Loom. projects.html: all
  10 Work cards now link to a case study (the 4 "Full case study coming
  soon." panels are gone; Glass Bento / RxGuard / Last Visitor cards got
  a "View case study" button next to their demo/code links). sitemap.xml
  now 21 URLs (7 new pages, priority 0.8, lastmod 2026-11-27). Two
  legibility bugs found while building and fixed in this round: (1) the
  result panels on Loom / Lead Tracker / Wholesalia (live) + Assistant /
  Wavespace (new) were white text on pale lavender/lemon/beige
  (.panel g-blue/g-warm/g-sunset after the flat restyle) — all 5 got an
  inline violet #5B29FE background; the other 5 panels already had dark
  backgrounds. (2) styles.css had TWO .stat span rules: line 295
  #f1eeff (for dark panels) and line 535 var(--muted) (for the light
  home stats row); the later one won everywhere, dimming panel stat
  labels — fixed with a scoped .panel .stat span{color:#f1eeff} rule
  after line 535. Wholesalia photos 01/04/06 reworked: the Massger /
  Umbrella product photos have clipped baked-in text ("assage Gun",
  "mbrella") — the text band was cropped out entirely
  (prod-massger-crop.jpg, prod-umbrella-crop2.jpg), same fix as photo
  07. Cache tag ?v=9b20d2 on all 22 pages. Verified: local HTTP +
  puppeteer, desktop 1440 / mobile 390 / dark, 0 overflow, all images
  load. Verification note: full-page screenshots HIDE .rv sections
  (scroll-driven view-timeline animations evaluate at scroll 0 during
  captureBeyondViewport) — verify with viewport shots taken at scroll
  positions, not fullPage captures. Binaries: 69 photos (~25 MB) via web
  upload; text via snapshot push.
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
the same push).** Cache tag is now `?v=9b20d2` (rounds 13+14+15 pushed live 2026-11-27 ~11:41 WIB: text 9e67d98; round 16 pushed live 2026-11-27 ~12:10 WIB: text 5cdb30b + media b67dab8/8c0a5d6/06a4a3d — verified live: all 10 case-study pages 200, home ?v=9b20d2, 5 gallery images 200 with exact byte sizes).

Push to `main`. GitHub Pages rebuilds in about a minute. There is no CI.
