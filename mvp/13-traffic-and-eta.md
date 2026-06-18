# Traffic and ETA — Avoiding False Stale Escalations

## Problem

Fixed timers assume trips finish by `ETA_end + 15 minutes`. In Trinidad that breaks often:

- **School-run rush** (6:30–8:30, 14:00–16:00) — Churchill-Roosevelt, EMR, Solomon Hochoy crawl
- **Rain** — instant gridlock
- **Accidents / protests** — unpredictable multi-hour delays
- **Rural legs** — distance is fine but road quality and single-lane stretches add variance
- **Hire culture** — driver picks up another fare, stops for gas; parent may know and accept delay

A system that escalates on clock alone will **cry wolf**, burn WiTTness trust, and trigger Circuit mode on a normal Tuesday.

**Design rule:** Escalation measures **worry**, not **lateness**. Lateness is expected; **silent lateness** is the signal.

---

## Layer 1 — Realistic ETA at trip creation (not one number)

Parents never pick a single arrival time. They pick or confirm a **window**:

```
ETA_window = baseline_drive(from, to) × traffic_factor(time_of_day) + parent_padding
```

### Zone-pair baseline (MVP lookup table)

Static matrix: typical **hire-car minutes** between zones (not GPS). Examples:

| From → To | Baseline (min) | Band |
|-----------|----------------|------|
| Diego Martin → St. Augustine | 25–40 | Urban rush-sensitive |
| POS → San Fernando | 45–75 | Highway |
| Moruga → San Fernando | 50–90 | Rural |
| Chaguanas → Arima | 30–50 | Corridor |

Store `baseline_min` and `baseline_max` per pair (or parish-pair). Show parent:

> *"Moruga → San Fernando: usually **50–90 min** by hire. Your window: **14:00–15:30**"*

Parent can widen: **+15 / +30 min** toggle before START.

### Time-of-day traffic factor

| Period (weekday) | Factor | Notes |
|------------------|--------|-------|
| 06:30–08:30 | 1.4× | School / work rush |
| 14:00–16:30 | 1.35× | School pickup |
| 16:30–19:00 | 1.25× | Evening commute |
| 12:00–13:30 | 1.1× | Lunch ripple |
| Weekend daytime | 1.0× | Baseline |
| After 21:00 | 0.9× | Lighter traffic (different risk profile) |

Apply to `baseline_max` when computing `ETA_end`.

### Rain / event flag (week 2+)

- Manual **"Heavy traffic / rain day"** national toggle (founder) → all buffers +25%
- Future: rainfall API or user-reported corridor delays

---

## Layer 2 — Parent "still OK" without ending trip

### Running late (one tap)

While `In transit` or soft overdue (amber), parent taps:

**"Running late — still safe"** → choose +15 / +30 / +45 min

| Effect |
|--------|
| Extends `ETA_end` |
| Resets Level 1 overdue timer |
| **Pauses** volunteer overdue-escalate shortening for 20 min |
| WiTTness card shows `Extended — parent says still safe` (not red) |
| Max **3 extensions** per trip without admin review |

This is the primary anti-false-alarm control. Traffic delay **with parent contact** is not an emergency.

### SMS

```
LATE K7M 30   → extend 30 minutes
```

---

## Layer 3 — Escalation uses extended window + silence

Revised triggers:

### Level 1 — Soft overdue

```
trigger: now > ETA_end_effective + buffer_soft
```

| Context | buffer_soft |
|---------|-------------|
| Urban | +20 min (was 15) |
| Rural | +35 min (was 30) |
| After parent "running late" extension | +0 (clock already moved) |

**Card:** amber · *"Past expected window — parent nudged"*

### Level 2 — Stale (worry, not traffic)

```
trigger: Level 1 AND (
  parent_silent_for > 25 min since Level 1 nudge
  OR now > ETA_end_effective + buffer_hard
)
```

| Context | buffer_hard (from original ETA_end at START) |
|---------|-----------------------------------------------|
| Urban | +45 min beyond initial window max |
| Rural | +75 min |

**Key:** Parent who tapped "running late" twice and is still in transit **does not** hit Level 2 until **silence** after nudge OR absolute hard cap (e.g. 2× initial window max).

### Volunteer overdue escalate

- **Disabled** while status = `extended_by_parent`
- After extension expires without end confirm, normal rules apply
- WiTTness copy: *"Parent said still safe — wait before escalating"*

---

## Layer 4 — WiTTness traffic context (optional)

Trusted WiTTness (L≥1) on amber cards only:

**"Likely traffic — snooze 15 min"** (max 1 per trip per watcher, max 3 watchers)

- Does not replace parent extension
- Adds 15 min to Level 2 **silence** timer only (not ETA)
- Admin can strike if abused

Rewards local knowledge (*"Carnival traffic normal on highway"*) without overriding parent.

---

## Layer 5 — Future: live drive time (post-MVP)

| Source | Pros | Cons |
|--------|------|------|
| Google Maps Directions API | Real traffic | Cost, data, privacy |
| Waze / HERE | Good highways | Spotty rural |
| Crowdsourced corridor delays | T&T-specific | Cold start |

On START confirm, optional refresh: *"Traffic adds ~12 min — update window?"* Parent approves one tap.

**Not week 1.** Zone table + traffic factor + parent extension is enough to cut false positives sharply.

---

## Formula summary

```text
at_create:
  window_min, window_max = zone_pair_baseline × traffic_factor(now)
  parent may widen → ETA_end_effective = window_max

on_running_late(+N):
  ETA_end_effective += N
  extensions_count++

escalation:
  L1 if now > ETA_end_effective + buffer_soft
  L2 if L1 AND (parent_silent_25m OR now > ETA_start_window_max + buffer_hard_absolute)
  panic always available
```

---

## Demo / MVP implementation order

| Phase | Ship |
|-------|------|
| **Demo now** | Show estimated window on create; "Running late" extends timer |
| **MVP week 1** | Zone-pair table + rush-hour factor + running late + revised L1/L2 |
| **Week 2** | SMS LATE; WiTTness snooze |
| **Later** | Maps API optional refresh |

---

## Metrics to track

- % trips with ≥1 running-late extension (expect high — that's OK)
- % amber trips reaching L2 without parent panic (target: low)
- Admin overturn rate on traffic-day escalations (target: trending down)

---

## Related reading

- [`11-escalation-pathway.md`](11-escalation-pathway.md) — updated triggers
- [`03-parent-confirmation.md`](03-parent-confirmation.md) — ETA at create
- [`12-volunteer-escalation-and-abuse.md`](12-volunteer-escalation-and-abuse.md) — escalate gating when extended