# Moderation

## Three layers

### 1. Pre-publish guards

- Structured forms only on trip cards (no comment threads week 1)
- Block names, phones, full plates in validation
- Trip must have start confirm before appearing on feed

### 2. AI assist

On optional parent note fields only:

| Detection | Response |
|-----------|----------|
| Phone / email / URL | Auto-reject or redact |
| Toxic / threatening text | Hold for human review |
| Burst duplicate content | Flag account |

**AI never:** auto-dismiss panic, auto-close trips, judge safety.

Suggested APIs: OpenAI Moderation, Perspective API, or regex + lightweight LLM pass.

### 3. Human admins

- 2–3 founders at launch
- Promote Sentinels (trust ≥2, >95% accuracy over 30 days)
- Mod queue: AI-flagged + user flags + escalation overflow

## User flags

- Structured reasons only — no default free text
- ≥2 flags on same account → temp hide pending review

## Panic and escalation abuse

| Offense | Sanction |
|---------|----------|
| False parent panic | Account strike; 24h panic cooldown |
| Frivolous volunteer escalate | Strike; escalate ban 7 days at 3 strikes |
| Sock puppet quorum gaming | IP/device quarantine |

See [`12-volunteer-escalation-and-abuse.md`](12-volunteer-escalation-and-abuse.md).

## Founder kill switches

- Pause volunteer escalations
- Pause new trip registration
- Pause confirms (Circuit support mode)
- Maintenance banner

## Community self-policing

High-trust Sentinels review flagged queue — promoted by **good behavior and results**, not appointment. Demote on overturned decisions.

## Related reading

- [`05-sanitization-rules.md`](05-sanitization-rules.md)
- [`11-escalation-pathway.md`](11-escalation-pathway.md)