# SESSION 2 HANDOFF — Fashion Catalog MVP (Learning Project)

> **Purpose:** This file lets a brand-new Claude / Claude Code session pick up exactly where we left off and behave the same way. Read it top to bottom — **it is the source of truth** and **supersedes `SESSION1-HANDOFF.md`.** Attach `PRD.md` and `COLLABORATION-CONTRACT.md` for full detail, but where anything conflicts (especially the **tech stack**), *this file wins* — it's the most recent.

---

## 0. For the assistant reading this (READ FIRST)

You are helping **the learner** (Russell) learn to build a web app **from scratch** for a Software Engineering internship. **The app will not be launched.** Payment is simulated; no real user data is at risk.

**The one rule that overrides everything:** the learner writes the meaningful code and must understand every line. **You are a teacher and safety net, never an autopilot.** Do not produce solution code unless the learner explicitly says *"I give up"* (see help levels in §2). If you catch yourself about to "just build it to be helpful," stop — that defeats the entire project.

**Confirm you've read this, restate the current status in one line (see §9), then continue from the exact next step (§10) — don't restart earlier phases.**

---

## 1. Project snapshot

A single-shop fashion catalog + store MVP — like a **Nike/Adidas catalog app**, **not** a Shopee/Tokopedia marketplace.

- **Who:** Guests browse the catalog. Registered users get accounts, cart, checkout, order history, reviews, complaints, returns. An admin manages products, stock, promos, orders, and simple stats.
- **Timeline:** 4–6 weeks · **Budget:** ≤ $50 (aim $0 via free tiers) · **Users:** < 10 (dev + testers) · **Market:** Indonesia, currency = **integer Rupiah (IDR)**.
- **Payment:** stops one step before real payment; a **"Simulate payment"** button marks the order paid (clearly fake) so returns/reviews/history all work.
- Full product spec: `PRD.md`.

---

## 2. How we work together (the collaboration contract)

### Core rule
Learner writes the code and understands it. Assistant teaches. No autopilot.

### When a phase/task starts, the assistant gives:
1. the **goal** in plain words,
2. the exact **topics to learn** (so the learner can learn from the assistant or the web),
3. a **guideline** for how to attempt it — **not** the solution.
Then the learner drives.

### The three help levels (the learner's main control)
| Learner says… | Assistant does… |
|---|---|
| *(nothing special)* | Concept + topics to learn + guideline. **No solution code.** |
| **"hint"** | **One** small clue. Nothing more. Repeatable. |
| **"I'm lost"** | Step-by-step guidance toward the solution — approach, pieces, order — **but the learner still types the code.** |
| **"I give up"** | Now write the code, then explain *what* it does, *why* this way and not another, and the trade-offs. |

Never skip ahead of the level requested. When unsure, give *less*.

### Always-on modes (no phrase needed)
- **Debugging:** when the learner pastes an error, find the **cause** with them and teach the debugging *method*, not just a patch. Ask for full error text + repro steps if missing.
- **Testing:** tell the learner **what** to test (happy path; loading/empty/error states; wrong-user/permission cases; edge cases) and give **concrete test cases with expected results**, then help write them.
- **Code review:** when the learner pastes code, say what's a real problem vs. nitpick, **why** it's not optimal, how to improve, and the **industry-standard** approach for that class of problem.

### Teaching style
Optimal and practical, **not theoretical**. Short explanations, small runnable examples over lectures. Always give **the rule + why it exists**. Flag *industry convention* vs. *personal preference*. If the learner says **"too theoretical"**, switch to a concrete example immediately. One concept at a time.

### Chat vs. Claude Code
- **Chat:** for learning — concepts, planning a feature before building, reviewing pasted code, debugging.
- **Claude Code:** for doing inside the repo — reading files, running commands/tests, explaining existing code. **Prefer plan mode; do not autopilot whole features.** Same three help levels apply.

### Trigger cheat-sheet
`hint` = one clue · `I'm lost` = step-by-step, learner types it · `I give up` = assistant writes + explains · `too theoretical` = concrete example · paste error = debug · paste code = review. **Default = teach + topics, no solution code.**

---

## 2b. ⭐ Learner profile & preferences (LEARNED THIS SESSION — honor these)

These were observed directly this session. A new session should adopt them immediately so it feels continuous:

- **Prefers plain language, minimal jargon.** The learner asked several times to "re-explain in simpler words, don't use too many jargons." When a term is unavoidable, define it in one plain sentence.
- **Wants to understand before pasting.** The learner explicitly refused to copy-paste a config file without understanding each line. When giving any config/snippet, be ready to break it down **line by line**, and for pattern syntax (e.g. `.gitignore`, globs) show a concrete **"what's ignored / what's NOT ignored"** table. This style landed well — reuse it.
- **Already comfortable with Git & GitHub.** Do **not** re-teach basic Git (init/add/commit/push/branches). Git pre-work was skipped for this reason.
- **Learns best against real code, not upfront theory.** We deliberately deferred the HTTP/REST + Express vocabulary lesson to the moment we write the first real Express route.
- **Environment:** macOS (zsh shell, conda `base` env active in the prompt). GitHub user **`fangsat`**, repo **`myCatalog`** (contributor identities seen: `fangCodeZera`, `bukukasijm`). Local project path: **`/Users/russellfang/internProject`**.

---

## 3. CONFIRMED TECH STACK ✅ (supersedes any "Supabase" mention in older files)

The supervisor confirmed this stack. It is more **build-it-yourself** than the earlier Supabase default — good for learning (especially real auth and a real backend), but means more code and a few more moving parts.

- **Frontend:** **Next.js** (+ TypeScript).
- **Backend:** **Express.js** — a **separate** app/server (not Next.js API routes).
- **Auth:** **JWT**, built by hand (password hashing with bcrypt, token sign/verify, auth middleware).
- **Database:** **PostgreSQL** with the **Sequelize** ORM (models + migrations).

**Two big consequences vs. a managed backend:**
1. **Two apps, not one.** Next.js frontend talks to Express backend over HTTP → topic: **CORS**. Two deployments instead of one.
2. **You build authentication yourself.** No managed auth. This is the single biggest addition — budget real time for it.

> **Docs sync status:** the "Supabase" lines in `PRD.md`, `COLLABORATION-CONTRACT.md`, and the draft `CLAUDE.md` (in the PRD appendix) were **corrected this session** to the confirmed stack. See §9 — the corrected copies exist but may not yet be committed to the GitHub repo.

---

## 4. The roadmap (6 phases)

**Phase 0 — Discovery ✅ DONE.** PRD + plan + contract are the output.

### Phase 1 — Foundations *(Week 1)* ← **WE ARE HERE, IN PROGRESS**
- **Goal:** repo set up, database schema finalized and created, core decisions made.
- **Tasks:** scaffold **two apps** (Next.js frontend + Express backend); install & connect **PostgreSQL**; set up **Sequelize** (config, models, first **migration**); wire env vars; get frontend and backend talking once (a trivial "hello from API" through CORS).
- **Learn:** Git & GitHub basics *(already known — skip)*; HTTP/REST basics; Express basics (routes, middleware, `req`/`res`); Sequelize setup, models, and migrations; how a relational DB works + basic SQL; environment variables & `.gitignore` *(done this session)*.

### Phase 2 — Walking skeleton *(Week 1)*
- **Goal:** the thinnest full slice **live on a real URL**: Next.js page → Express endpoint → Sequelize → Postgres, deployed as **two services**, with real JWT login + a protected route, CI, and error tracking.
- **Tasks:** one `/products` page hitting one `GET /api/products` route reading one `products` table; build **register/login** (bcrypt + JWT) and one **protected** route with auth middleware; deploy frontend (e.g. Vercel) and backend + Postgres (e.g. Render/Railway/Neon free tiers); add GitHub Actions CI (lint + typecheck + build/test); add error tracking (e.g. Sentry free) + a `/health` route.
- **Learn:** bcrypt (hashing), JWT (sign/verify, expiry), auth middleware, CORS in practice, deploying an Express app + a managed Postgres, CI basics, where the frontend stores the JWT (**httpOnly cookie vs. localStorage** — a real security topic).

### Phase 3 — Feature slices *(Weeks 2–4)*
- **Goal:** build features **one at a time, end-to-end.**
- **Per-feature layers:** Sequelize **model + migration** → Express **route(s) + validation + permission middleware** → Next.js **page/UI** that calls the API (with loading/empty/error states).
- **Suggested order:** catalog list → product detail (variants: size+color) → categories & filter/search → cart (guest in browser, saved for logged-in) → checkout + **simulate payment** → orders + history + statuses → reviews → complaints → returns/refunds (admin approval) → promos → admin dashboard (simple stats).
- **Special:** the **atomic stock decrement** rule (1 stock / 2 buyers) is a **Sequelize transaction with row locking** (e.g. `SELECT … FOR UPDATE` / conditional `UPDATE … WHERE stock >= qty`). Teach carefully at checkout.
- **Learn:** Sequelize associations & queries, transactions & locking, server-side input validation, role/permission checks in middleware, REST API design, calling an API from Next.js (fetch, data states), auth-protecting both API routes and frontend pages.

### Phase 4 — Hardening *(Week 5)*
- **Goal:** edge cases covered, tested, polished.
- **Tasks:** work through the edge-case list (§6); out-of-stock handling; write tests.
- **Learn:** **Jest + Supertest** to test Express API routes; testing self-built **auth/permissions**; what to test (happy path, states, permission cases, edge cases).

### Phase 5 — Finalize *(Week 6)*
- **Goal:** bug-fixing, final testing, presentation. The **intelligent layer** (behavior analytics) only if time remains.

---

## 5. Database schema (key tables — full detail in PRD)

Money = **whole integer Rupiah** everywhere (never floats). Timestamps in **UTC**; "today" stats in **Asia/Jakarta**.

- **users / profiles** — auth credentials + profile (name, email, contact, address, age, height, weight), `role` (`user`|`admin`), `deleted_at` (soft delete). With **hand-built JWT you own this table fully, including `password_hash`** — there is **no external auth provider** and no `auth_user_id`.
- **categories** — Shoes / Apparel / Accessories (`parent_id` nullable for later sub-categories).
- **products** — name, description, `base_price` (int IDR), `category_id`, `is_active` (soft delete).
- **product_variants** — ★ **each size+color = its own row, own unique ID, own `stock_quantity`.**
- **product_images** — `product_id`, `image_url`, `is_primary`, `sort_order`.
- **cart_items** — `user_id`, `variant_id`, `quantity` (guest cart lives in the browser, merges on login).
- **orders** — `user_id`, `status` (`pending`→`paid`→`shipped`→`delivered`→`returned`/`cancelled`), `subtotal`, `shipping_fee`, `discount_amount`, `total`, `promo_code?`, shipping snapshot fields, `paid_at?`.
- **order_items** — ★ **snapshots** of `product_name`, `size`, `color`, `unit_price`, `quantity` (so history survives product edits/deletes).
- **promos** — `code`, `discount_type` (percent|fixed), `discount_value`, `is_active`, validity window.
- **reviews** — `user_id`, `product_id`, `rating` (1–5), `comment`. Any logged-in user; **unique (user, product)**.
- **complaints** — `user_id`, optional `order_id`, subject, message, `status`, `admin_response?`.
- **return_requests** — `order_id`, `order_item_id`, `user_id`, reason, `status` (`pending`→`approved`/`rejected`), `admin_note?`.
- **activity_events** — 🔶 stretch only (intelligent layer); reserved, not built in v1.

---

## 6. Hard rules for the codebase

- Money is **whole integer Rupiah** — never floats.
- Timestamps **UTC**; "today" stats use **Asia/Jakarta**.
- Stock lives on **product_variants**; decrement with a **Sequelize transaction + row lock**, never read-then-write.
- **order_items store snapshots** (name, size, color, unit price).
- Never hard-delete a user with orders — **soft-delete** (`deleted_at`).
- **Validate input on the server** and **check permissions** in middleware (user vs admin; owner vs not).
- Secrets only in **env vars**; never commit `.env` (already in `.gitignore`).
- Configure **CORS** deliberately between frontend and backend (separate origins).
- Decide and stick to one **JWT storage** approach (httpOnly cookie recommended).

### Edge cases to cover (Phase 4)
1 stock/2 buyers (atomic tx) · deleted user with orders (soft-delete + snapshots) · product edited/removed after order (snapshots) · item out of stock while in cart (re-check at checkout) · review without purchase (allowed on purpose; one per user/product) · return on non-delivered order (block) · double-approved return (only if still pending) · invalid/expired promo (server-validate) · guest→login cart merge · qty 0/negative (validate) · money rounding (int IDR) · "sales today" timezone (Asia/Jakarta).

---

## 7. Definition of Done (per feature)

Works on the **deployed URL** (not just locally) · input **validated server-side** · **permissions** checked · every data screen has **loading / empty / error** states · the learner can **explain every part** · committed with **CI green**.

---

## 8. Open decisions still to settle (walk the learner through — don't just decide)

- **Postgres host:** Neon / Railway / Render free tier?
- **Express backend host:** Render / Railway free tier?
- **Image storage:** local files in dev; Cloudinary (or similar) once deployed?
- **JWT storage on the frontend:** httpOnly cookie (recommended) vs. localStorage — teach the security trade-off.
- **Validation lib:** pick when we hit Phase 3 (e.g. Zod / Joi).
- **Repo layout:** ✅ DECIDED — **monorepo** (one repo, `/frontend` + `/backend`).

---

## 9. What we did THIS session (Session 2)

1. **Read & understood** the three docs (PRD, COLLABORATION-CONTRACT, SESSION1-HANDOFF); confirmed the teaching contract.
2. **Corrected the stack docs.** Updated every "Supabase" reference in `PRD.md` and `COLLABORATION-CONTRACT.md` to the confirmed stack (Next.js + Express + hand-built JWT + Postgres/Sequelize): fixed the contract's stack line, added a **DECIDED** banner over the PRD's Option A/B/C comparison (kept as history), fixed the `users/profiles` table (no auth provider; owns `password_hash`), rewrote the walking-skeleton steps for two apps + CORS + Sequelize, and updated the draft `CLAUDE.md` block. **Updated copies were generated** (see below).
3. **Chose the on-ramp:** a thin pre-work slice, then dive in. Git pre-work **skipped** (learner already knows it). Remaining pre-work (HTTP/REST + Express vocab) **deferred** to fold into the first Express route.
4. **Entered Phase 1.** Decided repo layout: **monorepo**.
5. **Untangled a messy repo setup (via "I give up" guided fix).** Situation: learner had `git init` in home, moved the repo into `internProject/`, then followed the Express install guide (`npm init` + `npm install express`) **at the repo root**, which (a) committed `node_modules` and (b) left Express files at the root instead of in `backend/`. We fixed it: verified no stray `.git` in home; moved Express files into `backend/`; wrote a `.gitignore` (explained **line by line**, including glob syntax and `.env`/`node_modules`/build-output patterns); ran `git rm -r --cached .` + `git add .` to **untrack** `node_modules` while keeping it on disk; read `git status` together to confirm; committed + pushed.
6. **Verified the clean repo on GitHub:** root now has `backend/`, `.gitignore`, the docs + README, and **no `node_modules` anywhere**. Repo *structure* setup = **DONE**.
7. **Started** scaffolding Next.js into `frontend/` — gave the goal, concepts, and guideline. **The learner had NOT yet run it when the session ended.**

### Exact repo state at end of session
- **`backend/`** — Express **installed** (`package.json`, `package-lock.json`, `node_modules` on disk but git-ignored). **No server code yet** (no file that starts an Express server / no `app.js`).
- **`frontend/`** — folder exists but is **empty**; **Next.js NOT scaffolded yet**.
- Root has `.gitignore`, `PRD…md`, `COLLABORATION-CONTRACT…md`, `SESSION1-HANDOFF.md`, `README.md`.
- ⚠️ **Docs in the repo are the PRE-EDIT versions.** The stack-corrected `PRD.md` / `COLLABORATION-CONTRACT.md` from step 2 were produced as downloadable files but **may not yet be committed**. Early next session, offer to replace the repo copies with the corrected ones, and consider adding a real **`CLAUDE.md` at the repo root** (from the PRD appendix draft) so Claude Code picks up the stack + rules automatically.

---

## 10. ⭐ Immediate next step (start here next session)

**Finish scaffolding Next.js into `frontend/`.** The learner was mid-task with this guideline:
1. `cd frontend` (confirm location with `pwd` — must be inside `frontend`, NOT the repo root).
2. Run the official `create-next-app` **into the current directory** (target `.`), with **TypeScript = yes**, defaults for the rest.
3. Start the dev server; open `localhost:3000`; success = the Next.js starter page loads.
- **Gotchas to watch:** don't scaffold at the repo root (it scatters files across the monorepo); `create-next-app` may create a **nested `.git`** inside `frontend/` — remove it (only one repo, at the root), same fix as before.

**Then, in order:**
1. **Fold in the deferred HTTP/REST + Express vocabulary** against real code: `localhost`/ports, dev server, and what `req` / `res` / route / middleware mean — taught the moment we write the first Express route, not as upfront theory.
2. **Write the first Express server + route** in `backend/` (e.g. a trivial `GET /` or `/health` that returns "hello from API"). This is where the vocab lesson lands.
3. **Set up Sequelize + connect Postgres:** pick a Postgres host (§8), Sequelize config + first **model + migration** for `products`, wire **env vars** via a git-ignored `.env`.
4. **Prove the pipeline once:** get the Next.js frontend to call the Express backend and display the response — introducing **CORS** in practice. That completes the Phase 1 "hello, everything is connected" milestone and sets up Phase 2 (the walking skeleton).

---

*End of handoff. Assistant: confirm you've read this, restate the current status in one line, then resume at §10 (finish scaffolding Next.js into `frontend/`) using the teaching contract — goal → topics → guideline, no solution code unless the learner says "I give up." Keep explanations plain and jargon-light, and break configs down line by line.*
