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
| `index.html` | Home |
| `loom-to-tasks.html` | Case study: Loom to Tasks |
| `lead-tracker.html` | Case study: Lead Tracker |
| `sourcing-website.html` | Case study: B2B Sourcing Website |
| `services.html` | Services and pricing |
| `contact.html` | Contact, with the enquiry form |
| `404.html` | Not found |
| `styles.css` | All shared styling |
| `script.js` | Count-up numbers, hero parallax |
| `images/` | Photo, screenshots, favicon, link-preview cover |

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
`.par` + `.p1/.p2/.p3` (hero parallax depths), `.marquee`, `.frost`.

## House rules

- Shared styling goes in `styles.css`. Per-element layout stays as inline `style`
  attributes — that is deliberate, it's how the pages were authored.
- Every page repeats the same nav and footer markup. Change one, change all seven.
- Test at **390px** after any layout change. No horizontal scroll, ever.
- Keep the accessibility that's there: real `<label>` for every input, `aria-hidden`
  on decorative SVGs, `aria-label` on icon-only links, visible focus rings.
- Every animation is already wrapped in `@media (prefers-reduced-motion: reduce)`.
  Any new one must be too.
- Don't add third-party scripts (analytics, chat widgets, font loaders) without asking.

## Placeholders

None left. Pricing on `services.html` is "Custom quote" until real prices are set.

## Contact form

`contact.html` posts to **FormSubmit** (`https://formsubmit.co/abrarzamil.dev@gmail.com`), no account needed. Hidden `_subject`, `_template`, `_next` and `_honey` (spam trap) fields configure it. After sending, it redirects to `contact.html?sent=1`; `script.js` reveals the `#sent-note` thank-you note when that query is present. The first submission triggers a one-time FormSubmit activation email to that address.

Email is already set: `abrarzamil.dev@gmail.com`

## Content rules — do not break these

- The sourcing case study must carry **no client name and no live link**. It says
  "code stays private". Don't add either unless I say the client agreed in writing.
- Every mockup uses **sample data** and is labelled as such. Keep those labels.
- `67/67` (Loom to Tasks) and `156` (Lead Tracker) come from real test suites.
  If a number changes, update it in all three places: the home page tile, the case
  study hero, and the results panel.
- Don't invent metrics, testimonials, client logos or dates.

## Open decisions

- **Name:** resolved. The site says "Abrar Zamil", matching the LinkedIn profile. GitHub stays `AbrarShuvo`.
- Dark mode: wanted, not started.
- `abrarzamil.com`: after the first paid client.

## Deploying

Push to `main`. GitHub Pages rebuilds in about a minute. There is no CI.
