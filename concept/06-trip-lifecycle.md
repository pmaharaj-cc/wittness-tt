# Trip Lifecycle

The spine of the full vision: every feature hangs on **seamless initiation and completion**.

## States

```
Draft → Initiated → InTransit → Delivered → Completed
                    ↓           ↓
                 Overdue      Panic
                    ↓           ↓
                 Stale ───→ Escalated → Resolved | AuthorityHandoff
```

| State | Meaning |
|-------|---------|
| **Draft** | Parent entered details; start not confirmed |
| **Initiated** | Parent start confirm; child aboard |
| **InTransit** | Active journey (MVP primary state) |
| **Delivered** | Parent end confirm; awaiting watcher quorum |
| **Completed** | Quorum met; trip archived |
| **Overdue** | Past ETA + buffer, no end confirm |
| **Stale** | Auto-escalation after extended overdue |
| **Panic** | Parent red button |
| **Escalated** | In admin triage queue |
| **Resolved** | Closed safely or administratively |
| **AuthorityHandoff** | Parent directed to 999 / TTPS |

## Seamless rules

- **< 30 seconds** to initiate (guardian path)
- **< 15 seconds** to close after arrival
- **Offline-tolerant** — actions queue; sync on reconnect
- **One action per party** to upgrade tier — not re-registration

## Initiation paths (long-term)

### Path A — Guardian-first

Guardian sends plate/QR + zone + gets trip code → driver confirms → optional child verbal code.

### Path B — Driver-first

Driver opens trip → guardian confirms within window before feed exposure.

### Path C — Recurring (school / weekly lessons)

Pre-authorized schedule; daily opt-out only.

## Completion signals (multi-signal)

| Signal | Priority |
|--------|----------|
| Guardian "Arrived safe" | Primary |
| Driver "Dropped off" | Secondary (pending guardian ack) |
| ETA + geofence | Future — not MVP |
| Watcher quorum | Witness layer — not sole closer |

## Tier upgrades during lifecycle

Init tier set at open; can **upgrade live** before departure if driver/child sync arrives. Log **tier at close** for trust history.

## MVP mapping

Week 1 implements: Draft → InTransit (start) → Delivered (end) → Completed (quorum), plus Overdue / Stale / Panic / Escalated. See [`../mvp/03-parent-confirmation.md`](../mvp/03-parent-confirmation.md) and [`../mvp/11-escalation-pathway.md`](../mvp/11-escalation-pathway.md).

## Related reading

- [`07-initialization-tiers.md`](07-initialization-tiers.md)
- [`../mvp/11-escalation-pathway.md`](../mvp/11-escalation-pathway.md)