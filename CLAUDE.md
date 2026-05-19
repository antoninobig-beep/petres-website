# CLAUDE.md — Brief AI agent per Petres Website

> Questo file viene letto da AI assistant (Claude Code, Cursor, Cody, ecc.) per
> capire come comportarsi nel repo. Tienilo aggiornato quando convenzioni o
> vincoli cambiano.

## Cos'è

Landing di **Petres Montoro** — Centro di Estetica Avanzata, Metodo SYNERGIES.

- **Stack:** Vite + React 18 + TypeScript + Tailwind + framer-motion + Lenis (smooth scroll)
- **Host:** Vercel (auto-deploy da `main`, preview per ogni PR)
- **Production:** https://petres-preview.vercel.app

## ⚠️ Regole non negoziabili

1. **Nessun push diretto su `main`.** Branch protection attiva, lo rifiuterà. Crea sempre un branch e apri PR.
2. **Niente commit di segreti / API key.** Le env var stanno su Vercel.
3. **Non rinominare file senza motivo.** Header, SideNav e altri componenti referenziano per ID (`#metodo-synergies`, `#chi-siamo`, `#recensioni`, `#faq`, `#consulenza`) — se cambi un id, aggiorna OVUNQUE.
4. **Mantieni la palette esistente.** Le variabili CSS sono in `src/index.css` (`--background`, `--background-soft`, `--on-dark`, `--on-dark-soft`, `--brand-accent`). Usa quelle, non hardcodare hex random.
5. **`prefers-reduced-motion`**: tutte le animazioni nuove devono avere fallback. Vedi pattern in `HeroSection.tsx`.
6. **Mobile-first.** Il sito è acceduto in prevalenza da iPhone. Tailwind: niente `md:` di default, usa breakpoint solo per migliorare desktop.

## Convenzioni di codice

- **Componenti**: PascalCase, un componente per file, export default in fondo.
- **Animazioni**: easing standard è `[0.22, 1, 0.36, 1]` (variabile `easeEver` o `EASE` in `src/lib/easing.ts`). Niente `ease: "linear"` o `ease-in-out` default.
- **Tailwind**: classes inline. Per logica di stato condizionale usa `clsx`/`cn` (`src/lib/utils.ts`).
- **Testi UI**: tutto in **italiano** (sito target). Eccezione: i bottoni e label di servizio possono essere in inglese se è branding (es. "SYNERGIES").
- **Naming**:
  - Branch: `feat/...`, `fix/...`, `copy/...`, `style/...`, `chore/...`
  - Commit: conventional commits in italiano va bene (`feat: …`, `fix: …`, `copy: …`)

## Struttura

```
src/
  pages/
    Index.tsx              ← compone le sezioni della landing
    PaletteTest.tsx        ← playground design tokens (non in prod)
  components/
    landing/               ← TUTTE le sezioni della landing
      HeroSection.tsx       ◆ scelte fatte: 125vh, no auto-scroll, testi ai lati
      ProblemSection.tsx
      MethodSection.tsx     ◆ id: #metodo-synergies
      ServicesSection.tsx
      TrustSection.tsx      ◆ recensioni / "Dicono di noi"
      FAQSection.tsx
      BeforeAfterSlider.tsx ◆ touchAction: pan-y, NO data-lenis-prevent
      Header.tsx + SideNav.tsx ◆ entrambi referenziano gli stessi anchor id
      SectionTransition.tsx ◆ per fade tra sezioni con bg diversi
    anim/                  ← componenti animazione riusabili (RevealText)
    ui/                    ← primitives shadcn-style (Button, Card, ecc.)
  lib/
    easing.ts              ← easing curves (ease standard del progetto)
    utils.ts               ← cn() per classnames
  hooks/
  assets/                  ← immagini importate via `import` nei componenti
public/                    ← favicon, og-image, robots.txt
```

## Gotcha noti (errori comuni che la AI tende a fare)

1. **NON rimettere `data-lenis-prevent` sul BeforeAfterSlider.** Lo abbiamo
   tolto apposta perché causava bounce di scroll su/giù. Vedi commit history.

2. **NON aggiungere `touch-action: none` sullo slider.** Usiamo `pan-y` così
   lo scroll verticale mobile passa attraverso lo slider.

3. **NON cambiare la `height` della HeroSection senza ricalibrare gli altri
   parametri.** L'altezza section, `endFade` range, e `photoScale` sono
   correlati. Se cambi uno, leggi i commenti dentro `HeroSection.tsx`.

4. **NON disabilitare Lenis globalmente.** Se serve disabilitarlo solo per
   un elemento, usa `data-lenis-prevent` SOLO se quell'elemento ha scroll
   interno proprio (es. modale scrollabile). Non per slider draggable.

5. **NON usare `motion.div` ovunque.** È costoso. Per fade semplici al
   mount basta una classe Tailwind con transition.

6. **NON pushare `node_modules/`, `dist/`, `.env*`** — sono in `.gitignore`
   ma a volte le AI tentano lo stesso.

## Comandi utili

```bash
bun install            # setup
bun dev                # http://localhost:8080
bun run build          # build prod in dist/
bun run lint           # eslint
bun test               # vitest
```

## Quando in dubbio

Apri una **Draft PR** invece di una PR normale, e chiedi review al maintainer.
Le Draft PR generano comunque la preview Vercel ma segnalano "work in progress".

## Tu, agente AI

- **Se l'utente chiede modifiche**: prima leggi i file rilevanti, poi proponi un diff.
  Non riscrivere file interi a meno che l'utente non lo chieda esplicitamente.
- **Niente console.log di debug** lasciati nel codice finale.
- **Niente librerie nuove** senza chiedere prima — il `package.json` è curato.
- **Niente `any` di TypeScript** se puoi evitarlo. Tipa veramente.
- **Quando suggerisci un cambio importante** (refactor cross-file, nuova
  dipendenza, rimozione di feature), CHIEDI conferma prima di scrivere il diff.
