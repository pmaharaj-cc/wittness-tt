# Scaling for T&T

## Population context

- ~1.4M population nationally
- Daytime online pool: potentially 5k–50k willing participants over time
- **MVP week 1:** 50–200 Guardians, 10–20 parents (invite-only)

## National pool, not parish silos

Urban watcher surplus covers **rural** trips — a POS retiree can confirm a Moruga delivery. Recruitment copy:

> *"One scroll, help a child in Cedros."*

## Per-trip confirm math

| Parameter | Default | Notes |
|-----------|---------|-------|
| M (max confirms) | 10 | Hard cap per trip |
| K (quorum) | 5 | "Fully witnessed" |
| N (ping pool) | All on-duty feed viewers | No push week 1 |

**Rural workshop:** K=7 for higher trust? Trade-off: slower close.

## Rate limits

| Limit | Value |
|-------|-------|
| Confirms per watcher per hour | 20 |
| Trips per parent per day | 5 |
| Volunteer escalations per user per day | 5 |

## Metrics to track

- Median time from end confirm → K quorum (urban vs rural)
- Active watchers / active trips ratio (target > 5:1)
- Escalation rate per 100 trips
- Circuit mode activations

## Recruitment channels

- Facebook groups (community safety, women's groups, parish pages)
- Word of mouth from founders
- **Not** TikTok ads week 1 — audience scrolls TT but shares on FB/WhatsApp

## Bad day capacity

Assume 5–20 simultaneous escalations on worst news day. Plan Sentinel on-call rotation before public launch.

See [`11-escalation-pathway.md`](11-escalation-pathway.md) surge modes.

## Growth phases

| Phase | Watchers | Parents | Notes |
|-------|----------|---------|-------|
| Beta | 50–200 | 10–20 | Invite-only |
| Soft launch | 500 | 100 | Phone verify |
| Public | 5k+ | 1k+ | Circuit tested |

## Related reading

- [`10-destinations-and-geography.md`](10-destinations-and-geography.md)
- [`12-volunteer-escalation-and-abuse.md`](12-volunteer-escalation-and-abuse.md)