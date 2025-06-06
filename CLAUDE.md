# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FocusPledge (Logoff) is a Next.js 15 marketing website for the Logoff mobile app - a focus and productivity app that helps users manage screen time through group challenges. The site handles challenge sharing, user onboarding, and deep linking to the mobile app.

## Development Commands

```bash
# Local development with Turbopack
npm run dev

# Build for production
npm run build

# Preview with Cloudflare Pages locally
npm run preview

# Deploy to Cloudflare Pages
npm run deploy

# Lint the codebase
npm run lint

# Generate Cloudflare environment types
npm run cf-typegen
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.3.1 with React 19 and TypeScript
- **Runtime**: Cloudflare Pages with Edge Runtime
- **Database**: Supabase (PostgreSQL) with server-side client
- **Styling**: Tailwind CSS v4 with custom purple gradient theme
- **UI Components**: Radix UI primitives with shadcn/ui patterns

### Key Directories
- `/src/app/`: Next.js app router pages and API routes
- `/src/app/join/[id]/`: Dynamic challenge pages with sharing functionality
- `/src/lib/supabase/`: Supabase client setup and database types
- `/src/components/ui/`: Reusable UI components

### Database Schema
Three main tables in Supabase:
- `profiles`: User data (id, avatar_url, full_name, email, username)
- `challenges`: Challenge details (id, start_date, end_date, host_profile_id, description, name)
- `challenge_participants`: Links users to challenges

### Important Patterns

1. **Server Components**: All data fetching happens in server components using Supabase server client
2. **Edge Runtime**: API routes use `export const runtime = 'edge'` for Cloudflare compatibility
3. **Deep Linking**: Challenge pages include iOS universal links for app integration
4. **Environment Variables**: Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### API Routes
- `/api/delete-own-account`: Authenticated endpoint for user account deletion

### Deployment
The site deploys to Cloudflare Pages. Use `npm run preview` to test locally with Cloudflare's environment before deploying with `npm run deploy`.