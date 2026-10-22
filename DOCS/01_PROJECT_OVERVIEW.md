# Decode.io — Version 1.0 Feature Specification

**Tagline:** Solve daily. Challenge friends. Level up.

**Project type:** Java Full Stack Web Application  
**Frontend:** React + TypeScript  
**Backend:** Java + Spring Boot  
**Database:** PostgreSQL  
**Real-time communication:** WebSocket  
**Code execution:** Isolated Python execution service

## 1. Project Vision

Decode.io is a gamified Python coding platform where users practise programming problems, compete against friends in 1v1 coding battles, participate in ranked matches, and develop consistent learning habits through daily challenges, streaks, XP, achievements, and ratings.

The objective is to make coding practice feel like a competitive game rather than a traditional problem-solving website.

## 2. Three Core Features

### Core Feature 1 — Python Practice Engine

**Purpose:** Allow users to solve programming problems and receive reliable feedback on their code.

**User flow:**
1. User opens the problem library.
2. User filters problems by difficulty or topic.
3. User opens a problem and reads its description, examples, constraints, and starter code.
4. User writes a solution in the Python editor.
5. User runs the code against sample test cases.
6. User submits the solution for evaluation against hidden test cases.
7. The system displays the verdict and records the submission.

**Features:**
- Easy, Medium, and Hard difficulty levels.
- Categories such as loops, strings, arrays, functions, recursion, searching, sorting, and data structures.
- Python 3 code editor with syntax highlighting.
- Run Code and Submit Solution actions.
- Verdicts: Accepted, Wrong Answer, Runtime Error, Time Limit Exceeded, and Evaluation Error.
- Submission history and solved-problem status.
- Execution time and memory statistics when available.
- Problem hints and editorials in a later release.

**Important rules:**
- Running sample tests does not count as solving a problem.
- Hidden test cases must never be exposed to the browser.
- A problem is marked solved only after the backend receives a verified Accepted result.
- Untrusted Python code must execute in an isolated, resource-limited environment, not directly inside the Spring Boot application.

### Core Feature 2 — Multiplayer Coding Battles

**Purpose:** Let two users solve the same Python problem competitively, with casual and ranked modes kept separate.

#### A. Casual Mode

**How it works:**
1. A user selects Casual Battle.
2. The user creates a private room.
3. Decode.io generates a unique room code and invitation link.
4. The host sends the invitation to a friend.
5. The friend joins the room.
6. Both players confirm that they are ready.
7. The host selects an eligible problem or a random challenge.
8. The server starts a shared countdown.
9. Both players solve the same problem independently.
10. The first valid Accepted submission wins.
11. The result screen displays the winner, completion times, rewards, and a Rematch option.

**Rules:**
- Initial room size: exactly two players for a standard 1v1 match.
- Both players receive the same problem and time limit.
- Casual matches do not change competitive ratings.
- Completed matches can award XP and achievements.
- Repeated attempts must not generate unlimited rewards.

#### B. Ranked Mode

**Purpose:** Match players competitively and measure their relative skill.

**How it works:**
1. A user selects Ranked Battle.
2. The user enters the ranked matchmaking queue.
3. The system searches for an available opponent with a similar rating.
4. Once matched, both players receive the same server-selected ranked problem.
5. The match begins with a synchronized countdown.
6. Both players independently submit their Python solutions.
7. The server validates the submissions and determines the result.
8. The system updates the competitive rating and records the match history.

**Rules:**
- Ranked matches are 1v1.
- Ranked problem selection is controlled by the server to avoid problem-selection advantages.
- Only completed, verified ranked results affect competitive rating.
- Casual matches never affect competitive rating.
- The first valid Accepted solution wins.
- If neither player solves the problem before the deadline, the match ends without a winner and no rating change.
- A ranked disconnect or abandonment must follow defined forfeit rules.
- Users can reconnect to an active match without resetting the timer.

**Initial rating design:**
- Every player starts at 1000 rating points.
- Use an Elo-style rating calculation.
- Rating changes depend on the match outcome and the opponents' ratings.
- Record the before-rating, after-rating, and change for each completed rated match.

The initial matchmaking system should be simple. It can expand its acceptable rating range when users have waited for an opponent.

#### C. Match Results

The match result screen will include:

- Winner and opponent.
- Problem title and difficulty.
- Completion status and solve time.
- Accepted or unsuccessful submission status.
- XP earned.
- Rating change, for ranked matches only.
- Rematch or return-to-dashboard action.

The server determines match results using recorded submissions and verified evaluation results, never a winner value submitted by the browser.

### Core Feature 3 — Daily Challenge and Streaks

**Purpose:** Encourage users to practise consistently and return to the platform each day.

**How it works:**
1. The system publishes one Daily Challenge for a calendar date.
2. The same daily problem is available to all users.
3. Users solve the problem through the normal Python practice engine.
4. An Accepted submission records the daily completion.
5. Completing the daily challenge grants the daily XP reward.
6. The user's current streak and activity calendar update.

**Rules:**
- Opening the challenge or running sample tests does not count as completion.
- Each user can receive daily completion credit only once per date.
- The initial daily reset uses Asia/Kolkata.
- Completing challenges on consecutive dates increases the streak.
- Missing a date breaks the current streak.
- The longest streak remains recorded even when the current streak resets.
- A completion must be recorded by the backend to prevent duplicate awards.

## 3. Supporting Feature — XP, Achievements, and Progression

XP and competitive rating represent different things and must be stored separately.

**XP and levels:**
- Award XP for eligible first-time problem solves, daily completions, and match participation.
- Provide an additional reward for winning a battle.
- Prevent unlimited XP farming through repeated submissions or repeated matches.
- Use XP to calculate player levels.

**Achievements:**
- First Solve — solve the first coding problem.
- First Victory — win the first coding battle.
- Consistency — complete seven consecutive daily challenges.
- Problem Solver — reach a defined number of accepted problems.
- Ranked Competitor — win a defined number of ranked matches.

**Competitive rating:**
- Changes only after eligible ranked matches.
- Does not increase simply because a user completes daily challenges.
- Is independent of XP and achievement progress.

Exact XP rewards and rating parameters will be calibrated after initial testing.

## 4. Supporting Pages

1. **Homepage:** featured Daily Challenge, current streak, XP summary, Practice and Battle actions.
2. **Problem Library:** search, difficulty filters, topic filters, and solved-status indicators.
3. **Challenge Workspace:** problem description, Python editor, sample execution, submission results, and history.
4. **Battle Lobby:** room code, player readiness and match settings.
5. **Battle Workspace:** shared challenge, timer, submission results and opponent status.
6. **Ranked Matchmaking:** queue status, opponent match and match entry.
7. **Results Page:** match outcome, XP, rating change and rematch action.
8. **Dashboard:** streak calendar, XP, levels, achievements, solve statistics and match history.
9. **Profile:** username, avatar, level, XP, competitive rating and achievement collection.

## 5. Backend and Database Design

The main backend will use Java and Spring Boot. React communicates with the backend through REST APIs, while WebSocket events provide live battle updates.

**Proposed database entities:**

- `users` — identity, username, account information, XP, level, and current rating.
- `problems` — title, description, difficulty, topic, examples and starter code.
- `hidden_test_cases` — private inputs and expected outputs.
- `submissions` — submitted code, verdict, timestamps and execution metrics.
- `daily_challenges` — the problem assigned to each date.
- `daily_completions` — verified user completions by date.
- `battle_rooms` — private-room codes, host, state and expiry.
- `matches` — mode, problem, status, start/end time and outcome.
- `match_participants` — players, submission status and solve time.
- `rating_history` — rating changes caused by ranked results.
- `xp_transactions` — the reason for each XP award.
- `achievements` and `user_achievements` — available achievements and unlocked records.

PostgreSQL will be the primary database. MongoDB is not required for the initial release.

**Backend responsibilities:**
- Spring Security handles authentication and authorization.
- Spring Boot services implement problem, submission, daily challenge, reward, and match rules.
- The database stores persistent records and match history.
- WebSocket events communicate countdowns, player joins, submission outcomes and final results.
- A separate isolated execution service runs untrusted Python code and returns evaluation results.

## 6. Security and Fair Play

- Keep hidden test cases inaccessible to ordinary users.
- Never trust a client-provided verdict, winner, XP value or rating change.
- Validate room membership and authorization before allowing match actions.
- Prevent duplicate submissions from creating duplicate rewards.
- Restrict code execution time, memory, output size and system access.
- Expire inactive private rooms.
- Use server-controlled timers and timestamps.
- Ensure only verified ranked results update competitive ratings.
- Protect user records from unauthorized modification by other accounts.

## 7. Explicitly Out of Scope for the Initial Release

- Co-op coding and shared live editors.
- Team battles and tournaments.
- Multiple challenge languages.
- AI-generated solutions or automated tutoring.
- Voice and video chat.
- Complex cosmetics and virtual currency.
- Large public competitions.
- Native mobile applications.

These can be reconsidered after the first release works reliably.

## 8. Acceptance Criteria for Version 1

The initial release will be considered functional when:

1. Users can register, log in, browse Python problems, submit code, and view trustworthy evaluation results.
2. Users can create and join private casual rooms using a code.
3. Two players can complete a synchronized 1v1 casual battle.
4. Ranked matchmaking can pair two players and record a verified result.
5. Casual results do not change rating, while eligible ranked results update each player's rating exactly once.
6. A user's XP and achievements update according to server-defined rules.
7. Everyone receives the same Daily Challenge for the configured date.
8. A verified daily completion updates the streak exactly once.
9. Refreshing the browser or reconnecting does not silently reset an active match or duplicate rewards.
10. Hidden test cases and other users' private data remain protected.

## 9. Implementation Sequence

**Phase 0 — Audit the Existing Project**
Inspect the current React UI, routes, components, dependencies and Supabase configuration. Back up the working project before major changes.

**Phase 1 — Java Backend Foundation**
Create the Spring Boot service, connect PostgreSQL, configure authentication, and establish the API structure.

**Phase 2 — Python Practice Engine**
Build the problem library, editor integration, isolated execution flow, verdict handling and submission history.

**Phase 3 — Daily Challenge and Progression**
Implement daily assignments, completion records, streaks, XP, achievements and the dashboard.

**Phase 4 — Casual 1v1 Battles**
Implement private rooms, invitation codes, readiness, shared countdowns, match timers, verified winners and rematches.

**Phase 5 — Ranked Mode**
Add matchmaking, competitive ratings, rating history, ranked results and disconnect/forfeit handling.

**Phase 6 — Testing and Release**
Test the application with two accounts, verify security rules, handle reconnects, refine responsive layouts and deploy the complete system.

## Final Product Decision

Decode.io Version 1 is built around three pillars:

1. **Practise:** write and submit Python solutions.
2. **Compete:** race a friend casually or compete in ranked 1v1 matches.
3. **Progress:** complete daily challenges, maintain streaks, earn XP, unlock achievements and improve competitive rating.

Every additional feature should strengthen one of these pillars rather than distract from them.