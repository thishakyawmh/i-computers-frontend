# I-Computers Store Frontend

React 19 + Vite storefront for the I-Computers e-commerce application.

## Requirements

- Node.js 20+
- npm
- The I-Computers backend API

## Setup

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Copy `.env.example` to `.env.local`.
3. Set:
   - `VITE_BACKEND_URL` to the backend API base URL, including `/api`
   - `VITE_GOOGLE_CLIENT_ID` to the Google OAuth web client ID used by the backend's Google login flow
   - `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for image uploads

   Vite variables are public and are embedded in the browser bundle. Never put private API secrets in variables prefixed with `VITE_`.

4. Start the frontend:

   ```bash
   npm run dev
   ```

5. Run quality checks:

   ```bash
   npm run lint
   npm run build
   ```

## Authentication notes

The frontend stores the JWT session token in browser local storage and sends it as a Bearer token to protected API routes. Browser storage is accessible to JavaScript, so keep dependencies updated, avoid unsafe HTML injection, and consider migrating to secure HttpOnly cookies if the backend is changed to support them.

Admin pages perform a server-side user lookup before rendering. The backend remains the authority for admin permissions; client-side route checks are only user experience controls.

## Deployment

Configure the Vite environment variables in the hosting platform and rebuild the frontend after changes. Keep `.env.local` out of source control. Do not publish demo account passwords in the repository README; create demo users through a controlled seed process and rotate any credentials that have been exposed.


## Image storage policy

The Supabase anon key is a public browser key, not a private service-role key. Configure the `images` storage bucket with strict Storage RLS policies and file-size/MIME restrictions. Do not expose a Supabase service-role key through a `VITE_` variable. For production uploads, prefer a backend-issued signed upload URL or a server-side validation flow.
