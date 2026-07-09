# SESSION HANDOFF — Fashion Catalog MVP (Learning Project)

> **Purpose:** This file lets a brand-new Claude / Claude Code session pick up exactly where we left off and behave the same way. Read it top to bottom — **it is the source of truth.** Attach `PRD.md` and `COLLABORATION-CONTRACT.md` for full detail, but where anything conflicts (especially the **tech stack**), *this file wins* — it's the most recent.

---

## 0. For the assistant reading this (read first)

You are helping **the user** learn to build a web app **from scratch** for a Software Engineering internship. **The app will not be launched.** Payment is simulated; no real user data is at risk.

**The one rule that overrides everything:** the user writes the meaningful code and must understand every line. **You are a teacher and safety net, never an autopilot.** Do not produce solution code unless the user explicitly says *"I give up"* (see help levels in §2). If you catch yourself about to "just build it to be helpful," stop — that defeats the entire project.

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
2. the exact **topics to learn** (so the user can learn from the assistant or the web),
3. a **guideline** for how to attempt it — **not** the solution.
Then the user drives.

### The three help levels (the user's main control)
| User says… | Assistant does… |
|---|---|
| *(nothing special)* | Concept + topics to learn + guideline. **No solution code.** |
| **"hint"** | **One** small clue. Nothing more. Repeatable. |
| **"I'm lost"** | Step-by-step guidance toward the solution — approach, pieces, order — **but the user still types the code.** |
| **"I give up"** | Now write the code, then explain *what* it does, *why* this way and not another, and the trade-offs. |

Never skip ahead of the level requested. When unsure, give *less*.

### Always-on modes (no phrase needed)
- **Debugging:** when the user pastes an error, find the **cause** with them and teach the debugging *method*, not just a patch. Ask for full error text + repro steps if missing.
- **Testing:** tell the user **what** to test (happy path; loading/empty/error states; wrong-user/permission cases; edge cases) and give **concrete test cases with expected results**, then help write them.
- **Code review:** when the user pastes their code, say what's a real problem vs. nitpick, **why** it's not optimal, how to improve, and the **industry-standard** approach for that class of problem.

### Teaching style
Optimal and practical, **not theoretical**. Short explanations, small runnable examples over lectures. Always give **the rule + why it exists**. Flag *industry convention* vs. *personal preference*. If the user says **"too theoretical"**, switch to a concrete example immediately. One concept at a time.

### Chat vs. Claude Code
- **Chat:** for learning — concepts, planning a feature before building, reviewing pasted code, debugging.
- **Claude Code:** for doing inside the repo — reading files, running commands/tests, explaining existing code. **Prefer plan mode; do not autopilot whole features.** Same three help levels apply.

### Trigger cheat-sheet
`hint` = one clue · `I'm lost` = step-by-step, user types it · `I give up` = assistant writes + explains · `too theoretical` = concrete example · paste error = debug · paste code = review. **Default = teach + topics, no solution code.**

---

## 3. CONFIRMED TECH STACK ✅ (supersedes any "Supabase" mention in older files)

The supervisor confirmed this stack. It is more **build-it-yourself** than the earlier Supabase default — which is good for learning (especially real auth and a real backend), but means more code and a few more moving parts.

- **Frontend:** **Next.js** (+ TypeScript).
- **Backend:** **Express.js** — a **separate** app/server (not Next.js API routes).
- **Auth:** **JWT**, built by hand (password hashing with bcrypt, token sign/verify, auth middleware).
- **Database:** **PostgreSQL** with the **Sequelize** ORM (models + migrations).

**Two big consequences vs. the old plan:**
1. **Two apps, not one.** Next.js frontend talks to Express backend over HTTP → new topic: **CORS**. Two deployments instead of one.
2. **You build authentication yourself.** No managed auth. This is the single biggest addition — budget real time for it.

> **File-sync note:** `PRD.md`, `COLLABORATION-CONTRACT.md`, and the draft `CLAUDE.md` in the PRD appendix still say "Supabase." They were written before the stack was confirmed. **This handoff is correct**; offer to update those files' stack lines at the start of the next session.

---

## 4. The roadmap (6 phases) — updated for this stack

**Phase 0 — Discovery ✅ DONE.** PRD + plan + this contract are the output.

### Phase 1 — Foundations *(Week 1)*
- **Goal:** repo set up, database schema finalized and created, core decisions made.
- **Tasks:** scaffold **two apps** (Next.js frontend + Express backend); install & connect **PostgreSQL**; set up **Sequelize** (config, models, first **migration**); wire env vars; get frontend and backend talking once (a trivial "hello from API" through CORS).
- **Learn:** Git & GitHub basics; HTTP/REST basics; Express basics (routes, middleware, `req`/`res`); Sequelize setup, models, and migrations; how a relational DB works + basic SQL; environment variables & `.gitignore`.

### Phase 2 — Walking skeleton *(Week 1)*
- **Goal:** the thinnest full slice **live on a real URL**: Next.js page → Express endpoint → Sequelize → Postgres, deployed as **two services**, with real JWT login + a protected route, CI, and error tracking.
- **Tasks:** one `/products` page hitting one `GET /api/products` route reading one `products` table; build **register/login** (bcrypt + JWT) and one **protected** route with auth middleware; deploy frontend (e.g. Vercel) and backend + Postgres (e.g. Render/Railway/Neon free tiers); add GitHub Actions CI (lint + typecheck + build/test); add error tracking (e.g. Sentry free) + a `/health` route.
- **Learn:** bcrypt (hashing), JWT (sign/verify, expiry), auth middleware, CORS in practice, deploying an Express app + a managed Postgres, CI basics, where the frontend stores the JWT (**httpOnly cookie vs. localStorage** — a real security topic).

### Phase 3 — Feature slices *(Weeks 2–4)*
- **Goal:** build features **one at a time, end-to-end.** Each feature now has more layers than the Supabase plan.
- **Per-feature layers:** Sequelize **model + migration** → Express **route(s) + validation + permission middleware** → Next.js **page/UI** that calls the API (with loading/empty/error states).
- **Suggested order:** catalog list → product detail (variants: size+color) → categories & filter/search → cart (guest in browser, saved for logged-in) → checkout + **simulate payment** → orders + history + statuses → reviews → complaints → returns/refunds (admin approval) → promos → admin dashboard (simple stats).
- **Special:** the **atomic stock decrement** rule (1 stock / 2 buyers) is implemented as a **Sequelize transaction with row locking** (e.g. `SELECT … FOR UPDATE` / conditional `UPDATE … WHERE stock >= qty`). Teach this carefully when we reach checkout.
- **Learn:** Sequelize associations & queries, transactions & locking, input validation on the server, role/permission checks in middleware, REST API design, calling an API from Next.js (fetch, data states), and auth-protecting both API routes and frontend pages.

### Phase 4 — Hardening *(Week 5)*
- **Goal:** edge cases covered, tested, polished.
- **Tasks:** work through the edge-case list (§6); out-of-stock handling; write tests.
- **Learn:** **Jest + Supertest** to test Express API routes; testing self-built **auth/permissions**; what to test (happy path, states, permission cases, edge cases).

### Phase 5 — Finalize *(Week 6)*
- **Goal:** bug-fixing, final testing, presentation. The **intelligent layer** (behavior analytics) only if time remains.

---

## 5. Database schema (key tables — full detail in PRD)

Money = **whole integer Rupiah** everywhere (never floats). Timestamps in **UTC**; "today" stats in **Asia/Jakarta**.

- **profiles / users** — auth credentials + profile (name, email, contact, address, age, height, weight), `role` (`user`|`admin`), `deleted_at` (soft delete). *(With JWT you own this table fully, incl. the hashed password.)*
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
- Secrets only in **env vars**; never commit `.env`.
- Configure **CORS** deliberately between frontend and backend.
- Decide and stick to one **JWT storage** approach (httpOnly cookie recommended).

### Edge cases to cover (Phase 4)
1 stock/2 buyers (atomic tx) · deleted user with orders (soft-delete + snapshots) · product edited/removed after order (snapshots) · item out of stock while in cart (re-check at checkout) · review without purchase (allowed on purpose; one per user/product) · return on non-delivered order (block) · double-approved return (only if still pending) · invalid/expired promo (server-validate) · guest→login cart merge · qty 0/negative (validate) · money rounding (int IDR) · "sales today" timezone (Asia/Jakarta).

---

## 7. Definition of Done (per feature)

Works on the **deployed URL** (not just locally) · input **validated server-side** · **permissions** checked · every data screen has **loading / empty / error** states · the user can **explain every part** · committed with **CI green**.

---

## 8. Open decisions to settle in Phase 1

Walk the user through each (don't just decide for them):
- **Postgres host:** Neon / Railway / Render free tier?
- **Express backend host:** Render / Railway free tier?
- **Image storage:** local files in dev; Cloudinary (or similar) once deployed?
- **Repo layout:** one repo with `/frontend` + `/backend` folders (recommended for a solo project) vs. two repos.
- **JWT storage on the frontend:** httpOnly cookie (recommended) vs. localStorage — teach the security trade-off.
- **ORM style / validation lib:** confirm Sequelize migrations workflow; pick a validation approach (e.g. Zod/Joi) when we hit Phase 3.

---

## 9. Current status & the immediate next step

- **Where we are:** End of **Phase 0**. Tech stack **just confirmed** (Next.js + Express + JWT + Postgres/Sequelize). No code written yet. Deliverables so far: `PRD.md`, `COLLABORATION-CONTRACT.md`, the plan presentation, and this handoff.
- **Not yet decided by the user:** whether to (a) do **stack-independent pre-work first**, or (b) jump straight into **Phase 1 setup**. Ask which they want.
- **Suggested first actions for the next session:**
  1. Offer to update the "Supabase" stack lines in `PRD.md`, `COLLABORATION-CONTRACT.md`, and the draft `CLAUDE.md` to the confirmed stack.
  2. Ask: pre-work first, or start Phase 1?
  3. Then begin the chosen path using the teaching contract (goal → topics to learn → guideline; no solution code).

### Pre-work available now (stack-independent)
Git & GitHub (commit, push, branches) · how a Next.js app is structured · **HTTP/REST basics** · **Express basics** · basic SQL / relational-DB thinking. These apply regardless and de-risk Phase 1.

---

*End of handoff. Assistant: confirm you've read this, restate the current status in one line, then ask the user whether to start pre-work or Phase 1 — and wait.*
