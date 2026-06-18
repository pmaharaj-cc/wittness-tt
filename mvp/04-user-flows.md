# User Flows

## Parent / guardian

```
Sign up (invite) → Create trip (type, zones, ETA)
    → START confirm (child aboard)
        → [Child travels]
            → END confirm "Arrived safe" OR school auto-close
                → Watchers confirm → Receipt "6 guardians witnessed"
```

**Panic branch:** Hold red button anytime while in transit → Level 3 escalation + "Call 999" screen.

**School run:** One-time pre-auth → daily auto-enter feed at scheduled time → parent can cancel day-of with one tap.

## WiTTness volunteer (watcher)

```
Sign up (pseudonym) → Onboarding swipe tutorial
    → Browse feed (risk-sorted)
        → Swipe through trips
            → On "Awaiting delivery": tap Confirm
                → Points + contribution count updates
```

**Escalate branch (overdue):**

```
See amber overdue card → Escalate overdue (if trust ≥1)
    → Timer to Level 2 shortened
```

**Urgent concern branch:**

```
See red / silent parent case → Hold "Urgent concern" (trust ≥2)
    → Pick structured reason → Admin queue
        → 3 trusted flags in 10 min → Level 3 visibility
```

## Admin / Sentinel

```
Login → Triage queue (priority sorted)
    → Handle panic first
        → Call playbook: 999 vs late confirm vs false alarm
            → Resolve → log outcome → adjust strikes
```

**Surge day:** Status page shows active escalation count; optional pause on confirms.

## System (automated)

```
Every minute:
    → Check ETA + buffer → Level 1 amber
    → Check overdue + buffer → Level 2 stale
    → Check national escalate rate → Circuit mode?
```

## Related reading

- [`11-escalation-pathway.md`](11-escalation-pathway.md)
- [`12-volunteer-escalation-and-abuse.md`](12-volunteer-escalation-and-abuse.md)