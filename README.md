# xero-oauth-callback

Static OAuth 2.0 redirect (callback) page for Tatus Consultancy's Xero
integration, served via GitHub Pages at **https://xero-oauth.tatus.co.za/**.

## What it is
When you approve access in Xero during the Authorization Code Grant, Xero
redirects your browser here with `?code=…&state=…`. This page just reads
those values out of the URL and displays them for you to copy back into the
reporting tool (`python3 xero_auth.py <client>`).

## Why it's public and safe
- It is **static HTML/JS only** — no server, no backend, no database.
- It **never sees the `client_secret`** and never performs the token exchange;
  that happens locally in the private reporting tool.
- The authorization code it displays is single-use, short-lived and worthless
  without the client secret, so there are no secrets to protect here.
- URL values are shown in read-only inputs (never parsed as HTML), and a strict
  Content-Security-Policy blocks any script other than `app.js`.
