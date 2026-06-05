# Rumi's Boutique Catering

Boutique catering website for Rumi's Catering in Toronto, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and a lazy-loaded Three.js tea scene.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## GitHub Pages Preview

This repo includes a GitHub Actions workflow that publishes a static preview to GitHub Pages on every push to `main`.

GitHub Pages cannot run Next.js serverless API routes, so the preview build uses `NEXT_PUBLIC_STATIC_PREVIEW=true` and shows a local success state for contact and booking submissions.

## Full Production Deploy

Deploy to Vercel or Netlify for live `/api/contact` and `/api/booking` endpoints. The API routes already validate requests and include `// TODO: add API key` comments where an email provider such as Resend or Formspree should be connected.

## Editable Content

Menu items, tea selections, pricing, contact details, and gallery captions live in:

```text
data/site.ts
```
