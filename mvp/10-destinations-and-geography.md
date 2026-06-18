# Destinations and Geography

## Why this matters

From overhead, T&T is a patchwork of urban corridors and **rural communities** where **private cars are scarce** and hire is essential. Children move for many reasons — not only school.

## Destination taxonomy

| Type | Examples | Parent confirms | School-style exempt |
|------|----------|-----------------|---------------------|
| **Registered school** | Allowlisted school zones | Pre-auth recurring | **Yes** |
| **Family home** | Granny, aunt, co-parent handoff | Start + end each trip | No |
| **Lessons / classes** | Pan, dance, tutoring | Start + end | No |
| **Sports / church / clinic** | Practice, youth group | Start + end | No |
| **Other zone** | Generic picker | Start + end | No |

**Unofficial family hops** are likely the **most common non-school case**.

## Geography bands

| Band | Examples | Hire dependence | Emergency response |
|------|----------|-----------------|------------------|
| **Urban** | POS, Chaguanas, San Fernando | Moderate | Relatively faster |
| **Semi-rural** | Urban fringe, outlying Tobago | Higher | Variable |
| **Rural** | Cedros, Moruga, Tabaquite interior, NE coast | **Often only option** | **Slow — tens of minutes** |

## Risk score (feed sort)

```
risk = 0
  + rural_corridor      (+3)
  + family_home_dest    (+1)
  + lessons_after_dark  (+2)  // ETA end after 18:00
  + single_party_sync   (+2)  // MVP default
  + long_eta            (+1)  // zone-to-zone > 45 min
```

Highest scores appear first in scroll feed (after escalated pins).

## Rural-specific rules

| Issue | MVP response |
|-------|--------------|
| Few local watchers | National feed — any parish can confirm |
| Slow 999/TTPS | Copy: *"Guardians witness delivery; call 999 for emergencies"* |
| Spotty data | SMS `START` / `DONE` fallback |
| Long ETAs | +30 min stale buffer vs +15 urban |

## Honesty principle

Remote Guardians **do not** replace ambulances or police. Rural escalation improves **visibility and admin follow-up** — not physical response speed.

## Static zone data (MVP)

Week 1: parish + corridor tag on trip form — no GPS. Maintain lookup table:

- `urban_corridor`
- `semi_rural`
- `rural_high_risk`

## Tobago

Consider separate status line in admin triage (island response logistics). Open question in [`README.md`](README.md).

## Related reading

- [`03-parent-confirmation.md`](03-parent-confirmation.md)
- [`11-escalation-pathway.md`](11-escalation-pathway.md)