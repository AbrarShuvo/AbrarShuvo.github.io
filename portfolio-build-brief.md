# Portfolio website — status and build notes

**Status: built.** The site is coded and tested. Design is the **glass bento** direction.
Deliverable: `abrarshuvo-github-io.zip` (sent in chat), plus a live preview artifact.

## What's in the zip

```
index.html              Home
loom-to-tasks.html      Case study: Loom to Tasks
lead-tracker.html       Case study: Lead Tracker
sourcing-website.html   Case study: B2B Sourcing Website
services.html           Services and pricing
contact.html            Contact (form)
404.html                Not found
styles.css              All styling, shared
script.js               Count-up numbers + hero parallax
images/favicon.svg      Favicon (done)
images/README.md        Which images to add, and at what size
README.md               Repo readme
```

Plain HTML + CSS. No framework, no build step. Fonts from Google Fonts.

## Verified before delivery

- All 54 internal links resolve; no broken links
- No horizontal scroll at 1440px, 390px or 360px
- No JavaScript errors on any page
- Every page has its own title, description and Open Graph tags for link previews
- Form fields have real `<label>`s; `name`, `email` and `task` are required

## Deploy

1. New **public** repo named exactly `AbrarShuvo.github.io`
2. Upload the unzipped files at the repo root (not inside a folder)
3. Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save
4. Live at `https://abrarshuvo.github.io` in a minute or two

To run it locally: `python -m http.server 8000`, then open `http://localhost:8000`.
Use a server rather than double-clicking, so `404.html` resolves its links.

## Placeholders still to replace

| Find | Replace with | Where |
|---|---|---|
| `[your-handle]` | LinkedIn username | footer on every page, contact page |
| `[your-x-handle]` | X username | footer on every page |
| `[YOUR PRICE]` | three prices | `services.html` |
| `YOUR_FORM_ID` | Formspree form id | `contact.html` |

Email is already filled in: `abrarzamil.dev@gmail.com`

## Images to add

`images/README.md` lists all eight slots. The important ones first:
`profile.jpg` (hero), `og-cover.png` (1200×630, the LinkedIn link preview),
then two screenshots per case study.

Crop out real emails and client names before adding any screenshot. Compress at squoosh.app.

## Decisions baked in

- Home nav: Projects, Services, About, Contact. Contact and "Let's talk" go to `contact.html`
- Each project card on the home page links to its case study
- The sourcing case study carries **no client name and no live link**, and says "code stays private"
- All dashboard and transcript content is sample data, labelled as such on every page
- `67/67` and `156` come from the real test suites. If they change, update the home page, the case study and the results panel
- Site says **Abrar Zamil** throughout

## Contact form

GitHub Pages is static, so a form can't send email by itself. The form posts to
Formspree (`https://formspree.io/f/YOUR_FORM_ID`). Free tier: sign up, make a form,
paste the id. Alternative: Web3Forms. Otherwise turn it into a `mailto:` link.

## Agreed for later

- Dark mode
- More animations
- `abrarzamil.com` after the first paid client
