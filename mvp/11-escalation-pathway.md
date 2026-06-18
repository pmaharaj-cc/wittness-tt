# Escalation Pathway

## Principle

> Guardians on this app are **online volunteers**. In an emergency, call **999**. This app helps people know when a trip did not close on time and coordinates **human review** — not emergency dispatch.

## Escalation ladder

### Level 0 — Normal

Trip `In transit`. Watchers scroll; wait for end confirm.

### Level 1 — Overdue (soft flag)

**Trigger:** `now > ETA_end_effective + buffer_soft`

`ETA_end_effective` includes zone-pair baseline, rush-hour traffic factor, parent padding at create, and any **Running late** extensions. See [`13-traffic-and-eta.md`](13-traffic-and-eta.md).

| Context | buffer_soft (after effective window) |
|---------|--------------------------------------|
| Urban | +20 min |
| Rural | +35 min |
| School pre-auth | Scheduled window end |
| Parent extended recently | Timer reset — no L1 until new effective end passes |

**Actions:**

- Card turns **amber**; status `Overdue — awaiting parent`
- Feed priority boost
- Parent notification: *"Mark arrived safe, tap **Running late**, or PANIC if emergency"*
- Watcher confirms **disabled**
- Volunteer **overdue escalate disabled** if parent extended within last 20 min

### Level 2 — Stale (auto-escalation)

**Trigger:** Level 1 **and** either:

- Parent **silent 25+ min** after Level 1 nudge (no end confirm, no running-late extension), **or**
- `now > initial_window_max + buffer_hard` (absolute cap: +45 min urban / +75 min rural from trip START window)

Traffic alone must **not** reach L2 if parent keeps tapping **Running late — still safe** (max 3 extensions, then admin review).

**Actions:**

- Status `STALE — ESCALATED`
- Card **red**; pinned top nationally
- All Sentinels + founders notified
- Watcher confirms disabled; optional structured "local info" week 2
- Parent SMS with 999 guidance

**Volunteer accelerate:** Each unique overdue escalate (max 3/trip) shortens Level 2 timer by 50%. See [`12-volunteer-escalation-and-abuse.md`](12-volunteer-escalation-and-abuse.md).

### Level 3 — Panic (parent red button)

**Trigger:** Parent holds **PANIC** 3 seconds while `In transit` or overdue

**Actions (immediate):**

- Status `PANIC — ESCALATED`
- Red pin + admin alert (highest triage priority)
- Parent screen: **tap-to-call 999** + trip ID for operator
- Log timestamp + zones for handoff
- Watchers: witness only — **no confirm**

### Level 2.5 — Volunteer urgent concern

**Trigger:** Trusted watcher urgent flag — see doc 12

**Actions:**

- Admin queue + red visibility
- **Not** labeled PANIC unless parent also panics
- 3+ level-2+ urgent flags in 10 min → Level 3 **visibility** (not parent 999 screen)

## Priority score (admin triage)

```
priority =
  parent_panic           (+100)
  rural_corridor         (+30)
  child_trip             (+20)
  minutes_in_escalation  (+1 per min)
  volunteer_quorum_3     (+40)
  single_volunteer_flag  (+10)
```

Work highest score first. Public status page on surge:

> *"High alert day — 12 active escalations. We're responding in priority order."*

## Admin capacity modes

| Mode | Trigger | Behavior |
|------|---------|----------|
| **Normal** | < 5 active L2+ | Founders + Sentinels |
| **Surge** | 5–20 active | On-call rotation; extra parent SMS |
| **Circuit** | > 20 active OR > 50 escalations/hour | Throttle volunteer escalates 30 min; optional confirm pause |

## Level 4 — Authority handoff (off-platform)

Admin playbook:

1. Contact parent — confirm trip ID and zones
2. **Missing child / immediate danger** → insist **999**
3. **Late confirm only** → guide to end confirm; downgrade
4. Log outcome; apply strikes for false panic
5. Rural: set expectations on TTPS travel time

**Week 1:** no automated police API.

## Watcher behavior during escalation

| Event | Points |
|-------|--------|
| Normal confirm | Standard |
| Stale then safe close | No watcher penalty |
| Panic then resolved | Optional compassion bonus (workshop) |
| False panic trip | Void |

Watchers are **not** expected to confirm stale/panic trips.

## Related reading

- [`13-traffic-and-eta.md`](13-traffic-and-eta.md) — drive times, rush hour, running late
- [`12-volunteer-escalation-and-abuse.md`](12-volunteer-escalation-and-abuse.md)
- [`04-user-flows.md`](04-user-flows.md)