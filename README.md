# abrarshuvo.github.io

My portfolio site. Plain HTML and CSS, no framework, no build step.
Hosted free on GitHub Pages at https://abrarshuvo.github.io

## Files

| File | Page |
|---|---|
| `index.html` | Home |
| `loom-to-tasks.html` | Case study: Loom to Tasks |
| `lead-tracker.html` | Case study: Lead Tracker |
| `sourcing-website.html` | Case study: B2B Sourcing Website |
| `services.html` | Services and pricing |
| `contact.html` | Contact |
| `404.html` | Not found |
| `styles.css` | All styling, shared by every page |
| `script.js` | Count-up numbers and the hero parallax |
| `images/` | Photo, screenshots, favicon, link-preview cover |

## Editing

Open any `.html` file and edit the text directly. The look lives in
`styles.css`; these three classes carry the whole style:

- `.glass` — the frosted panels
- `.orb` — the crystal bubbles
- `.blob` — the soft colour clouds drifting behind the page

## Run it locally

```
python -m http.server 8000
```

Then open http://localhost:8000 — use this rather than double-clicking the
files, so `404.html` resolves its links correctly.

## Still to set

- Pricing on the services page is "Custom quote" until real prices are set.
- The contact form uses FormSubmit. Submit one test message and click the activation link emailed to the address in `contact.html`.
