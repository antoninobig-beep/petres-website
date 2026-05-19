# Petres Website

Landing del Centro di Estetica Avanzata **Petres Montoro** — Metodo SYNERGIES.

- **Production:** https://petres-preview.vercel.app
- **Stack:** Vite + React + TypeScript + Tailwind + framer-motion + Lenis
- **Host:** Vercel (auto-deploy da `main`, preview automatica per ogni PR)

## Sviluppo locale

```bash
bun install           # o: npm install
bun dev               # parte su http://localhost:8080
```

Altri script utili:
- `bun run build` — build di produzione (output in `dist/`)
- `bun run preview` — serve la build locale per verifica
- `bun test` — Vitest

## Struttura

```
src/
├── App.tsx
├── main.tsx
├── pages/
│   ├── Index.tsx              # landing principale (compone le sezioni)
│   └── PaletteTest.tsx        # pagina di lavoro per design tokens
├── components/
│   ├── landing/               # tutte le sezioni della landing
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── MethodSection.tsx  # "SYNERGIES"
│   │   ├── ServicesSection.tsx
│   │   ├── TrustSection.tsx   # recensioni / "Dicono di noi"
│   │   ├── FAQSection.tsx
│   │   ├── BeforeAfterSlider.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── anim/                  # animazioni riusabili (RevealText, ecc.)
│   └── ui/                    # bottoni, card, primitives shadcn-style
├── hooks/
├── lib/
└── assets/                    # immagini hero, before/after, logo, ecc.
```

## Workflow di collaborazione

Vedi **[CONTRIBUTING.md](./CONTRIBUTING.md)** per il flusso completo. In breve:

1. Crea un branch da `main` (`feat/nome-modifica`)
2. Lavora e committa
3. Pusha e apri una **Pull Request** verso `main`
4. Vercel genera un **URL preview** automatico nel commento del PR
5. Attendi review + approval del maintainer
6. Una volta approvato, viene fatto il merge → deploy automatico in produzione

⚠️ Niente push diretti su `main`. Tutto passa per PR + review.

## Copy / contenuti

I testi della landing sono dentro `src/components/landing/*.tsx`.
Le immagini stanno in `src/assets/` (importate via `import` nei componenti)
o in `public/` (path assoluto `/...`).
