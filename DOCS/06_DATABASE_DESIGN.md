# Decode.io — Database Design

## 1. Purpose

This document defines the proposed PostgreSQL data model for Decode.io Version 1.

The database must support:
- User accounts and profiles.
- The Python problem library.
- Python submissions and evaluation results.
- Casual and Ranked 1v1 coding battles.
- Daily challenges and completion streaks.
- XP, achievements, competitive ratings, and match history.

PostgreSQL will be the primary database. Spring Data JPA and Hibernate will provide the Java persistence layer.

## 2. Database Design Principles

- Every persistent entity has a primary key.
- Foreign keys maintain relationships between records.
- Unique constraints prevent duplicate records where required.
- Important validation rules are enforced by the backend and, where appropriate, the database.
- Hidden test cases are kept separate from public problem content.
- XP awards and competitive rating changes must be recorded and protected against duplicate processing.
- Critical operations must use database transactions when multiple records need to change together.
- Derived statistics should be calculated from authoritative records or maintained as consistent aggregates.

## 3. Proposed Database Tables

### A. users

Stores account and authentication information.

Fields:
- `id` — primary key.
- `username` — unique public username.
- `email` — unique email address.
- `password_hash` — securely hashed password, if using local password authentication.
- `created_at` — account creation timestamp.
- `updated_at` — last account update timestamp.
- `account_status` — account status.

Rules:
- Usernames and email addresses must satisfy defined uniqueness rules.
- Plain-text passwords must never be stored.
- Account data must not be exposed to unauthorized users.

### B. user_profiles

Stores public profile information.

Fields:
- `user_id` — primary key and foreign key to users.
- `display_name` — public display name.
- `avatar_url` — optional profile image URL.
- `bio` — optional short description.

Rules:
- A profile belongs to one user.
- Users may update only their own editable profile fields.

### C. problems

Stores the public information for coding problems.

Fields:
- `id` — primary key.
- `slug` — unique problem identifier for URLs.
- `title` — problem title.
- `description` — problem statement.
- `difficulty` — Easy, Medium, or Hard.
- `starter_code` — initial Python code.
- `constraints` — problem constraints.
- `status` — Draft or Published.
- `created_at` — creation timestamp.
- `updated_at` — last update timestamp.

Rules:
- Only published problems appear in the public library.
- Every published problem must have a valid statement and appropriate examples.
- A problem must have a tested evaluation suite before being used in a battle.

### D. problem_topics

Stores available topic categories.

Fields:
- `id` — primary key.
- `name` — topic name.
- `slug` — unique topic identifier.

Examples:
- Arrays
- Strings
- Loops
- Functions
- Searching
- Sorting
- Recursion
- Data Structures

### E. problem_topic_mappings

Connects problems to topics.

Fields:
- `problem_id` — foreign key to problems.
- `topic_id` — foreign key to problem_topics.

Rules:
- A problem can have multiple topics.
- A topic can belong to multiple problems.
- The pair `(problem_id, topic_id)` must be unique.

### F. problem_examples

Stores public sample inputs and outputs.

Fields:
- `id` — primary key.
- `problem_id` — foreign key to problems.
- `sample_input` — sample input.
- `expected_output` — public expected output.
- `explanation` — optional explanation.
- `display_order` — ordering of examples.

Rules:
- Public examples may be displayed in the browser.
- Public examples must be distinct from the private hidden evaluation suite.

### G. hidden_test_cases

Stores private test cases used by the code evaluation service.

Fields:
- `id` — primary key.
- `problem_id` — foreign key to problems.
- `input_data` — test input.
- `expected_output` — expected output.
- `weight` — optional scoring weight.
- `display_order` — internal ordering.

Rules:
- Ordinary users must never receive hidden test inputs or expected outputs.
- Access must be restricted to trusted backend execution components.
- Hidden test cases must not be included in public problem API responses.

### H. submissions

Stores users' code submissions and evaluation results.

Fields:
- `id` — primary key.
- `user_id` — foreign key to users.
- `problem_id` — foreign key to problems.
- `match_id` — optional foreign key to matches when the submission belongs to a battle.
- `source_code` — submitted Python source code.
- `verdict` — evaluation status.
- `execution_time_ms` — execution duration, when available.
- `memory_used_kb` — memory usage, when available.
- `created_at` — submission timestamp.
- `evaluated_at` — evaluation completion timestamp.

Possible verdicts:
- Pending
- Running
- Accepted
- Wrong Answer
- Runtime Error
- Time Limit Exceeded
- Evaluation Error

Rules:
- Users may access only submissions they are authorized to view.
- An evaluation-service failure must not be recorded as a Wrong Answer.
- A battle submission must be associated with a valid participant in that match.
- Only verified evaluation results may affect solved status, rewards, or match results.

### I. daily_challenges

Assigns one problem to each daily challenge date.

Fields:
- `id` — primary key.
- `challenge_date` — calendar date in the configured timezone.
- `problem_id` — foreign key to problems.
- `published_at` — publication timestamp.

Rules:
- Each date has at most one published Daily Challenge.
- All users receive the same challenge for a given date.
- The initial reset timezone is Asia/Kolkata.

### J. daily_completions

Stores verified daily challenge completions.

Fields:
- `id` — primary key.
- `user_id` — foreign key to users.
- `daily_challenge_id` — foreign key to daily_challenges.
- `accepted_submission_id` — foreign key to the qualifying accepted submission.
- `completed_at` — completion timestamp.

Rules:
- The combination `(user_id, daily_challenge_id)` must be unique.
- A completion is recorded only after a verified Accepted submission.
- Duplicate requests must not create duplicate completions or XP awards.
- Current and longest streaks are based on qualifying completion dates.

### K. battle_rooms

Stores private room and lobby information.

Fields:
- `id` — primary key.
- `room_code` — unique invitation code.
- `host_user_id` — foreign key to users.
- `status` — Waiting, Ready, In Progress, Completed, Cancelled, or Expired.
- `created_at` — creation timestamp.
- `expires_at` — room expiry timestamp.

Rules:
- A room code must be unique and difficult to guess.
- A private room initially supports two players.
- New members cannot join after the match begins.
- Expired and completed rooms cannot start new matches.

### L. battle_room_members

Records which users belong to private rooms.

Fields:
- `room_id` — foreign key to battle_rooms.
- `user_id` — foreign key to users.
- `joined_at` — join timestamp.
- `is_ready` — readiness status.

Rules:
- The pair `(room_id, user_id)` must be unique.
- A user cannot occupy both player positions using the same account.
- Room membership must be validated by the backend.

### M. matches

Stores actual Casual and Ranked battle records.

Fields:
- `id` — primary key.
- `room_id` — optional foreign key to battle_rooms; ranked matchmaking may not use a private room.
- `problem_id` — foreign key to problems.
- `mode` — Casual or Ranked.
- `status` — Scheduled, In Progress, Completed, Cancelled, or Expired.
- `started_at` — server-controlled start timestamp.
- `deadline_at` — match deadline.
- `ended_at` — completion timestamp.
- `winner_user_id` — optional foreign key to users.
- `result_reason` — reason for the match outcome.

Rules:
- Both players receive the same problem and match duration.
- Match start and end times are controlled by the backend.
- Winner information must be derived from verified match state.
- A match result can be finalized only once.

### N. match_participants

Stores each player's participation and final match status.

Fields:
- `id` — primary key.
- `match_id` — foreign key to matches.
- `user_id` — foreign key to users.
- `final_status` — participant result.
- `solved_at` — accepted solution timestamp, when applicable.
- `solve_time_ms` — time taken to solve, when applicable.
- `rating_before` — rating before an eligible ranked result.
- `rating_change` — rating adjustment, when applicable.

Rules:
- The pair `(match_id, user_id)` must be unique.
- A standard 1v1 match has two distinct participants.
- Only eligible Ranked matches can change competitive rating.
- A Casual result never modifies competitive rating.

### O. xp_transactions

Records the reason for each XP award.

Fields:
- `id` — primary key.
- `user_id` — foreign key to users.
- `amount` — XP awarded.
- `reason` — reward category.
- `source_type` — event type, such as a daily completion or match result.
- `source_id` — identifier of the event that generated the reward.
- `idempotency_key` — unique key preventing duplicate awards.
- `created_at` — reward timestamp.

Rules:
- XP is awarded by backend-controlled logic.
- Each eligible reward event can be processed only once.
- Repeated submissions or browser requests must not create unlimited rewards.

### P. rating_history

Records changes to a user's competitive rating.

Fields:
- `id` — primary key.
- `user_id` — foreign key to users.
- `match_id` — foreign key to matches.
- `rating_before` — rating before the result.
- `rating_after` — rating after the result.
- `rating_change` — difference between the two ratings.
- `created_at` — record timestamp.

Rules:
- A user can have at most one rating update for a given match.
- Only eligible Ranked results create rating-history records.
- Casual matches never create rating changes.
- Initial competitive rating is 1000.

### Q. achievements

Stores available achievements.

Fields:
- `id` — primary key.
- `name` — achievement name.
- `description` — explanation.
- `criteria_type` — achievement category.
- `criteria_value` — threshold or target value.

Examples:
- First Solve
- First Victory
- Seven-Day Streak
- Problem Solver
- Ranked Competitor

### R. user_achievements

Records achievements unlocked by users.

Fields:
- `user_id` — foreign key to users.
- `achievement_id` — foreign key to achievements.
- `unlocked_at` — unlock timestamp.

Rules:
- The pair `(user_id, achievement_id)` must be unique.
- Unlocking an achievement repeatedly must not grant duplicate rewards.

## 4. Main Relationships

- One user can have one profile.
- One user can create many submissions.
- One problem can have many submissions.
- Problems can have multiple topics through problem_topic_mappings.
- One problem can have multiple examples and hidden test cases.
- One date has at most one Daily Challenge.
- One user can complete many Daily Challenges over time.
- One private room can have multiple room members, but the initial room limit is two.
- One match has two participants in the standard 1v1 design.
- One match can have multiple submissions.
- Users can earn many XP transactions, rating-history records, and achievements.
- An achievement can be unlocked by many users.

## 5. Derived Statistics

The following values must not be treated as independently user-editable data:

- Total XP
- Level
- Current streak
- Longest streak
- Number of solved problems
- Competitive rating
- Battle win count

Authoritative records should drive these values:
- XP comes from XP transactions.
- Streaks come from daily completion dates.
- Solved counts come from verified problem completions or equivalent authoritative records.
- Competitive ratings come from the initial rating and valid rating changes.
- Battle wins come from finalized match records.

Cached aggregate values may be introduced later for performance, provided they remain consistent with their source records.

## 6. Transaction and Integrity Requirements

- A verified Accepted submission and its eligible completion/reward records must not be processed twice.
- A match result and its rating updates must be committed consistently.
- A daily completion and its XP reward must be protected against duplicate processing.
- Database constraints must prevent duplicate room members, daily completions, and achievement unlocks.
- Critical state changes should use database transactions and appropriate concurrency control.

## 7. Scope Notes

This is the proposed logical database design, not the final SQL schema.

Exact PostgreSQL data types, indexes, enum implementation, deletion policies, migrations, and entity mappings will be finalized during implementation.

The schema may evolve as the feature rules and API contracts become more precise.