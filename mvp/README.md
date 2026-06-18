# MVP — Week 1 Launch

## North star

A **mobile scroll feed** where chronically online older Trinis — especially women at home — **witness child hire trips** by confirming delivery on **sanitized** cards, earning **Guardian Angel** or **True Trini** points, while parents hold start/end confirm and the **panic button**.

## Read first

1. [`01-mvp-scope.md`](01-mvp-scope.md)
2. [`02-scroll-feed-ux.md`](02-scroll-feed-ux.md)
3. [`03-parent-confirmation.md`](03-parent-confirmation.md)
4. [`10-destinations-and-geography.md`](10-destinations-and-geography.md)
5. [`11-escalation-pathway.md`](11-escalation-pathway.md)
6. [`13-traffic-and-eta.md`](13-traffic-and-eta.md)
7. [`12-volunteer-escalation-and-abuse.md`](12-volunteer-escalation-and-abuse.md)

## Launch checklist

### Before build

- [ ] Pick gamification naming (GAP vs TTP vs hybrid) — [`06-gamification-terms.md`](06-gamification-terms.md)
- [ ] Confirm M=10, K=5 quorum defaults
- [ ] Build school allowlist (10–20 schools, zero staff workflow)
- [ ] Write admin playbook (in `11-escalation-pathway.md`)
- [ ] Prepare invite codes for parents and watchers

### Before beta

- [ ] Sanitization audit — no PII on feed cards
- [ ] Parent panic hold-to-activate works
- [ ] Auto-stale cron tested (urban + rural buffers)
- [ ] Volunteer escalate trust gates enforced
- [ ] **Bad-day drill:** 25 fake escalations → Circuit mode
- [ ] **Panic during Circuit:** parent panics still top of queue

### Beta week

- [ ] 50+ Guardian signups
- [ ] 10+ parent trips completed end-to-end
- [ ] At least 1 rural-tagged test trip through quorum
- [ ] At least 1 school pre-auth test trip (no bell-time tap)
- [ ] Dispute / false panic handled via admin

### Before public open

- [ ] Phone verify on accounts
- [ ] Sentinel on-call rotation documented
- [ ] 999 disclaimer on every parent screen
- [ ] Circuit breaker tested at scale
- [ ] Legal review of liability copy (workshop)

## Open questions (MVP)

- Hide trip from feed until parent start confirm, or show as unverified preview?
- Rural quorum K=7 vs K=5?
- Recurring pre-auth for weekly lessons at same venue?
- Tobago separate admin queue?
- SMS `START`/`DONE` in beta or week 2?

## Week-1 unknowns

| Item | Risk | Mitigation |
|------|------|------------|
| Invite-only only | Low reach | Facebook recruitment |
| No push notifications | Miss overdue | Email/SMS to parents only |
| No phone verify | Sock puppets | Circuit + manual ban |
| Single founder admin | Bad day overload | Recruit 3 Sentinels pre-launch |

## After docs — next session

Implement per [`09-tech-sketch.md`](09-tech-sketch.md) when ready to build.

## Related

- [`../README.md`](../README.md) — project root
- [`../concept/`](../concept/01-problem-statement.md) — long-term vision