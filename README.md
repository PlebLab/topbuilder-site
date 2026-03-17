# TopBuilder Next.js Rebuild

Next.js recreation of `topbuilder.dev` to replace Framer-hosted delivery and deploy on a VPS.

## Local Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Project Layout

- `src/app/page.tsx`: Landing page composition
- `src/data/topbuilder-content.ts`: Editable content model
- `src/app/globals.css`: Visual system and responsive styles
- `Dockerfile`: Production image
- `docker-compose.yml`: VPS service orchestration
- `Caddyfile`: HTTPS reverse proxy config

## VPS Deployment

1. Set DNS A records for `topbuilder.dev` and `www.topbuilder.dev` to your VPS.
2. On VPS, clone repo and enter `site/`.
3. Update `Caddyfile` domain values if needed.
4. Start services:

```bash
docker compose up -d --build
```

5. Verify:

```bash
curl -I https://topbuilder.dev
```

## Migration Notes

The migration plan is documented in:

- `../llm/project/topbuilder-migration-plan.md`

