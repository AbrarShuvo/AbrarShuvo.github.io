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
| `projects.html` | Work: all projects |
| `loom-to-tasks.html` | Case study: Loom to Tasks |
| `lead-tracker.html` | Case study: Lead Tracker |
| `sourcing-website.html` | Case study: Wholesalia website (live client site) |
| `services.html` | Services: four services, how I work, FAQ |
| `about.html` | About: intro, experience timeline, tools |
| `contact.html` | Contact: name, email, about the task |
| `404.html` | Not found (root-relative links) |
| `styles.css` | All shared styling and components |
| `script.js` | Mobile menu, hero parallax, contact prefill, copy-email, thank-you note |
| `images/` | Photo, Wholesalia screenshots, favicon, link-preview cover |

Nav on every page: Work · Services · About · Contact, plus "Let's talk".

## Preview

```
python -m http.server 8000
```

Open http://localhost:8000. Use a server, not file://, or `404.html` links break.

## Design system

Fonts: **Bricolage Grotesque** (headings), **Inter** (body), from Google Fonts.

| Token | Hex | Used for |
|---|---|---|
| Cream | `#FFF0E4` | page background |
| Plum | `#2A1B3D` | headings, dark buttons |
| Plum soft | `#3A2B4E` | body text |
| Blue | `#3350DC` / `#4C6FFF` | primary accent |
| Violet | `#7A5CE6` | gradient middle |
| Coral | `#E8697A` | gradient middle |
| Orange | `#FF7A2F` / `#FF9A52` | warm accent |
| Yellow | `#FFD34D` / `#FFE27A` | highlight |
| Green | `#1F9D63` | available dot, pass states |

Three classes carry the whole look. Reuse them, don't reinvent them:

- `.glass` — frosted panel: translucent white, `backdrop-filter: blur(24px)`, white border, inset top highlight
- `.orb` — crystal bubble: a `radial-gradient` highlight at 32%/26% plus two inset shadows
- `.blob` — soft blurred colour cloud drifting behind the page on `floatA` / `floatB`

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
- Every page repeats the same nav and footer markup. Change one, change all nine.
- Test at **390px** after any layout change. No horizontal scroll, ever.
- Keep the accessibility that's there: real `<label>` for every input, `aria-hidden`
  on decorative SVGs, `aria-label` on icon-only links, visible focus rings.
- Every animation is already wrapped in `@media (prefers-reduced-motion: reduce)`.
  Any new one must be too.
- Don't add third-party scripts (analytics, chat widgets, font loaders) without asking.

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
- Dark mode: wanted, not started.
- `abrarzamil.com`: after the first paid client.

## Deploying

Push to `main`. GitHub Pages rebuilds in about a minute. There is no CI.
