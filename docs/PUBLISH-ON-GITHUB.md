# Put WiTTness online (simple version)

You already pushed to GitHub. To turn on the **demo link**, do this once — no “Actions”, no “workflows”.

---

## Turn on the demo website (4 clicks)

1. Open: **https://github.com/pmaharaj-cc/wittness-tt/settings/pages**

2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**

3. Under **Branch**:
   - First dropdown: **main**
   - Second dropdown: **/ (root)**
   - Click **Save**

4. Wait **2–5 minutes**. Refresh:

   **https://pmaharaj-cc.github.io/wittness-tt/**

   You should see **WiTTness — Protect our kids** and the phone demo.

If you still see “404”, wait another few minutes and try again. First deploy can be slow.

---

## Your links to share

| | |
|---|---|
| **Project (read)** | https://github.com/pmaharaj-cc/wittness-tt |
| **Foreword** | https://github.com/pmaharaj-cc/wittness-tt/blob/main/FOREWORD.md |
| **Demo (try)** | https://pmaharaj-cc.github.io/wittness-tt/ |

---

## If you change the demo later

```powershell
git clone https://github.com/pmaharaj-cc/wittness-tt.git
cd wittness-tt
git add .
git commit -m "Update demo"
git push
```

Wait a few minutes — the site updates itself.

---

## Optional: repo description

On https://github.com/pmaharaj-cc/wittness-tt click the **gear** next to **About**:

- **Description:** `Protect our kids — community witness for child hire trips in T&T`
- **Website:** `https://pmaharaj-cc.github.io/wittness-tt/`

---

## Troubleshooting

| Problem | What to do |
|---------|------------|
| Settings → Pages not visible | You must be logged in as **pmaharaj-cc** |
| Only see “GitHub Actions” as source | Choose **Deploy from a branch** instead |
| 404 after 10 minutes | Confirm branch is **main** and folder is **/ (root)** |
| Demo works but looks broken | Hard refresh: Ctrl+F5 |

---

## First-time push (already done for you)

Repo: **https://github.com/pmaharaj-cc/wittness-tt**

If you ever need to push again from your PC:

```powershell
git clone https://github.com/pmaharaj-cc/wittness-tt.git
cd wittness-tt
git add .
git commit -m "Your message"
git push
```

Git identity (one-time, already set):

```powershell
git config --global user.name "Pranav Maharaj"
git config --global user.email "pmaharaj-cc@users.noreply.github.com"
```