# Initialization Tiers

Trust and monitor intensity are **inverse to sync completeness**: more parties agreeing on the same trip → higher trust; fewer parties → **higher real-time monitoring priority**.

## Tier definitions

| Tier | Name | Who synced | Trust | Monitor behavior |
|------|------|------------|-------|------------------|
| **3** | Full Sync | Parent + Driver + Child aboard | Highest | Standard checks; lowest escalation sensitivity |
| **2** | Partial Sync | Two of three | Medium | Elevated watch |
| **1** | Single Party | One only | Lowest | **Highest priority** in feed and escalation |

## Sync signals

### Parent

- Registers trip via SMS/WhatsApp/web, or confirms driver-initiated trip within window.

### Driver

- Confirms trip code via app/SMS.
- **Anonymous driver** (plate only, no account): caps at **Tier 2** maximum.

### Child (no smartphone required)

- Verbal code to driver → driver enters "child confirmed."
- Guardian taps "child boarded" alone = **parent proxy only** — Tier 2 ceiling without driver child-confirm.
- No child signal → tier cannot exceed **2** even if parent + driver sync.

## Automatic modifiers

| Condition | Effect |
|-----------|--------|
| Child no device, no verbal confirm | Max tier 2; elevated monitoring |
| Anonymous driver | Max tier 2; driver-only init → Tier 1 + top priority |
| High-risk zone on route | +monitor priority |
| Recurring known driver (school run) | Trust bonus, not above Tier 3 |
| Rural corridor | +feed risk score (see MVP geography doc) |

## MVP equivalent

Week 1 is **parent-only initiation** → effectively **Tier 1** for all trips → maximum watcher priority by default. Driver and child sync are concept/future.

## Public trust badge

Show tier on sanitized cards: `Full Sync` / `Partial` / `Single party — priority watch`. Never display Tier 3 when only one party synced.

## Related reading

- [`06-trip-lifecycle.md`](06-trip-lifecycle.md)
- [`../mvp/02-scroll-feed-ux.md`](../mvp/02-scroll-feed-ux.md)