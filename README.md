# TypeSprint

TypeSprint is a static, browser-only typing speed test and practice platform. It uses vanilla HTML/CSS/JavaScript modules, JSON passages and localStorage. Typed text and history stay in the browser; there is no account, backend, paid API or global leaderboard.

## Run locally

Use any static server from the project root. With Python 3:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Then open `http://localhost:3000/`. Opening HTML with `file://` is not supported because passages are loaded from JSON modules through `fetch`.

## Configure a real deployment URL

The current configuration is set to the GitHub Pages project URL shown in the project setup: `https://mohamed-abbas-os.github.io/TypeSpirint-project/`. If the repository name or account differs, update `assets/js/site-config.js`, canonical/Open Graph URLs, `robots.txt`, and `sitemap.xml` together. Asset and passage-data paths are relative to their modules so they work under a GitHub Pages repository subpath.

## Deploy

The project is plain static output: upload the repository contents to a static host that permits the intended use, or use the included GitHub Actions workflow for GitHub Pages. Review the selected host's current commercial and advertising terms before relying on it for monetization. Set the Pages source to the workflow when applicable and confirm direct page refreshes work for all HTML files.

## AdSense preparation

AdSense is disabled by default. When the site owner has approval and real identifiers, set `ads.enabled`, `ads.publisherId` and approved `ads.units` in `assets/js/site-config.js`, then add only the official script/configuration required by the account. Do not add an `ads.txt` record until Google supplies the actual publisher record. Keep placements away from typing input, timers, passage text and action buttons.

## Content and privacy

Passages are original TypeSprint content stored in `assets/data/passages.json`. Preferences, results and daily challenge progress are saved under one namespaced localStorage key. Clearing browser data removes local progress; it does not synchronize across devices. Review the Privacy Policy, Terms and host requirements before launch.

## Validation

See `TESTING.md` for the smoke checks and manual checks completed or still needing a real browser/production host. The project intentionally does not claim AdSense approval, revenue, a global ranking or cross-device synchronization.
