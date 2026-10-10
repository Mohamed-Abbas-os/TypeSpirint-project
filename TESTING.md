# TypeSprint testing checklist

## Automated smoke checks

Run the repository smoke script after edits:

```sh
node scripts/smoke-check.mjs
```

It verifies required HTML files, JSON validity, the route manifest shape, local asset references and internal links. It does not replace a real browser test.

## Manual checks

- Select 15, 30, 60 and 120 seconds and confirm the timer starts only after Start or the first valid character.
- Confirm correct, incorrect, current-character, backspace, correction, paste, pause, resume, cancel, timeout, completion, restart and retry behavior.
- Confirm gross WPM, net WPM, accuracy and character counts against hand calculations using the five-character word standard.
- Test empty input, a custom passage, a long passage, repeated attempts and daily challenge repeat attempts.
- Confirm local preferences, saved results, personal bests, history clearing, CSV export, corrupted storage fallback and reset-all behavior.
- Check home, test, practice, lesson, legal and 404 navigation, direct refreshes, theme toggle, mobile menu, keyboard focus and reduced-motion behavior.
- Inspect mobile virtual-keyboard usability at 320, 375 and 430 pixels, then tablet/desktop at 768, 1024 and 1440 pixels.
- Inspect the raw HTML for meaningful body content, unique title/description/canonical/Open Graph metadata, favicon, sitemap and robots documents.
- Confirm the site makes no network request for typing history or typed text. The JSON passage fetch is the only required runtime data request.
- Confirm disabled ads remove their containers and never appear in the typing surface.

## Not claimed without production verification

AdSense approval, revenue, host-specific commercial permission, cross-device synchronization, global competition, native share support on every browser and perfect behavior of every mobile virtual keyboard are not claimed by this project. The final canonical origin and sitemap must be configured by the owner before publication.
