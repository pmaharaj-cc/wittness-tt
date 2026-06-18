# Constraints

## Hard constraints

| Constraint | Design implication |
|------------|-------------------|
| Child may not have a device | All child "sync" is guardian-mediated or verbal/driver-entered |
| Drivers can disable tracking | Completion cannot rely on GPS alone; parent/driver SMS close required |
| Spotty mobile data (especially rural) | Store-and-forward; SMS `START` / `DONE` codes; idempotent trip IDs |
| Privacy / PII abuse | Ephemeral trip tokens; sanitized public feed; minimal retention |
| Voluntary opt-in | Incentives required for drivers and watchers; cannot mandate nationwide |
| School routine sacred | No staff duties, no bell-time parent pings for registered school runs |

## Escalation constraints

- Volunteers **cannot** call 999 on a parent's behalf.
- Platform is **not** emergency services — copy must say so everywhere.
- Bad-day volume can **exceed admin capacity** — triage and circuit breaker required.

## Gamification constraints

- Points for **escalate-chasing** must be lower than delivery confirm to avoid perverse incentives.
- Leaderboards freeze during **Circuit** surge mode.
- New accounts (< 48h) quarantined from escalate actions.

## Geographic constraints

- Rural trips: longer ETA buffers, higher feed priority, **slower real-world emergency response** — design must be honest.
- National watcher pool must cover rural trips (POS watcher can confirm Cedros trip).

## Tier constraints

- Anonymous driver caps at **Tier 2** even with full parent sync.
- Child-without-device caps at **Tier 2** unless verbal code confirm recorded.

## Related reading

- [`../mvp/05-sanitization-rules.md`](../mvp/05-sanitization-rules.md)
- [`../mvp/12-volunteer-escalation-and-abuse.md`](../mvp/12-volunteer-escalation-and-abuse.md)