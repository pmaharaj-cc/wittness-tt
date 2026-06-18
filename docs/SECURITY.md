# Security and privacy

## For visitors

- The **live demo** runs entirely in your browser. Trip data stays in **localStorage** on your device. Nothing is sent to a WiTTness server because there is no backend yet.
- Do not enter real child names, phone numbers, or home addresses in the demo. Use zones only.

## For the maintainer (Pranav Maharaj)

### Repo hygiene

- **No API keys, passwords, or `.env` files** belong in this repository.
- Git author email should remain a GitHub noreply address: `pmaharaj-cc@users.noreply.github.com`.
- Do not add personal email, phone, or local machine paths to docs or commits.

### GitHub account hardening

1. Enable **two-factor authentication** on your GitHub account.
2. Disable public **Issues** and **Discussions** on this repo unless you actively moderate them:
   - Repo → **Settings** → **General** → **Features** → uncheck **Issues** and **Discussions**.
3. Review **Settings** → **Password and authentication** → **SSH and GPG keys** periodically.
4. If someone forks this repo to impersonate it, point people only to:
   - https://github.com/pmaharaj-cc/wittness-tt
   - https://pmaharaj-cc.github.io/wittness-tt/

### If you build production later

- Use environment variables and GitHub Secrets for Supabase, Twilio, etc.
- Never commit service role keys.
- See [`mvp/09-tech-sketch.md`](../mvp/09-tech-sketch.md) for planned stack.

### Reporting problems

This is an open concept and demo, not an emergency service. For immediate danger in Trinidad and Tobago, call **999**.