# Scroll Feed UX

## Audience

**Older chronically online Trinis**, especially women — already comfortable with TikTok/Facebook Reels infinite scroll. The feed must feel **enjoyable and purposeful**, not like civic homework.

## Layout

- Mobile-first **PWA** — full-viewport cards, large type, generous tap targets
- **Swipe up** → next trip
- **Pull refresh** → new trips
- Optional: soft haptic on confirm (device permitting)

## Trip card (sanitized)

Each card shows:

- Trip ID (e.g. `#K7M`)
- **Risk band** badge: `Rural · Family home` / `School run · pre-authorized`
- From zone → to zone
- ETA window
- Status: `In transit` | `Awaiting delivery` | `Overdue` | `Escalated` | `Closed`
- Confirm counter: `4 / 10 guardian confirmations`
- Sync badge: MVP default `Single party — priority watch`
- Destination type icon (home, book, school, pin)

## Feed sort order

1. **Escalated / Panic** (frozen top)
2. **Risk score** (rural + family home + overdue + single-party)
3. **Recency**

See [`10-destinations-and-geography.md`](10-destinations-and-geography.md) for risk formula.

## Watcher actions by state

| Trip state | Confirm delivery | Volunteer actions |
|------------|------------------|-------------------|
| In transit, on time | Disabled — wait | — |
| In transit, overdue | Disabled | **Escalate overdue** (trust ≥1) |
| Overdue (amber) | Disabled | Escalate overdue (diminished) |
| Awaiting delivery | **Enabled** | — |
| Escalated / Panic | Disabled | **Urgent concern** (trust ≥2) if allowed |
| Closed | Disabled | — |

## Confirm delivery

- Enabled only after parent **end confirm**
- Each trip accepts max **M = 10** confirmations
- Quorum **K = 5** marks trip fully witnessed
- After M: button shows `Fully witnessed`
- Points to responders within cap; early confirm bonus (workshop)

## Escalation visuals

| Level | Card treatment |
|-------|----------------|
| Overdue | Amber border |
| Stale / Panic | Red border; pinned nationally |
| Volunteer quorum | `2/3 urgent flags` progress bar |

## Watcher onboarding

~30 seconds:

1. Choose display name (pseudonym)
2. Optional parish
3. Pledge: *"I'm here to help children get home safe"*
4. Tutorial: 3 swipes + one practice confirm on demo card

## Contribution dashboard

- *"You helped X children home this week"*
- Rank flair on profile
- Parish mini-leaderboard

## Related reading

- [`04-user-flows.md`](04-user-flows.md)
- [`12-volunteer-escalation-and-abuse.md`](12-volunteer-escalation-and-abuse.md)