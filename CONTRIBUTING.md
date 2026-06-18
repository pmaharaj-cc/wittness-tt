# Contributing

Thank you for helping improve WiTTness.

## What this repo is

- **Public:** concept docs, MVP specification, interactive browser demo, foreword.
- **Not in this repo:** maintainer setup notes (kept locally by the project author).

## Before you start

1. Read [README.md](README.md) and [FOREWORD.md](FOREWORD.md).
2. Try the demo: https://pmaharaj-cc.github.io/wittness-tt/
3. For product direction, read [mvp/README.md](mvp/README.md).

## How to contribute

1. Fork https://github.com/pmaharaj-cc/wittness-tt
2. Create a branch with a clear name (`fix/demo-copy`, `docs/mvp-clarity`, etc.)
3. Keep changes focused. Match existing tone and spelling (Trinidad and Tobago context).
4. Do not add secrets, personal paths, or private maintainer docs under `docs/`.
5. Open a pull request with:
   - What changed
   - Why it helps parents, WiTTness volunteers, or developers
   - How you tested the demo (if you touched `app.js`, `index.html`, or `styles.css`)

## Demo guidelines

- Zones only on trip cards. No child names on the public feed.
- WiTTnesses are witnesses, not police. Copy must not imply emergency dispatch.
- Avoid the **Guardian** brand in new UI copy (conflicts with Guardian Media / Guardian Life in T&T). Use **WiTTness**.

## Code style

- Vanilla HTML/CSS/JS for the demo (no build step required).
- Escape user-generated text before inserting into HTML.
- Prefer clear, short UI strings without em dashes.

## License

By contributing, you agree your contributions are licensed under the [MIT License](LICENSE).