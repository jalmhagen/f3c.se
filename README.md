# F3C Sverige — new website

This is the redesigned F3C Sverige site, built as a plain static site (no
build step, no framework) so it can be hosted for free on GitHub Pages.

Photos and videos are **not** stored in this repo — every `<img>` and
`<iframe>` points at your existing media library (the
`impro.usercontent.one` URLs your One.com site already uses, and your
existing YouTube embeds). As long as that library stays where it is, the
images keep working with zero migration.

All eight pages are built: homepage, Nyheter, Arrangemang, Media, Teori,
Regler, Historia and Länkar, using your real content and photos.

Two things are placeholders for now, both by necessity rather than
oversight:

- **Arrangemang → "Resultat" links** point back to the Arrangemang page
  itself. The actual results tables live at `/arrangemang/resultat` on
  your current site and weren't captured in full — send them over (or
  point me at them) and I'll build that page for real.
- **Regler and Historia → document links** (Sporting Code, Bilagor,
  historiska program, etc.) currently link out to the matching section
  on your existing f3c.se, because those files are embedded through a
  widget on the One.com site that doesn't expose a direct file URL. Once
  you can grab the actual PDF links (or the files themselves), send them
  over and I'll wire up direct downloads instead.

Everything else — all news posts, the full events calendar, photo
galleries, theory content, and links — is the real content from your
current site, redesigned.

## 1. Put this on GitHub

1. Create a free GitHub account if you don't have one: https://github.com/signup
2. Create a new repository (e.g. `f3c-sverige`). Leave it empty — don't
   add a README/license from GitHub's UI, since this folder already has one.
3. From inside this folder, push it up:

   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git add -A
   git commit -m "Initial site"
   git branch -M main
   git push -u origin main
   ```

   (GitHub will prompt you to sign in the first time you push.)

## 2. Turn on GitHub Pages

1. In your new repository on GitHub, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. GitHub will give you a temporary URL like
   `https://<your-username>.github.io/<your-repo>/` — check the site loads
   there before touching your domain's DNS.

## 3. Point f3c.se at it

This repo already includes a `CNAME` file containing `f3c.se`, which tells
GitHub Pages to serve the site for that domain once DNS points there.

Wherever f3c.se's DNS is managed (likely your One.com account, under
domain/DNS settings — this is separate from the Website Builder), add:

| Type  | Name / Host | Value                                            |
|-------|-------------|---------------------------------------------------|
| A     | @           | 185.199.108.153                                   |
| A     | @           | 185.199.109.153                                   |
| A     | @           | 185.199.110.153                                   |
| A     | @           | 185.199.111.153                                   |
| CNAME | www         | `<your-username>.github.io`                       |

Remove or leave alone any existing records for those same names that
point at the old Website Builder — replacing them is what makes the
switch happen. **Do not touch MX records** (those handle email and are
unrelated to this).

Back in **Settings → Pages** on GitHub, add `f3c.se` as your custom
domain and (once DNS has propagated, usually well under an hour) tick
**Enforce HTTPS**.

## 4. Local preview

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## File structure

```
index.html          Homepage
nyheter.html         News archive
arrangemang.html     Competition calendar (2024–2026)
media.html           Videos, photo galleries, tutorials
teori.html           Theory & training content
regler.html          Rules & documents
historia.html        Historical programs
lankar.html          Links & contact
css/style.css        All styling
js/main.js           Mobile nav toggle, footer year
CNAME                Tells GitHub Pages which custom domain to serve
```
