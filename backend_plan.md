# DeCode.io Backend Implementation Plan (Supabase + Next.js)

## Architecture
We will use a **Serverless** architecture leveraging Next.js App Router and Supabase.
- **Database**: PostgreSQL (via Supabase) for relational data (Users, Puzzles, Submissions).
- **Auth**: Supabase Auth (Email/Password, OAuth providers).
- **API**: Next.js Server Actions (preferred over API routes for App Router) for secure, direct database access.
- **AI Integration**: Storing generated problems in the `puzzles` table.

## Database Schema (PostgreSQL)

### 1. `profiles` (extends Supabase Auth)
Stores public user information.
- `id` (UUID, references `auth.users`)
- `username` (Text, unique)
- `full_name` (Text)
- `avatar_url` (Text)
- `xp` (Integer, default 0)
- `level` (Integer, default 1)
- `created_at` (Timestamp)

### 2. `puzzles`
Stores coding challenges (curated + AI generated).
- `id` (UUID)
- `title` (Text)
- `slug` (Text, unique)
- `description` (Text)
- `difficulty` (Enum: 'Easy', 'Medium', 'Hard')
- `category` (Text)
- `starter_code` (Text)
- `test_cases` (JSONB) - Inputs and expected outputs validation.
- `xp_reward` (Integer)
- `is_ai_generated` (Boolean)
- `created_at` (Timestamp)

### 3. `submissions`
Tracks user progress and leaderboard stats.
- `id` (UUID)
- `user_id` (UUID, references `profiles.id`)
- `puzzle_id` (UUID, references `puzzles.id`)
- `code_submitted` (Text)
- `status` (Enum: 'Pending', 'Passed', 'Failed')
- `execution_time_ms` (Integer)
- `completed_at` (Timestamp)

## Implementation Steps

- [ ] **Setup**: Install Supabase client and configure environment variables.
- [ ] **Database**: Create `schema.sql` for the user to run in Supabase Dashboard.
- [ ] **Auth**: Create Supabase Middleware for session management.
- [ ] **Client**: Initialize Supabase client in `utils/supabase/server.ts` and `client.ts`.
- [ ] **API/Actions**:
    - `getLeaderboard()`: Sort `profiles` by XP.
    - `getPuzzles()`: Fetch available puzzles.
    - `submitSolution()`: Record submission and update XP.
