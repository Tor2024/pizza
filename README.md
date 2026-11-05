# L'Italiana Siegen — Pizzeria Website

Statische German-Language-Website für die Pizzeria L'Italiana in Siegen. Kein Build-System — plain HTML/CSS/JS.

## Seiten
- `index.html` — Landing (Hero, Showcase, Marquee, Ofen-Sektion, Menü-Highlights, Testimonials, FAQ, Vespa-Strip)
- `menu.html` — Speisekarte mit Kategorie-Filtern (Antipasti / Pizza / Bambini / Bevande)
- `uber-uns.html` — Geschichte, Timeline (Neapel→Siegen), Werte, Team
- `standorte.html` — 2 Standorte mit Karten, Anfahrt, CTA
- `catering.html` — 3 Pakete, Ablauf, CTA
- `kontakt.html` — Quick-Cards, Öffnungszeiten, Formular
- `impressum.html` / `datenschutz.html` — Rechtliches

## Lokal testen
```
npx http-server . -p 8124 -c-1
```
→ http://localhost:8124

## Features
- Scroll-driven animations (progressive enhancement via `animation-timeline: view()`)
- View Transitions (`@view-transition { navigation: auto; }`)
- „Jetzt geöffnet“-Indikator (Live-Status in der Header-Leiste)
- Marquee-Band, animierter Vespa-Delivery-Strip, Olive-Emblem-SVG
- Mobile-first, `prefers-reduced-motion` respektiert

## Stack
- Fonts: Outfit, Playfair Display, Cormorant Garamond (Google Fonts)
- Icons: Font Awesome 6.5.2 (CDN)
- Keine Dependencies, kein Build
