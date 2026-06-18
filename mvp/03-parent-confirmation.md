# Parent Confirmation Rules

## ETA window at registration (before START)

Parents confirm a **realistic arrival window**, not a guess:

1. App looks up **zone pair** baseline (e.g. Moruga → San Fernando: 50–90 min)
2. Applies **traffic factor** for time of day (school rush ×1.4, etc.)
3. Shows: *"Expected arrival **14:00–15:30**"* — parent can widen +15 / +30 min

Escalation timers use this window + extensions — see [`13-traffic-and-eta.md`](13-traffic-and-eta.md).

While in transit, parent can tap **Running late — still safe** (+15 / +30 / +45) to push timers without triggering stale escalation.

## Default: two parent taps

### 1. Start confirm

Parent taps when child **enters the vehicle** (or leaves home for pickup).

- Trip moves from `Draft` → `In transit`
- Trip **enters Guardian feed**
- Without start confirm, trip stays draft — **not shown to watchers**

### 2. End confirm

Parent taps **"Arrived safe"** at destination.

- Unlocks watcher **Confirm delivery**
- Starts quorum countdown

**Rationale:** Parent attests to both ends; watchers are the **second layer**.

## Destination-specific rules

| Destination type | Start | End | Notes |
|------------------|-------|-----|-------|
| **Registered school** | Pre-auth recurring | **Exempt** at bell time | See school exception below |
| **Family home** | Required | Required | Most common unofficial case |
| **Lessons / classes** | Required | Required | Venue staff not involved |
| **Sports / church / clinic** | Required | Required | — |
| **Other zone** | Required | Required | Zone picker only |

## School exception — no routine interference

When destination is a **pre-registered school** on the allowlist:

| Aspect | Behavior |
|--------|----------|
| Daily parent end tap | **Not required** at arrival/bell |
| Setup | Parent pre-authorizes AM/PM school run once |
| Auto-close | At ETA in school zone window → `Awaiting watcher confirm` |
| School staff | **Zero** app duties — no teachers, no office |
| Parent notification | Optional EOD: *"PM school trip — 6 guardians confirmed"* |
| Feed label | `School run · pre-authorized` |

**What we avoid:** interrupting class, office logistics, or car-park admin.

## Recurring lessons (optional, week 2)

Same pattern as school: parent pre-authorizes Tue/Thu pan yard — **no venue staff involvement**.

## Non-school destinations

Home, granny, lessons, church: **both start and end required every trip**.

## Panic button

Always visible on parent trip screen while `In transit` or overdue:

- Red **"PANIC — I need help now"**
- **Hold 3 seconds** to activate (mis-tap protection)
- See [`11-escalation-pathway.md`](11-escalation-pathway.md)

Trips without start confirm **cannot** panic (must be `In transit`).

## SMS fallback (rural)

```
START K7M   → start confirm
DONE K7M    → end confirm
PANIC K7M   → hold via SMS reply confirm chain (workshop)
```

## Related reading

- [`10-destinations-and-geography.md`](10-destinations-and-geography.md)
- [`04-user-flows.md`](04-user-flows.md)