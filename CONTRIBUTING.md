# Contribuire al progetto Petres

Questo documento descrive il flusso di lavoro per chi contribuisce al repo.
**Tutte le modifiche al sito passano da una Pull Request con review.**

## Setup iniziale (una volta sola)

```bash
git clone https://github.com/antoninobig-beep/petres-website.git
cd petres-website
bun install            # oppure: npm install
bun dev                # http://localhost:8080
```

## Flusso per ogni modifica

### 1. Aggiorna `main` in locale

```bash
git checkout main
git pull origin main
```

### 2. Crea un branch dedicato

Naming convention:
- `feat/...`   nuove funzionalità o sezioni
- `fix/...`    bug fix
- `copy/...`   solo modifiche di testo / contenuti
- `style/...`  solo CSS / Tailwind / layout
- `chore/...`  config, dipendenze, build

Esempi:
```bash
git checkout -b feat/add-cookie-banner
git checkout -b fix/hero-mobile-overflow
git checkout -b copy/aggiorna-faq
```

### 3. Lavora e committa

Commit message in stile **conventional commits**, in italiano va benissimo:

```
feat: aggiungi banner cookie con consenso GA
fix: corretto overflow hero su iPhone SE
copy: aggiornata FAQ su tempi di consulenza
style: padding ridotto su ProblemSection mobile
```

Tieni i commit **piccoli e focalizzati**: un commit = un cambio logico.

### 4. Pusha e apri la PR

```bash
git push -u origin feat/add-cookie-banner
```

GitHub ti mostra un link "Compare & pull request": clicca.

Nella PR scrivi:
- **Cosa**: cosa hai cambiato (3-4 righe)
- **Perché**: motivo del cambio
- **Come testare**: screenshot, URL della sezione, eventuali edge case
- Se chiude un task: `Closes #N` (sostituisci N con il numero issue)

### 5. Aspetta la preview Vercel

Entro ~60-90 secondi, il bot **Vercel** commenta nel PR con un link tipo:
```
✅ Preview: https://petres-website-git-feat-add-cookie-banner-...vercel.app
```

Quello è il sito **con le tue modifiche live** — verifica tu stesso che funzioni
prima di chiedere review.

### 6. Review

Il maintainer apre la preview, lascia commenti, eventualmente chiede modifiche.
Se chiede cambi:
```bash
# fai i fix
git add .
git commit -m "fix: address review comments"
git push
# la preview Vercel si aggiorna da sola
```

### 7. Merge

Una volta approvato (✅ green), il maintainer fa **"Squash and merge"**.
Il deploy in produzione parte automaticamente.

Dopo il merge puoi cancellare il branch locale:
```bash
git checkout main
git pull
git branch -d feat/add-cookie-banner
```

## Cosa NON fare

- ❌ Push diretti su `main` (sono bloccati comunque)
- ❌ Force push su branch condivisi
- ❌ Commit di `node_modules`, `dist`, `.env`, file `.DS_Store` (sono già in `.gitignore`)
- ❌ Aggiungere segreti (API key, token) nel codice — usa env var su Vercel
- ❌ Includere immagini sopra i 500 KB senza ottimizzarle prima (usa WebP/AVIF dove possibile)

## Domande / Bloccato

Apri una **Discussion** su GitHub o scrivimi su WhatsApp.
