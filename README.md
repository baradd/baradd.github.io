# Mohammad Tavassolian — personal site

A minimal static homepage: a watercolor whale hero, name, and GitHub and LinkedIn links.

## Files

```
index.html         page markup + water-ripple SVG filter
styles.css         layout, paper texture, animations
script.js          mouse parallax, button wash, floating paint droplets
images/whale.webp  watercolor whale (whale.jpg is the fallback)
```

No build step, no dependencies. Fonts load from Google Fonts with system fallbacks.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Deploy

- **Vercel:** `npx vercel` in this folder (framework preset: Other).
- **GitHub Pages:** push to a repo, then Settings → Pages → deploy from the `main` branch root.
- **Nginx:** copy the folder to your web root, e.g. `/var/www/site`.

## Customising

- **Links:** edit the two `<a>` tags in `index.html`.
- **Swap the hero image:** replace `images/whale.webp` and `images/whale.jpg`.
- **Ripple strength:** change `scale` on the `#ripple` filter's `feDisplacementMap` (0 turns it off).
- **Turn off motion:** respected automatically for users with "reduce motion" enabled.
