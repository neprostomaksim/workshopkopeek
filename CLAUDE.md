# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **Claude Design (claude.ai/design) handoff bundle**, not a production app. A user mocked up a landing page in the DC (Design Component) HTML/CSS/JS framework and exported it so a coding agent can rebuild it for real. Read `README.md` first — it states the handoff intent.

The single design is [project/Воркшоп ИИ-агенты.dc.html](project/Воркшоп%20ИИ-агенты.dc.html): a one-page Russian-language sales landing for an in-person AI-agents workshop ("Собери своего ИИ-агента", Minsk, 31 July, 65 BYN). It is the primary deliverable — read it top to bottom before implementing.

## Your job

Recreate the design **pixel-perfectly in whatever stack fits the target codebase** (React, Vue, native, etc.). Match the visual output; do not port the DC prototype's internal structure unless it happens to fit. Everything you need — dimensions, colors, layout, copy — is in the source; read the HTML/CSS directly rather than rendering or screenshotting (per README instructions), unless the user asks.

## No build / test / lint

There is no package.json, build system, or test suite. `support.js` and `image-slot.js` are **vendored, generated runtime** files (`support.js` header: "GENERATED from dc-runtime/src/*.ts — do not edit"). Do not edit them and do not treat them as source to reimplement — they are the DC framework, not part of the design.

## DC template anatomy (`.dc.html`)

Understanding this file requires knowing the DC conventions, since it is not plain HTML:

- **`<x-dc>`** wraps the template; **`<helmet>`** holds head content (fonts, `<style>`). A minimal React-like runtime in `support.js` mounts it (needs `window.React` / `window.ReactDOM`).
- **`{{ expr }}`** interpolation binds to values returned by `renderVals()` in the `<script data-dc-script>` block — a `class Component extends DCLogic` with `state`, `componentDidMount`/`componentWillUnmount`, and event handlers (e.g. `{{ item.toggle }}`, `onClick="{{ scrollToProgram }}"`).
- **`<sc-for list="{{ faqs }}" as="item">`** is the loop primitive; FAQ items are generated from `faqData` in the script.
- **`<image-slot id="…" …>`** (defined in `image-slot.js`) is a user-fillable image placeholder — every hero shot, logo, and photo in the design. Each needs a unique `id`. In the target rebuild these become real `<img>`/asset slots; the `placeholder` attribute text describes what goes there.
- URLs (`PAYMENT_URL`, `TELEGRAM_URL`, `CONTACT_URL`) are stubbed to `"#"` in `renderVals()` — real links must be wired during implementation.

## Design system (extract these tokens when rebuilding)

Defined as CSS custom properties in the `<style>` block:

- Dark theme: `--bg:#0B0C0E`, `--bg-2:#101215`; text `--text:#F2F4F5`, `--text-dim` at 62% opacity.
- Accent lime: `--lime:#C6F432` (+ `--lime-soft`); used for CTAs, eyebrows, stat numbers.
- Glass morphism: `--glass`/`--glass-strong` with `backdrop-filter: blur(...) saturate(140%)` and inset top highlight — the core surface treatment for cards, header, price box.
- Type: **Montserrat** (body/headings) + **JetBrains Mono** (`.mono` — dates, prices, stats, numbers), from Google Fonts.
- Motion: `.reveal` elements fade/translate in via `IntersectionObserver`; sticky header and mobile bar toggle on scroll thresholds (80px / 460px). All animation is gated behind `prefers-reduced-motion`.

Page sections in order: sticky header, hero, pain grid, "shift" statement, program (4 cards), format (3 cards), speaker bio, price card, FAQ accordion, final CTA, footer, mobile sticky bar. Breakpoint at `max-width:767px` collapses grids to single column and reveals the bottom bar.

## When in doubt

Per README: if scope or intent is ambiguous, ask the user to confirm before implementing rather than guessing.
