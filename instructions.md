# Project Instructions - School Management System

> **IMPORTANT:** AI agents must read this file before editing any file in this project.
> Last updated: 2026-06-14

---

## Project Overview

- **Framework:** Next.js (App Router) with `src/` directory
- **Styling:** Tailwind CSS + shadcn/ui components
- **Database:** MongoDB via Mongoose
- **Auth:** Custom cookie-based session (NOT NextAuth)

---

## DO NOT EDIT (Protected Files)

These files are complete, stable, and working. Do not modify unless explicitly instructed.

| File | Reason |
|------|--------|
| `src/app/(auth)/login/page.js` | Complete login with form validation, role-based redirect |
| `src/app/(auth)/register/page.js` | Complete registration with client-side validation |
| `src/app/(auth)/layout.js` | Auth layout - working correctly |
| `src/components/AuthProvider.jsx` | Session management, auto-redirect, context provider |
| `src/components/layout/DashboardLayout.jsx` | Dashboard shell - auth guard + layout wrapper |
| `src/components/layout/Header.jsx` | Full header with mobile menu, avatar dropdown, logout |
| `src/components/layout/Sidebar.jsx` | Role-based navigation, active link highlighting |
| `src/components/ui/input.jsx` | Uses standard HTML input (NOT @base-ui). Do NOT revert to @base-ui/react/input - it breaks controlled inputs |
| `src/lib/auth.js` | Password hashing + HMAC session tokens - do not alter crypto logic |
| `src/lib/mongodb.js` | Mongoose connection caching - do not alter |
| `src/app/api/auth/login/route.js` | Auth login endpoint - working |
| `src/app/api/auth/register/route.js` | Auth register endpoint - working |
| `src/app/api/auth/logout/route.js` | Auth logout endpoint - working |
| `src/app/api/auth/session/route.js` | Session verification endpoint - working |
| `src/app/layout.js` | Root layout with Providers - working |
| `src/app/globals.css` | Theme variables - do not modify without understanding impact |
| `src/models/User.js` | User schema - working, do not add/remove fields |
| `eslint.config.mjs` | Linting config - do not modify |
| `next.config.mjs` | Next.js config - do not modify |
| `postcss.config.mjs` | PostCSS/Tailwind config - do not modify |
| `package.json` | Dependencies - do not add packages without asking |
| `.env.local` | Environment variables - NEVER commit or expose |

---

## WORKING (Functional - Can Read For Reference)

These files are implemented and working. Use them as reference for code style and patterns.

### Auth System
| File | Description |
|------|-------------|
| `src/components/Providers.jsx` | Root provider wrapper (AuthProvider + Toaster) |
| `src/components/shared/StatsCard.jsx` | Reusable stats card component |
| `src/app/not-found.js` | 404 page |
| `src/app/page.js` | Root redirect to /login |

### UI Components (shadcn/ui)
All files in `src/components/ui/` are standard shadcn/ui components and should NOT be modified:
- `avatar.jsx`, `badge.jsx`, `button.jsx`, `calendar.jsx`, `card.jsx`
- `dialog.jsx`, `dropdown-menu.jsx`, `label.jsx`, `select.jsx`
- `separator.jsx`, `sheet.jsx`, `skeleton.jsx`, `sonner.jsx`
- `table.jsx`, `tabs.jsx`, `textarea.jsx`

### Data Models (All Working)
All files in `src/models/` are complete Mongoose schemas:
- `Announcement.js`, `Attendance.js`, `Class.js`, `Fee.js`, `Grade.js`
- `Schedule.js`, `Student.js`, `Subject.js`, `Teacher.js`, `User.js`

---

## IN PROGRESS / NEEDS WORK

### Admin Dashboard Pages - Have UI, Need Backend Integration
These pages have good UI structure with forms/dialogs but use **hardcoded data**. Need to connect to API routes.

| File | Status | What's Needed |
|------|--------|---------------|
| `src/app/(dashboard)/admin/students/page.js` | UI Complete | Connect to `/api/students` for CRUD |
| `src/app/(dashboard)/admin/teachers/page.js` | UI Complete | Connect to `/api/teachers` for CRUD |
| `src/app/(dashboard)/admin/classes/page.js` | UI Complete | Connect to `/api/classes` for CRUD |
| `src/app/(dashboard)/admin/subjects/page.js` | UI Complete | Need `/api/subjects` route (missing!) |
| `src/app/(dashboard)/admin/fees/page.js` | UI Complete | Connect to `/api/fees` for CRUD |
| `src/app/(dashboard)/admin/announcements/page.js` | UI Complete | Need API route (missing!) |
| `src/app/(dashboard)/admin/reports/page.js` | Partial | Download buttons non-functional |
| `src/app/(dashboard)/admin/page.js` | Partial | Stats hardcoded, need real data |

### Teacher Dashboard Pages - Partial Implementation
| File | Status | What's Needed |
|------|--------|---------------|
| `src/app/(dashboard)/teacher/attendance/page.js` | UI Complete | Connect to `/api/attendance` |
| `src/app/(dashboard)/teacher/grades/page.js` | Broken | Save handler is a no-op - does not update state |
| `src/app/(dashboard)/teacher/schedule/page.js` | Partial | Hardcoded timetable, need API |
| `src/app/(dashboard)/teacher/announcements/page.js` | Partial | Read-only, no create functionality |
| `src/app/(dashboard)/teacher/page.js` | Partial | Stats hardcoded, need real data |

### Student Dashboard Pages - All Read-Only
All student pages display hardcoded data with no interactivity:
| File | Status |
|------|--------|
| `src/app/(dashboard)/student/page.js` | Partial - hardcoded stats |
| `src/app/(dashboard)/student/attendance/page.js` | Partial - hardcoded data |
| `src/app/(dashboard)/student/fees/page.js` | Partial - hardcoded data |
| `src/app/(dashboard)/student/grades/page.js` | Partial - hardcoded data |
| `src/app/(dashboard)/student/schedule/page.js` | Partial - hardcoded data |

### Parent Dashboard Pages - All Read-Only
All parent pages display hardcoded data with no interactivity:
| File | Status |
|------|--------|
| `src/app/(dashboard)/parent/page.js` | Partial - hardcoded data |
| `src/app/(dashboard)/parent/attendance/page.js` | Partial - hardcoded data |
| `src/app/(dashboard)/parent/child/page.js` | Partial - hardcoded data |
| `src/app/(dashboard)/parent/fees/page.js` | Partial - hardcoded data |
| `src/app/(dashboard)/parent/grades/page.js` | Partial - hardcoded data |

### API Routes - Need Auth & CRUD Expansion
These routes have basic GET+POST but need authentication, filtering, PUT/DELETE:
| File | What's Needed |
|------|---------------|
| `src/app/api/students/route.js` | Add auth checks, PUT/DELETE, filtering, pagination |
| `src/app/api/teachers/route.js` | Add auth checks, PUT/DELETE, filtering, pagination |
| `src/app/api/classes/route.js` | Add auth checks, PUT/DELETE, filtering |
| `src/app/api/fees/route.js` | Add auth checks, PUT/DELETE, payment status |
| `src/app/api/grades/route.js` | Add auth checks, PUT/DELETE, filtering by student/subject |
| `src/app/api/attendance/route.js` | Add auth checks, PUT/DELETE, date/class filtering |

---

## BROKEN / DO NOT USE

| File | Issue |
|------|-------|
| `src/app/api/seed/route.js` | Creates users WITHOUT passwords - seeded accounts cannot log in |
| `src/app/api/session/route.js` | Returns first DB user regardless of auth - NON-FUNCTIONAL, superseded by `/api/auth/session/` |
| `src/proxy.js` | Wrong filename/export for Next.js middleware - will never execute |

---

## EMPTY / PLACEHOLDER

| File/Dir | Description |
|----------|-------------|
| `src/app/api/subjects/` | Directory exists but NO route.js - needs to be created |
| `src/components/providers/` | Empty directory - unused |
| `src/app/(dashboard)/page.js` | Just redirects to `/admin` |

---

## KEY WARNINGS

1. **DO NOT use `@base-ui/react/input`** for form inputs. It uses `Field.Control` which intercepts `value`/`onChange` and breaks React controlled inputs. Always use the current `src/components/ui/input.jsx` (standard HTML `<input>`).

2. **Auth pattern:** All API routes that require auth must verify the session token from cookies using `verifySessionToken()` from `src/lib/auth.js`.

3. **API response format:** All API routes return JSON with `{ error: "message" }` for errors and structured data for success.

4. **Role-based access:** Four roles exist: `ADMIN`, `TEACHER`, `STUDENT`, `PARENT`. Dashboard pages are organized by role under `src/app/(dashboard)/[role]/`.

5. **No real-time data:** All dashboard pages currently use hardcoded data. No page makes actual API calls to fetch data from MongoDB (except auth endpoints).
