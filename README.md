# WiTTness

**Protect our kids.**

Community witness for child hire-car trips in Trinidad & Tobago. Open source, with a live demo you can try in two minutes.

> **Personal foreword:** [Why this exists. No big talk, just use what we already have.](FOREWORD.md)

**Public launch:** 18 June 2026 · **Built with:** Grok Build (concept → spec → demo → repo → live site) · **Author:** Pranav Maharaj

---

## Try the demo

| | |
|---|---|
| **Live demo** | [https://pmaharaj-cc.github.io/wittness-tt/](https://pmaharaj-cc.github.io/wittness-tt/) |
| **On your computer** | Open [`demo/index.html`](demo/index.html) or double-click [`demo/open-demo.bat`](demo/open-demo.bat) |

Pick **Parent** or **WiTTness** and complete one test trip.

---

## What is WiTTness?

**WiTTness** = Witness + TT. It is both the project name and the name for volunteers who confirm trips from home.

After recent tragedies ([context](concept/02-context.md)), many parents stopped trusting **cars for hire**, but hire is often the **only** option for school, granny's house, or lessons, especially in rural areas.

Taking a photo of the plate helps **after** something goes wrong. It does not help **while** the child is in the car.

**WiTTness** proposes a community layer to **protect our kids**:

1. **Parent** registers a trip (zones only, no child's name on the public feed).
2. Parent taps when the child **boards** and when they **arrive safe**.
3. **WiTTnesses** scroll a feed of anonymous trips and tap **Confirm delivery**.
4. Stuck in traffic? Parent taps **Running late**. Real emergency? **PANIC** → call **999**.

WiTTnesses are witnesses, not police. The app says that everywhere.

---

## How one trip works

```
Parent creates trip (Moruga → San Fernando)
        ↓
Parent taps START (child boarded)
        ↓
Trip appears on WiTTness feed (zones only)
        ↓
Parent taps END (arrived safe)
        ↓
WiTTnesses confirm delivery (3 = quorum in demo)
        ↓
Trip witnessed. Protect our kids, one trip at a time.
```

---

## Who is this for?

| You are… | What you can do today |
|----------|------------------------|
| **A parent** | Try the Parent flow in the demo |
| **Someone at home online** | Try **WiTTness** — scroll, confirm, earn TTP points |
| **A developer** | Fork the repo, read the [MVP spec](mvp/README.md) |
| **An NGO or community group** | Read the [concept docs](concept/01-problem-statement.md) |

---

## What this is NOT (yet)

| | |
|---|---|
| Not government | Community-led, open source |
| Not live nationwide | Demo + specification |
| Not a replacement for **999** | Witness layer only |
| Not “Guardian” anything | Avoids confusion with Guardian Media / Guardian Life in T&T |

---

## Repository contents

| Folder | Contents |
|--------|----------|
| [`demo/`](demo/) | Interactive demo — host as public link |
| [`mvp/`](mvp/README.md) | Product specification |
| [`concept/`](concept/01-problem-statement.md) | Long-term vision |
| [`FOREWORD.md`](FOREWORD.md) | Personal note from the author |

---

## Share

- **Demo:** [https://pmaharaj-cc.github.io/wittness-tt/](https://pmaharaj-cc.github.io/wittness-tt/)
- **GitHub:** [https://github.com/pmaharaj-cc/wittness-tt](https://github.com/pmaharaj-cc/wittness-tt)

## Privacy (demo)

The live demo stores trip data in your browser only (`localStorage`). There is no backend and no account. Do not enter real child names, phone numbers, or home addresses.

---

## Status

| Item | State |
|------|--------|
| Concept & spec | Written |
| Interactive demo | Live on GitHub Pages |
| Public launch | 18 June 2026 |
| Production app | Not built — spec ready |

Someone did something. Here is the proof.

---

## License

[MIT](LICENSE) — fork and improve freely.

