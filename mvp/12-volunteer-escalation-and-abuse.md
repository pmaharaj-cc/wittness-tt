# Volunteer Escalation and Abuse Resistance

## Volunteer escalation paths

Volunteers are **eyes**, not dispatchers. Escalation = **faster human review** — not automatic 999.

### 1. Trip running long (overdue escalate)

**When:** Trip `In transit`, `now > ETA_end_effective` (amber state), and parent has **not** extended within the last 20 minutes.

**Who:** Trust level ≥ 1.

**Action:** Tap **"Escalate — overdue"**.

**Effect:**

- Shortens Level 2 stale timer by **50%** (first unique escalate per volunteer)
- Max **3** overdue escalates per trip (deduped by user)
- Stacks with auto-stale; does not replace parent panic

**Points:** +3 if admin marks legitimate; −10 + strike if frivolous.

### 2. Urgent concern (volunteer red button)

**When:** Watcher believes emergency before parent panics.

**Who:** Trust level ≥ 2.

**Action:** Hold 3s + structured reason:

- Parent not responding to overdue
- Other (admin review)

No free text week 1.

**Effect:**

- **Level 2.5** — admin queue + red feed pin
- Shows `Volunteer urgent flag — 2/3` progress

**Quorum gate:**

| Flags | Result |
|-------|--------|
| 1 volunteer | Admin queue only |
| 3+ trusted (L≥2) in 10 min | Level 3 **visibility** (feed treatment like panic, minus parent 999 unless parent confirms) |

Parent panic **always outranks** volunteer flags in triage.

## Abuse threat model

| Attack | Example |
|--------|---------|
| Panic farming | Sock puppets create trips + panic |
| Escalation flood | Bots escalate every card in feed |
| Quorum gaming | Coordinated fake urgent flags |
| Griefing | Mass late confirms to trigger stale on innocents |

## Defenses (MVP)

| Control | Rule |
|---------|------|
| Invite-only beta | Manual parent/watcher codes week 1 |
| Phone verify | Before public launch |
| Panic cooldown | Max 2 panics / account / 24h |
| Trust gates | Overdue: L≥1; urgent: L≥2 |
| Per-user escalate limit | 5 / day; 1 / trip |
| Per-trip caps | 3 overdue + 5 urgent → locked |
| New account quarantine | < 48h: watch only, no escalate |
| National rate limit | > 40 volunteer escalations / 10 min → **Circuit** 30 min |
| Strike system | 3 overturned frivolous → 7-day escalate ban |
| Prank trips | No start confirm → no panic allowed |

## Circuit breaker

**Trigger:** > 20 active L2+ escalations OR > 50 escalations/hour nationally OR > 40 volunteer escalations in 10 min.

**Effects:**

- Pause new volunteer escalations 30 min (parent panic still works)
- Optional: pause delivery confirms — *"Support mode — witness only"*
- Freeze leaderboard
- Public banner: *"High load — volunteer escalations paused"*

**Human override:** Sentinels can unpause Circuit when attacks confirmed vs real tragedy day.

## AI abuse assist

- Burst detection: same IP, mechanical timing, new accounts → quarantine
- **Does not** auto-dismiss rural panics on bad news days

## Founder kill switches

- Pause all volunteer escalations
- Pause new trip registration
- Maintenance mode

## Bad-day drill (test before public launch)

1. Simulate 25 volunteer escalations in 5 minutes → Circuit trips
2. Simulate 3 real parent panics during Circuit → panics still in triage top
3. Verify confirm pause banner shows
4. Sentinel manual unpause works

## Related reading

- [`11-escalation-pathway.md`](11-escalation-pathway.md)
- [`07-moderation.md`](07-moderation.md)
- [`02-scroll-feed-ux.md`](02-scroll-feed-ux.md)