# Security policy

## Supported scope

This repository ships a **static demo** and **open specifications** only. There is no production backend, database, or authenticated service in this repo.

**Supported:** the live demo at https://pmaharaj-cc.github.io/wittness-tt/ and files on the `main` branch of https://github.com/pmaharaj-cc/wittness-tt

## Demo privacy

- Trip data is stored in the visitor's browser (`localStorage`) only.
- Do not enter real child names, phone numbers, or home addresses in the demo.
- The demo loads Google Fonts from Google servers (standard third-party request).

## Reporting a security issue

If you find a problem in the **public demo or repo** (XSS, dangerous dependency, exposed secret, etc.):

1. Do **not** open a public GitHub Issue with exploit details.
2. Contact the maintainer through the same channel you used to find this project (e.g. X reply or DM to **Pranav Maharaj** / **@pmaharaj-cc**), with a short description and steps to reproduce.

We will acknowledge valid reports and fix demo issues in this repository when appropriate.

## For maintainers

- Never commit API keys, `.env` files, or local machine paths.
- Use GitHub noreply email for commits: `pmaharaj-cc@users.noreply.github.com`.
- Future production builds must keep secrets in environment variables or GitHub Secrets, not in git.

## Emergency

WiTTness is not an emergency service. In immediate danger in Trinidad and Tobago, call **999**.