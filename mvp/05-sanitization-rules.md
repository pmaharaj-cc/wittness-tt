# Sanitization Rules

Non-negotiable for any public or volunteer-visible surface.

## Never expose

- Child or parent legal name
- Phone numbers, email, home address
- Full licence plate (MVP: omit or last 3 + colour optional)
- Driver identity or national ID
- Payment information
- Exact GPS coordinates
- Historical unrelated trips

## Expose (watchers)

| Field | Example |
|-------|---------|
| Trip ID | `#K7M` |
| Status | `In transit` / `Escalated` |
| From / to zone | `Moruga → San Fernando` |
| Destination type | Family home, school, lessons |
| ETA window | `14:00–14:45` |
| Risk band | `Rural · priority` |
| Sync badge | `Single party` |
| Confirm count | `4 / 10` |
| Escalation flags | `Volunteer urgent: 2/3` |

## Parent-facing (private)

Parents see full trip detail on their account only — still avoid storing more than necessary.

## Form enforcement (MVP)

- Destination = dropdown types + zone picker — **no free address**
- Optional note field → AI + regex screen before save
- Reject posts containing phone patterns, email, `@` handles

## AI assist limits

| Task | Action |
|------|--------|
| PII in notes | Hold for admin or auto-reject |
| Toxic language | Queue for review |
| "Is trip safe?" judgment | **Never automated** |

## Retention

- Active trips: life of trip + 24h
- Completed trips in feed: remove within 1h (configurable)
- Escalation logs: 90 days for admin — workshop legal minimum

## Related reading

- [`07-moderation.md`](07-moderation.md)
- [`../concept/04-constraints.md`](../concept/04-constraints.md)