# Product Requirements Document (PRD)
## Single-Shop Fashion Catalog & Store — MVP

**Project type:** Personal learning project (internship, SWEN)
**Goal:** Learn how to build a full web app from scratch, writing the code myself, using AI tools (Claude / Claude Code) as a helper only when I understand what the code does.
**Not launching:** This app will not go live to real customers. No real money, no real user data at risk.
**Timeline:** 4–6 weeks
**Budget:** ≤ $50 USD total (aim: $0 by using free tiers)
**Market context:** Indonesia (currency = Indonesian Rupiah, IDR)

---

## 1. What we are building (in one line)

A simple online store for **one single shop** — like the Nike or Adidas catalog app, **not** a multi-seller marketplace like Shopee or Tokopedia. Visitors can browse a product catalog, view item details, add things to a cart, and go through a checkout that stops just before real payment. Registered users get accounts, order history, reviews, complaints, and returns. An admin manages products, stock, promos, orders, and requests.

---

## 2. Goals and non-goals

**Goals**
- Learn the full lifecycle of building an app: database design, backend API, frontend UI, authentication, and deployment.
- Write the meaningful code myself and understand every part.
- Build the *simplest working version* of each feature — no over-engineering.

**Non-goals (explicitly out of scope for v1)**
- Real payment processing (payment is **simulated**).
- Real launch, marketing, SEO, scaling for thousands of users.
- Advanced analytics / recommendation engine (the "intelligent layer") — this is a **stretch goal only** if time allows.
- Live "who is online right now" presence tracking.
- Email/SMS notifications (we show on-screen messages instead).

---

## 3. Users and scale

- **Guest** — can browse the catalog and add items to a cart. Must log in to check out.
- **Registered user** — account, login/logout, password reset, cart, checkout, order history, reviews, complaints, return requests, profile.
- **Admin** — everything a user can do, plus manage products, categories, stock, images, prices, promos, orders, complaints, and return/refund requests, and view simple store statistics.
- **Expected size:** fewer than 10 users (basically the developer + testers). This keeps every technical choice simple.

---

## 4. User stories (v1)

**Account & profile**
1. As a guest, I can browse the whole catalog without an account.
2. As a user, I can create an account, log in, log out, and reset my password.
3. As a user, I can view and edit my profile: name, email, contact number, address, age, height, weight.
4. As a user, I can view my order (shopping) history.

**Browsing & catalog**
5. As a user, I can see the full catalog of products.
6. As a user, I can open any product to see its details, including its size and color options and price.
7. As a user, I can browse products by category (e.g., Shoes, Apparel, Accessories).
8. As a user, I can search products by name and filter by category.
9. As a user, I can see when a size/color option is **out of stock** and cannot add it to the cart.

**Cart & checkout**
10. As a guest or user, I can add an item (specific size + color) to my cart.
11. As a user, I can edit item quantity in the cart, and remove items.
12. As a user, I must log in before checkout.
13. As a user, I go through the checkout steps (review cart → shipping address → order summary → **Simulate Payment**). The app stops one step before real payment; a "Simulate successful payment" button marks the order as **paid** (clearly labeled as fake).
14. As a user, after a simulated payment I see an on-screen confirmation and the order appears in my history.

**After purchase**
15. As a logged-in user, I can give a rating (1–5) and a written review to a product. *(Decision: any logged-in user may review — not limited to buyers.)*
16. As a user, I can file a complaint (with an optional link to an order); an admin can respond.
17. As a user, I can request a **return + refund** for an item on a delivered order. It stays **pending** until an admin approves or rejects it.

**Admin stories (v1)**
1. As an admin, I can log in with an admin account that has extra access (role-based).
2. As an admin, I can add, edit, and remove products; edit stock, images, and prices.
3. As an admin, I can create categories and assign each product to a category.
4. As an admin, I can create a simple promo (a discount or promo code, e.g., "10% off").
5. As an admin, I can view a list of orders and update their status (paid → shipped → delivered).
6. As an admin, I can review and respond to complaints.
7. As an admin, I can approve or reject return/refund requests. Approving marks the item/order as returned and restores stock (refund = a status change, since payment is fake).
8. As an admin, I can see simple store stats: orders today, sales total today, number of signups, best-selling products, and top-rated products.

> **Note on "most clicked" products:** counting clicks needs an activity-tracking table, which is part of the stretch "intelligent layer." **Best-selling** (from orders) and **top-rated** (from reviews) work in v1; **most-clicked** is deferred.

---

## 5. Scope summary (simplest form of each feature)

| Feature | In v1? | Simplest version we will build |
|---|---|---|
| Guest browsing | ✅ | Read-only catalog, no login needed |
| Accounts (signup/login/logout/reset) | ✅ | Built by hand: bcrypt password hashing + JWT sign/verify + auth middleware |
| Profile fields (incl. age/height/weight) | ✅ | Plain form fields saved to a profile table |
| Catalog + product detail | ✅ | List page + detail page |
| Categories | ✅ | Flat list (Shoes / Apparel / Accessories) |
| Search + filter | ✅ | Search by name + filter by category |
| Per-variant stock (size+color) | ✅ | Each size+color combo is its own row with its own ID and stock count |
| Out-of-stock handling | ✅ | Show "Out of stock", disable add-to-cart |
| Cart (add/edit/remove) | ✅ | Guest cart in browser; saved cart for logged-in users |
| Checkout + simulated payment | ✅ | Steps up to a "Simulate payment" button; flat shipping fee as a constant |
| Order history + statuses | ✅ | One status field: pending → paid → shipped → delivered → returned |
| Reviews & ratings | ✅ | Any logged-in user, one review per product |
| Complaints | ✅ | User submits, admin responds |
| Return/refund + admin review | ✅ | One request table + approve/reject workflow |
| Promos | ✅ | One simple discount or promo code |
| Admin dashboard | ✅ | Simple counts from the database |
| Intelligent layer (behavior analytics) | 🔶 Stretch | Only if time remains; DB is designed to allow it later |
| Live presence, emails, wishlist, privacy/ToS pages | ❌ | Skipped for a non-launched learning app |

---

## 6. Tech stack options (decided — see banner)

> ✅ **DECIDED (this supersedes the Option A/B/C comparison below).** The supervisor confirmed the stack:
> **Next.js + TypeScript frontend · a separate Express.js backend · JWT auth built by hand (bcrypt password hashing, token sign/verify, auth middleware) · PostgreSQL with the Sequelize ORM.**
> This is closer to Option C (from-scratch) than Option A. The comparison below is kept only as historical context for *why* the choice was made. Two consequences: it's **two apps over HTTP → CORS**, and **you build authentication yourself** (the single biggest addition — budget real time for it).

The three options below all use the same idea for the app itself: **Next.js + TypeScript** (a popular framework where the frontend and backend live together). They differ in **how much you build yourself** vs. how much a managed service does for you. The key question for a learning project is: *how much do you want to code by hand vs. use a ready-made service?*

> **How to read the "coding amount":** more manual coding = more you learn about the low-level parts, but slower and easier to get security wrong. Less manual coding = faster and safer, but you learn less about that specific part.

### Option A — Next.js + Supabase (recommended)
Supabase is one service that gives you a **database (Postgres)**, a **login system**, **file/image storage**, and **security rules**.

| You DO write yourself | You do NOT write from scratch (service handles it) |
|---|---|
| Database schema (tables, relationships) | Auth: signup, login, logout, password reset, sessions |
| All queries and data access | The database server setup / hosting |
| All API routes and business logic | File/image storage server |
| The entire UI (catalog, cart, checkout, admin) | The plumbing that connects login to the database |
| Cart, checkout, order, return logic | (You still write the security *rules*; Supabase enforces them) |

**Coding amount: MEDIUM.** You write all the meaningful app logic and learn database design, APIs, and security rules — but you skip re-inventing login and server setup. Best balance for "learn to build an app in 4–6 weeks."
**Cost:** $0 on free tier. Note: free Supabase project sleeps after 7 days idle (a tiny scheduled ping keeps it awake); no auto-backups on free (easy DIY backup).

### Option B — Next.js + Neon (database) + Clerk (login)
Clerk is a dedicated login service with ready-made sign-in screens. Neon is a managed Postgres database. Image storage would be a **separate** service again.

| You DO write yourself | You do NOT write from scratch |
|---|---|
| Database schema | Auth: Clerk gives pre-built login/signup UI — the *least* auth code of all options |
| All queries, API routes, UI, business logic | The database server (Neon) |
| Glue code to connect 3 separate services | |
| A separate image-storage integration (extra work) | |

**Coding amount: LEAST auth code, but MORE integration/glue code.** You'd write the least authentication code here — but you also **learn the least about how login works**, and you juggle three services instead of one. More moving parts to keep in sync.
**Cost:** $0 on free tiers (each service has its own limits).

### Option C — Build from scratch on your own server (VPS / Railway)
Run one server yourself with Node/Next.js + your own Postgres database + your own file handling.

| You DO write yourself | You do NOT write from scratch |
|---|---|
| **Your own authentication** (password hashing, sessions/tokens, reset flow) | (almost nothing is given to you) |
| Database setup and connection | |
| File-upload handling | |
| Server configuration and deployment | |
| Everything above in Option A too | |

**Coding amount: HIGHEST.** Deepest learning about how everything works underneath — but the slowest, and hand-rolled authentication is genuinely easy to get wrong. Usually too much for a first from-scratch build in 4–6 weeks.
**Cost:** ~$5/month for a small server (still under $50).

### Quick comparison

| | Option A: Supabase | Option B: Neon + Clerk | Option C: From scratch |
|---|---|---|---|
| Auth code you write | Some (rules) | Least | Most |
| Database work | You design + query | You design + query | You design + query + set up server |
| File storage | Built in | Separate service | You build it |
| Services to manage | 1 | 3 | 1 (but you run it) |
| Manual coding overall | **Medium** | Medium (more glue) | **Highest** |
| Learning depth | Balanced | Shallow on auth | Deepest, but slowest |
| Time risk (4–6 wks) | Low | Medium | High |
| Cost | $0 | $0 | ~$5/mo |

### Questions to ask your supervisor (to finalize the stack)
- **Auth:** For an app like this, do teams usually integrate a third-party auth provider (Supabase Auth / Clerk / Auth0) or build authentication from scratch? What's standard in production, and what's best for *learning*?
- **Database:** What database do you usually use for a catalog/commerce app — managed Postgres (Supabase/Neon), self-hosted Postgres, MySQL, or something else?
- **ORM vs raw SQL:** Do you use an ORM (Prisma / Drizzle) or write raw SQL? Which should I learn first?
- **Hosting:** Do you deploy on managed platforms (Vercel / Netlify / Railway) or self-managed cloud (AWS / GCP)?
- **Image storage:** Where do product images usually go — object storage (S3 / Supabase Storage / Cloudflare R2) or the database?
- **Learning balance:** Given the goal is to learn, how much should I build by hand vs. use managed services?

> **~~Default assumption: Option A (Supabase)~~ — SUPERSEDED.** Confirmed stack: Next.js frontend + separate Express backend + hand-built JWT auth + PostgreSQL/Sequelize. Frontend on Vercel (free); backend + managed Postgres on a free tier (Neon / Railway / Render — final host chosen in Phase 1). Target cost: $0 (non-commercial learning project).

---

## 7. Data model (database schema)

Money is stored as **whole integer Rupiah** (IDR has no cents in practice) — never as decimals/floats. All timestamps stored in UTC. "Today" for admin stats is calculated in the **Asia/Jakarta** timezone so numbers are consistent.

The main tables and their key fields:

**`users` / `profiles`** — one row per registered user. With hand-built JWT there is **no external auth provider**: you own this table fully, including the hashed password.
`id`, `email` (unique), `password_hash`, `full_name`, `contact_number`, `address`, `age`, `height_cm`, `weight_kg`, `role` (`user` | `admin`), `deleted_at` (nullable, for soft delete), `created_at`.

**`categories`** — product groups (Shoes, Apparel, Accessories)
`id`, `name`, `slug`, `parent_id` (nullable, optional sub-categories later), `created_at`.

**`products`** — the base item (shared name, description, price, category)
`id`, `name`, `description`, `category_id` (→ categories), `base_price` (integer IDR), `is_active` (for soft delete/hide), `created_at`.

**`product_variants`** — **the unique size+color unit with its own stock** (this is the "unique ID per size+color" requirement)
`id` (unique), `product_id` (→ products), `size`, `color`, `stock_quantity` (integer), `sku` (optional), `created_at`.
> Example: "T-Shirt / Size A / Color B" and "T-Shirt / Size A / Color C" are two different rows with two different IDs and separate stock counts.

**`product_images`** — pictures for a product
`id`, `product_id` (→ products), `image_url`, `is_primary`, `sort_order`.

**`cart_items`** — saved cart for logged-in users (guest cart lives in the browser and merges on login)
`id`, `user_id` (→ profiles), `variant_id` (→ product_variants), `quantity`, `created_at`.

**`orders`** — one checkout
`id`, `user_id` (→ profiles), `status` (`pending` | `paid` | `shipped` | `delivered` | `returned` | `cancelled`), `subtotal`, `shipping_fee`, `discount_amount`, `total` (all integer IDR), `promo_code` (nullable), `shipping_name`, `shipping_contact`, `shipping_address` (snapshot text so history stays correct), `paid_at` (nullable), `created_at`.

**`order_items`** — the lines inside an order (with **snapshots** so old orders still display correctly even if the product later changes or is removed)
`id`, `order_id` (→ orders), `variant_id` (→ product_variants, nullable if variant later deleted), `product_name` (snapshot), `size` (snapshot), `color` (snapshot), `unit_price` (snapshot, integer IDR), `quantity`.

**`promos`** — simple discounts / promo codes
`id`, `code`, `discount_type` (`percent` | `fixed`), `discount_value`, `is_active`, `valid_from` (nullable), `valid_until` (nullable), `created_at`.

**`reviews`** — rating + text (any logged-in user; one review per user per product)
`id`, `user_id` (→ profiles), `product_id` (→ products), `rating` (1–5), `comment`, `created_at`. Unique on (`user_id`, `product_id`).

**`complaints`** — user-submitted issues, admin responds
`id`, `user_id` (→ profiles), `order_id` (nullable → orders), `subject`, `message`, `status` (`open` | `responded` | `closed`), `admin_response` (nullable), `created_at`, `responded_at` (nullable).

**`return_requests`** — return + refund workflow (admin must approve)
`id`, `order_id` (→ orders), `order_item_id` (→ order_items), `user_id` (→ profiles), `reason`, `status` (`pending` | `approved` | `rejected`), `admin_note` (nullable), `created_at`, `reviewed_at` (nullable).

**`activity_events`** — 🔶 **stretch only** (the intelligent layer): clicks, views, time spent
`id`, `user_id` (nullable), `event_type`, `product_id` (nullable), `metadata`, `created_at`.
*Not built in v1, but listed so the schema is ready for it.*

### Relationships in plain English
- A **category** has many **products**; a **product** belongs to one category.
- A **product** has many **variants** (each size+color) and many **images**.
- A **user** has one **profile**, many **cart items**, many **orders**, many **reviews**, many **complaints**, and many **return requests**.
- An **order** has many **order items**; each order item points to a **variant** but also stores a snapshot copy of its details.
- A **return request** points to one order and one order item.

---

## 8. Edge cases we have thought about

1. **A user is deleted but has past orders.** → We **soft-delete** the user (set `deleted_at`) instead of removing the row, and order items keep **snapshot** copies of product name/price. So order history never breaks and stats stay correct.
2. **Only 1 stock left, and 2 users check out at the same time (race condition).** → We decrement stock with a **conditional, atomic update**: `UPDATE product_variants SET stock_quantity = stock_quantity - qty WHERE id = ? AND stock_quantity >= qty`, inside a transaction, at the moment the order is placed (the simulate-payment step). If it changes 0 rows, that second user is told the item just sold out. We never "read then write" stock separately.
3. **A product or variant is edited/removed after someone ordered it.** → Order items store snapshots; products use `is_active` (soft delete). Old orders still show the correct name, size, color, and price.
4. **An item sits in a cart until it goes out of stock.** → Stock is re-checked at checkout. If it's no longer available, checkout is blocked with a clear message.
5. **Two admins edit the same product at once.** → For a learning app we accept "last save wins" (documented). Real concurrency control can be added later.
6. **A user reviews a product they never bought.** → Allowed on purpose (your decision). A unique (user, product) rule stops the same user spamming multiple reviews on one product.
7. **A user requests a return on an order that isn't delivered.** → The return button only appears for `delivered` orders; the server also re-checks the status.
8. **A return request is approved twice (double refund).** → The approve action only runs if the request is still `pending`; otherwise it's ignored.
9. **An invalid or expired promo code is used.** → The code is validated on the server at checkout; invalid/expired codes are rejected.
10. **A guest adds items, then logs in.** → The browser cart is merged into the saved cart on login.
11. **Cart quantity set to 0 or negative.** → Validated; quantity 0 removes the item, negatives are rejected.
12. **Money rounding errors.** → Avoided by storing money as whole integer Rupiah everywhere; never floats.
13. **"Sales today" changes by timezone.** → "Today" is fixed to Asia/Jakarta so the number is stable.

---

## 9. Walking-skeleton plan (deploy first, then build features)

The idea: get the **thinnest possible slice** — **one page → one API route → one table** — live on a real URL *before* building any real features. This proves the whole pipeline works end to end, so every later problem is smaller.

**Simplest steps:**
1. Create **two apps** — a Next.js + TypeScript frontend and a separate Express.js backend (one repo, `/frontend` + `/backend`); push to GitHub.
2. Deploy **two services**: frontend on Vercel, backend + managed Postgres on a free tier (Render / Railway / Neon). Every push auto-deploys and gives live URLs. Configure **CORS** so the frontend can call the backend.
3. Create the managed Postgres database; set up **Sequelize** (config + first **migration**) and a `products` table with 2–3 sample rows.
4. Build **one page** `/products` (Next.js) that calls **one Express route** `GET /api/products` that reads **one table** via Sequelize and lists the products. This is the end-to-end proof.
5. Add login scaffolding **built by hand**: `register` + `login` endpoints (bcrypt hash, JWT sign/verify) and **one protected route** behind auth middleware.
6. Add CI (GitHub Actions): lint + type-check + build/test must pass before merging.
7. Add basic error tracking (Sentry free tier) and a `/health` route that checks the database connection.

**Skeleton is done when:** pushing to GitHub auto-deploys both services to live URLs, the frontend URL lists real products fetched from the Express API (through CORS), register/login works with a real JWT and a protected route, CI blocks a broken commit, and a test error shows up in the error tracker.

---

## 10. Rough timeline (4–6 weeks)

| Week | Focus |
|---|---|
| **1** | Foundations: repo, deployed skeleton, database schema, auth, catalog list + detail page. |
| **2** | Categories + navigation, product detail with variants, admin product management (add/edit/remove). |
| **3** | Cart (guest + saved), checkout flow + simulated payment, orders + order history + statuses. |
| **4** | Reviews & ratings, complaints + admin response, return/refund requests + admin review, simple promos. |
| **5** | Admin dashboard (simple stats), out-of-stock + edge-case hardening, testing, polish. |
| **6** | Buffer: bug fixing, final testing, presentation — and the **intelligent layer** *only if* time allows. |

---

## 11. Definition of Done (per feature)

A feature is "done" only when all of these are true:
- Works end-to-end on the **deployed URL**, not just on my laptop.
- Input is validated on the **server** (not only in the browser).
- The right person is allowed to do the action (a normal user can't reach admin actions; a user can't touch another user's data).
- Every screen that loads data has three states: **loading**, **empty**, and **error**.
- I can explain in plain words what every part of the code does.
- The change is committed to GitHub and CI is green.

---

## 12. Open decisions to confirm with supervisor

1. Final **tech stack** (Option A / B / C) — see the questions in Section 6.
2. **ORM vs raw SQL** for learning.
3. Whether to attempt the **intelligent layer** at all, or leave it fully out.
4. Anything the supervisor expects to see that's missing here.

---

## Appendix A — Draft `CLAUDE.md` (repo rules for AI assistance)

> This file goes in the repo root. AI tools read it so their output follows our rules. Adjust names if the stack changes.

```
# CLAUDE.md — Fashion Catalog MVP

## What this project is
A single-shop fashion catalog + store MVP. Personal learning project.
Goal: I write and understand the code; AI only assists.
Not launching. Payment is SIMULATED (no real gateway).

## Stack (CONFIRMED)
- Frontend: Next.js + TypeScript
- Backend: Express.js — a SEPARATE app/server (NOT Next.js API routes)
- Auth: JWT built by hand — bcrypt password hashing, token sign/verify,
  auth middleware. No managed auth provider; the users table holds the
  hashed password.
- Database: PostgreSQL with the Sequelize ORM (models + migrations)
- Frontend host: Vercel (free). Backend + Postgres host: Render/Railway/Neon free tier.
- Two apps over HTTP → CORS must be configured deliberately.
- Market: Indonesia. Currency: integer Rupiah (IDR), no decimals.

## Hard rules
- Money is ALWAYS stored as whole integer Rupiah. Never floats.
- Timestamps stored in UTC. "Today" stats use Asia/Jakarta timezone.
- Stock lives on product_variants (size + color), decremented with a
  conditional atomic UPDATE inside a transaction. Never read-then-write.
- Order items store snapshots (name, size, color, unit_price) so history
  survives product edits/deletes.
- Every API route: validate input on the server + check the caller is
  allowed to do this action (user vs admin; owner vs not).
- Never delete a user row with orders; soft-delete (deleted_at).
- Every data screen has loading, empty, and error states.
- Secrets go in environment variables only, never in code. .env is gitignored.
- Configure CORS deliberately between the Next.js frontend and Express backend.
- Pick ONE JWT storage approach on the frontend (httpOnly cookie recommended)
  and stick to it.
- Explain any non-trivial code so I understand it before I accept it.

## Definition of Done
Works on the deployed URL · server-side validation + permission check ·
loading/empty/error states · committed with green CI · I can explain it.

## Reference feature
Once the first feature folder is clean, name it here and tell AI to copy
its pattern exactly for the next features.
```
