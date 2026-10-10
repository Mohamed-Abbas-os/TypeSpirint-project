# TypeSprint — Implementation & Design Plan

## Scope

Build a fully functional, static-first typing speed and practice platform that runs in the browser, stores only lightweight user preferences/history locally, and remains deployable without a backend or paid runtime dependency.

## Implementation approach

- **Static multi-page site:** individual HTML entry points for home, typing test, practice, lessons index, ten lesson articles, about, contact, privacy, terms, and 404.
- **Vanilla ES modules:** shared modules for app shell/navigation, theme preferences, safe localStorage access, typing engine, results/history, passage selection, dashboard rendering, and page-specific controllers.
- **Data-driven passages:** `assets/data/passages.json` with original passages grouped by category/difficulty plus daily challenge content. A custom-text path is validated client-side and never uploaded.
- **Typing engine:** immutable reference passage rendered as spans; a hidden/visually styled text input captures keystrokes; a single state machine handles idle, running, paused, cancelled, and complete states. The clock uses `performance.now()`/timestamps, not interval counts. Input is compared by index, supports corrections/backspace, has explicit paste behavior, and cleans up the timer on every terminal transition.
- **Metrics:** standard five-characters-per-word WPM. Gross WPM = `(typed characters / 5) / elapsed minutes`; net WPM = `gross WPM - (incorrect characters / 5) / elapsed minutes`; accuracy = `correct characters / total typed characters * 100`, with safe zero-input handling. Results will show the formulas and meaningful empty-state messaging.
- **Local dashboard:** a namespaced, versioned storage adapter catches unavailable/corrupt storage, persists preferences, history, personal bests, and daily-challenge records, and exposes clear/reset/export operations.
- **Shared UI shell:** every page receives consistent header/footer, theme toggle, mobile menu, breadcrumbs where relevant, metadata, accessible focus states and reduced-motion behavior.
- **SEO/static hosting:** relative paths, canonical configuration in `assets/js/site-config.js`, `robots.txt`, `sitemap.xml`, `404.html`, Open Graph metadata, favicon, and `manus-routes.json`. The final deployment URL remains a documented configuration value instead of being invented.
- **AdSense preparation:** disabled-by-default ad slots are generated only when explicitly enabled in the site config; no publisher ID, ad script, fake `ads.txt`, or misleading ad container is shipped by default.
- **Testing/documentation:** add `README.md`, `TESTING.md`, and a GitHub Actions workflow suitable for static validation/deployment. Use lightweight Node scripts for HTML/link/JSON smoke checks without adding a runtime dependency.

## Site structure

```text
/home/ubuntu/typesprint/
├── index.html
├── typing-test.html
├── typing-practice.html
├── typing-lessons.html
├── about.html
├── contact.html
├── privacy-policy.html
├── terms.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── manus-routes.json
├── README.md
├── TESTING.md
├── plan.md
├── .github/workflows/static-site.yml
├── assets/
│   ├── css/style.css
│   ├── data/passages.json
│   ├── icons/favicon.svg
│   └── js/
│       ├── app.js
│       ├── site-config.js
│       ├── storage.js
│       ├── theme.js
│       ├── passages.js
│       ├── typing-engine.js
│       ├── results.js
│       ├── dashboard.js
│       ├── typing-test-page.js
│       └── practice-page.js
└── lessons/
    ├── index.html
    ├── improve-typing-speed.html
    ├── what-is-wpm.html
    ├── typing-accuracy.html
    ├── proper-finger-placement.html
    ├── touch-typing-beginners.html
    ├── practise-without-looking.html
    ├── common-typing-mistakes.html
    ├── daily-typing-routine.html
    ├── typing-tests-for-students.html
    └── keyboard-practice-exercises.html
```

## Design direction

- **Design movement:** Editorial productivity tool meets quiet neo-brutalism: structured, tactile and confident without looking like a game dashboard.
- **Core principles:** (1) focus before decoration, (2) visible progress, (3) calm confidence, (4) every control earns its place.
- **Color philosophy:** warm paper (`#f6f4ef`) and ink (`#202321`) establish a study-desk feel; deep teal (`#0e6b65`) is the ownable brand color for focus and progress; signal coral (`#e9785b`) is reserved for mistakes and secondary emphasis. Dark mode inverts the paper/ink relationship while retaining teal for recognition.
- **Layout paradigm:** asymmetric editorial rails rather than a centered card grid: a left-hand section index/eyebrow, wide content column, and offset metrics rail. Typing views use a single focused workbench with results and guidance below.
- **Signature elements:** a small “TS” sprint-mark with two offset bars; pill-shaped status chips for difficulty/duration; a thin vertical progress rail that becomes a horizontal progress bar on mobile.
- **Interaction philosophy:** controls feel immediate and forgiving. Start, pause, retry and theme actions use clear verbs. Focus is visually obvious. Feedback distinguishes “correct” from “keep going” instead of shaming errors.
- **Animation:** short opacity/translate transitions for panels and navigation; subtle progress motion only while active; no decorative looping animation; all motion is disabled or minimized under `prefers-reduced-motion`.
- **Typography system:** system sans stack for navigation and prose (`Inter`, `ui-sans-serif`, `system-ui`) with `ui-monospace`, `SFMono-Regular`, `Menlo`, `Consolas` for passages and metrics. Large display type is tight and editorial; body copy stays at comfortable reading width.
- **Brand essence:** A focused, privacy-first typing coach for learners and professionals who want clear feedback without accounts or clutter. Personality: **focused, encouraging, precise**.
- **Brand voice:** direct, warm, practical. Example lines: “One clean minute beats ten distracted ones.” and “Let the next keystroke be the easy one.”
- **Wordmark & logo:** a compact `TS` mark formed from a forward-leaning sprint bracket and twin baseline bars, paired with the TypeSprint wordmark in a high-contrast weight.
- **Signature brand color:** deep teal `#0e6b65`, used as the primary action and focus color across light/dark themes.

## Build workflow

1. Confirm this plan and make any requested scope/design revisions.
2. Create the native task list or a complete `TODO.md` with acceptance clauses from the brief.
3. Configure host-managed diagnostics for HTML/CSS/JavaScript/JSON before the first application code batch.
4. Author the static source, content, data and documentation in focused batches.
5. Start the configured preview server on `0.0.0.0:3000` with a no-dependency static server; verify readiness and `/manus-routes.json`.
6. Run automated smoke checks for syntax, JSON, routes, links, required metadata and static asset existence; inspect diagnostics and fix confirmed issues.
7. Use the Webdev preview/screenshot tooling for responsive visual verification at desktop and mobile widths if needed.
8. Commit the complete website to the canonical `main` branch so the Webdev checkpoint is recorded. Do not publish automatically unless the user explicitly requests publication and the project state permits it.

## Constraints and honest boundaries

- No account system, server, paid API, tracking script, global leaderboard, cross-device sync, fabricated reviews, fabricated AdSense identifiers, or unsupported scientific claims.
- The final canonical/sitemap domain is a configuration point. Until a real production URL is supplied, use a documented example value only in development and do not claim it is live.
- The site can be complete and previewable without publication; any unverified deployment-host terms or untested browser edge cases will be documented in `TESTING.md` rather than overstated.
