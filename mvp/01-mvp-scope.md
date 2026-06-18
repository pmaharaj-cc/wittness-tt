# MVP Scope — Week 1

## One sentence

Parents register child trips and confirm start/end; **WiTTness** volunteers scroll a mobile feed and **confirm delivery**; escalation handles stale trips and panic, with abuse-resistant triage.

## In scope

| Feature | Behavior |
|---------|----------|
| Trip registration | Web PWA form: destination type, zones, ETA, rural tag |
| Parent start confirm | Trip enters feed as `In transit` |
| Parent end confirm | Unlocks watcher confirm button |
| School exception | Pre-authorized school runs; no bell-time parent tap |
| Scroll feed | Infinite vertical cards; risk-weighted sort |
| Watcher confirm | Capped at M=10; quorum K=5 (workshop) |
| Points / ranks | GAP or TTP — workshop in `06-gamification-terms.md` |
| Parent panic | Hold 3s → Level 3 escalation |
| Auto-stale | ETA + buffer → amber → red escalation |
| Volunteer escalate | Overdue + urgent concern; trust-gated |
| Abuse controls | Rate limits, circuit breaker, invite-only beta |
| Sanitization | Form-enforced; AI screen on optional notes |
| Admin triage | Priority-sorted queue + playbook |

## Out of scope (week 1)

- Native iOS/Android apps
- Driver app, child device, GPS live map
- Windshield QR / barcode registry
- WhatsApp/SMS bots (link to web only; SMS fallback documented)
- TTPS / 999 API integration
- Comment threads on trips
- Phone verify (manual invite list OK for beta)
- Full tier 2–3 parent/driver/child sync

## Beta targets

- **50–200** WiTTness volunteers
- **10–20** parent accounts (invite-only)
- **10–20** schools on allowlist

## Success criteria (week 1)

- [ ] Parent can start + end trip in < 60 seconds
- [ ] Watcher can confirm delivery on completed trip
- [ ] Stale trip auto-escalates in test environment
- [ ] 25 fake volunteer escalations trigger Circuit mode
- [ ] Zero PII visible on public feed cards

## Related reading

- [`README.md`](README.md)
- [`02-scroll-feed-ux.md`](02-scroll-feed-ux.md)