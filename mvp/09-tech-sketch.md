# Tech Sketch — Week 1

Concept-level stack choice at implementation time. **Not built in this documentation phase.**

## Recommended path

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | **Next.js PWA** | Mobile scroll UX; fast deploy |
| Backend / DB | **Supabase** | Trips, confirms, escalations, auth |
| Hosting | Vercel + Supabase cloud | Low ops for beta |
| Realtime | Polling 30s week 1; Supabase realtime week 2 | Simplicity |
| AI mod | Edge function on note fields | PII/toxicity screen |
| SMS | Twilio (future) | `START`/`DONE` rural fallback |

## Core tables (sketch)

- `users` — role (parent, watcher, admin), trust_level, points
- `trips` — zones, type, status, risk_score, eta_end
- `confirmations` — user_id, trip_id, created_at
- `escalations` — type (panic, stale, vol_overdue, vol_urgent), trip_id
- `school_allowlist` — zone_id, name
- `circuit_events` — national rate limit state

## Key jobs

- `check_overdue_trips` — cron every minute → Level 1 / 2
- `check_circuit_breaker` — count escalations per 10 min window
- `compute_priority_score` — admin queue sort

## Scroll UX

- Touch swipe: Embla Carousel or native touch handlers
- Full-viewport CSS cards; amber/red border states

## Alternatives

| Option | When |
|--------|------|
| Discourse | If forum moderation > custom trip UX |
| Telegram bot | If angels prefer TG over web — week 2 |

## Security MVP

- Invite-only registration codes
- RLS on Supabase — watchers read sanitized view only
- Rate limit API routes (panic, escalate, confirm)

## Out of scope week 1

- Native apps
- WhatsApp Business API
- TTPS webhook

## Related reading

- [`01-mvp-scope.md`](01-mvp-scope.md)
- [`README.md`](README.md) launch checklist