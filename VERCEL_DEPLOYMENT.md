# Vercel deployment

Import this repository as its own Vercel project. The framework preset should be Next.js and the repository root is the project root.

Configure this environment variable for Production (and Preview only if preview deployments should call the production API):

```dotenv
NEXT_PUBLIC_API_URL=https://api.example.com/api
```

After assigning the final Vercel custom domain, set the same origin (without a trailing slash) as `FRONTEND_URL` in the backend `deployment/api.env`, then recreate the backend containers so Laravel reloads its cached configuration.

The API domain must already be online over HTTPS before building this project. Product images are loaded from the API `/storage/` endpoint; the Next configuration derives the permitted image hostname from `NEXT_PUBLIC_API_URL` at build time.

Run `npm run lint` and `npm run build` before promoting a deployment.
