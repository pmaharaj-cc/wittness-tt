# Community Monitor Layer

## Vision

Mobilize T&T's **chronically online** population — especially older women scrolling TikTok at home — into **Guardians** who witness sanitized child trips remotely, earn points and rank, and optionally build a **remote-work credential**.

## Enjoyable interface (MVP shell)

Not an admin panel. A **vertical infinite scroll** of trip cards — familiar dopamine, one-tap confirm, contribution counter ("You helped 4 children home today").

## Sanitized feed

Monitors see trip ID, zones, ETA, status, tier/risk badge — never child name, phone, full plate, or exact address.

## Lifecycle-driven events

Monitor tasks bind to state changes:

- Trip opened (start confirm) → enters feed
- End confirm → confirm button enabled
- Quorum reached → trip closes for gamification
- Escalation → witness only; confirm disabled

## Tier-driven priority

- Tier 1 (single-party) and **rural high-risk** sort to top.
- More monitor attention where sync is weakest — not less.

## Gamification

Workshop terms: **Guardian Angel Points (GAP)** vs **True Trini Points (TTP)**.

- Delivery confirm: primary points
- Legitimate escalate: modest duty credit
- Bad-day badge: Surge Sentinel
- Trust levels → Sentinel admin promotion

## Employment signaling

Exportable profile: accuracy rate, tasks completed, rank — LinkedIn/Facebook share card.

## Risks

| Risk | Mitigation |
|------|------------|
| Vigilantism | No public driver names; escalate to admins only |
| False flags | Quorum, trust gates, strikes |
| Unpaid labor | Transparent; future paid tier open question |
| Trivializing child safety | Escalation path + 999 copy always visible |

## Convergence with MVP

The scroll-feed MVP **is** the thin shell of this layer. Full vision adds driver sync, tiers 2–3, route deviation — see [`../mvp/02-scroll-feed-ux.md`](../mvp/02-scroll-feed-ux.md).

## Related reading

- [`../mvp/06-gamification-terms.md`](../mvp/06-gamification-terms.md)
- [`../mvp/12-volunteer-escalation-and-abuse.md`](../mvp/12-volunteer-escalation-and-abuse.md)