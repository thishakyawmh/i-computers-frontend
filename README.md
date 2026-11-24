# iComputers Frontend

React-based storefront and administration interface for the iComputers application.

## Technology

- React 19
- Vite
- React Router
- Material UI / Emotion
- Supabase client
- Axios

## Requirements

- Node.js 20 or later
- npm
- Access to the configured backend API

## Local development

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local `.env` file:

   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

   Replace the URL with the backend API address used by your environment.

4. Start the development server:

   ```bash
   npm run dev
   ```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## Environment and security

- Do not commit `.env` files, access tokens, passwords, or private keys.
- Only expose values prefixed with `VITE_` that are safe to be included in a browser bundle. Never put backend secrets in frontend environment variables.
- Demo account credentials must be provisioned through a controlled process and must never be documented in a public repository.
- Rotate any credentials that were previously published. Removing them from this README does not remove them from Git history.

## Deployment

Configure `VITE_BACKEND_URL` in the deployment platform's environment settings, then run `npm run build`.
