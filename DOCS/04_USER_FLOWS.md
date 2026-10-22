# Decode.io — User Flows

## 1. Purpose

This document defines how users interact with Decode.io and how the application should respond to their actions.

Every flow includes the normal path and important exceptional situations.

## 2. User Registration and Login

### Normal flow

1. A new user opens Decode.io.
2. The user selects Register.
3. The user provides the required account details.
4. The backend validates the details and creates the account.
5. The user logs in.
6. The application opens the user's dashboard.

### Expected behavior

- Usernames and email addresses must satisfy the application's uniqueness rules.
- Invalid credentials must be rejected.
- Passwords must never be stored as plain text.
- Private user information must not be exposed to other users.
- Authenticated actions must verify the user's identity and permissions.

## 3. Python Problem Library

### Normal flow

1. The user opens the problem library.
2. The application displays available problems.
3. The user filters problems by difficulty or topic.
4. The user selects a problem.
5. The application displays its description, examples, constraints, and starter code.
6. The user selects Solve to open the coding workspace.

### Expected behavior

- Problems display the correct title, difficulty, and topic.
- Filters can be combined where appropriate.
- Solved and unsolved states reflect verified submission records.
- Unavailable or unpublished problems cannot be submitted.

## 4. Python Practice Engine

### Normal flow

1. The user opens a coding problem.
2. The application displays the problem description and Python editor.
3. The user writes or edits a solution.
4. The user selects Run Code.
5. The system executes the code against the permitted sample tests.
6. The user reviews the output and makes changes if necessary.
7. The user selects Submit Solution.
8. The backend submits the code for evaluation against hidden test cases.
9. The application displays the final verdict.
10. An Accepted result updates the user's solved-problem status and eligible rewards.

### Possible outcomes

- Accepted: all required tests pass.
- Wrong Answer: the solution produces an incorrect result.
- Runtime Error: the submitted program fails during execution.
- Time Limit Exceeded: execution exceeds the configured time limit.
- Compilation or syntax-related error: the evaluator reports that the submitted program cannot execute.
- Evaluation Error: the code evaluation service fails or produces no reliable verdict.

### Important rules

- Running sample tests does not automatically mark a problem solved.
- Hidden test cases and expected outputs must remain private.
- Repeated Accepted submissions must not create duplicate first-solve rewards.
- Submitted code must execute in a restricted environment.
- An execution service failure must not be incorrectly recorded as a Wrong Answer.

## 5. Casual 1v1 Coding Battle

### A. Room creation

1. The user selects Casual Battle.
2. The user selects Create Room.
3. The backend creates a private room.
4. The application displays an invitation code and link.
5. The host shares the invitation with a friend.

### B. Joining the room

1. The second user opens the invitation link or enters the room code.
2. The backend validates the room and its current state.
3. The second user joins the waiting lobby.
4. Both players see their opponent's name and readiness status.
5. The host starts the match once both players are ready.

### C. Playing the match

1. The backend selects the challenge and records the match start time.
2. Both players receive the same problem.
3. A synchronized countdown begins.
4. Both players write and submit their own solutions independently.
5. Submission results are verified by the backend.
6. The first valid Accepted solution wins.
7. If neither player solves the problem before time expires, the match ends without a winner.

### D. Match completion

1. The backend records the final result.
2. The application displays the winner or a no-winner result.
3. Eligible XP and achievement rewards are calculated.
4. The application offers a rematch or return to the dashboard.

### Important rules

- A standard match contains exactly two players.
- Both players receive the same problem and time limit.
- Casual matches do not change competitive rating.
- A room cannot accept new players once its match has started.
- A user cannot join the same room multiple times with the same account.
- Only verified submissions can determine the winner.
- A repeated request must not award duplicate rewards.
- A disconnected player should be allowed to reconnect while the match remains active.
- If a player leaves permanently, the match follows a defined cancellation or forfeit rule.

## 6. Ranked 1v1 Coding Battle

### Normal flow

1. The user selects Ranked Battle.
2. The backend places the user in the matchmaking queue.
3. The system searches for an eligible opponent with a similar competitive rating.
4. Both users are assigned the same challenge.
5. The match starts using a server-controlled timer.
6. Both players submit solutions independently.
7. The backend verifies the outcome.
8. The system records the result and calculates the rating changes.
9. The updated ratings and match history become visible.

### Important rules

- Ranked and Casual modes must remain separate.
- Competitive ratings change only after eligible completed ranked matches.
- A match result must update each participant's rating no more than once.
- The initial rating is 1000 points.
- If neither player solves the problem before the deadline, the match ends without a rating change.
- Disconnects, abandonment, and interrupted evaluation must follow explicit rules.
- Matchmaking can expand its acceptable rating range when a user has waited too long.

## 7. Daily Challenge and Streaks

### Normal flow

1. The user opens the dashboard.
2. The application displays the current Daily Challenge.
3. The user selects the challenge and opens the coding workspace.
4. The user writes and submits a solution.
5. The backend verifies the final result.
6. If the solution is Accepted, the user's daily completion is recorded.
7. Eligible XP is awarded.
8. The streak calendar and dashboard update.

### Important rules

- The initial daily reset timezone is Asia/Kolkata.
- All users receive the same published challenge for a given date.
- Opening a challenge or running sample tests does not count as completion.
- Each user receives completion credit only once per daily date.
- Completing challenges on consecutive dates extends the current streak.
- Missing a qualifying date breaks the current streak.
- The longest recorded streak remains preserved.
- Duplicate requests must not award XP more than once.

## 8. Dashboard and Progression

### Normal flow

1. The user opens the dashboard after logging in.
2. The application retrieves the user's progress.
3. The dashboard displays solved problems, XP, level, streak, and achievements.
4. The user opens match history or submission history for additional details.
5. Changes from successful practice sessions and completed matches are reflected in the relevant statistics.

### Important rules

- XP and competitive rating are different metrics.
- Casual matches can award eligible XP but never alter competitive rating.
- Ranked results may alter competitive rating according to the rating system.
- Progress must be retrieved from persistent records.
- Users cannot change their own XP, rating, achievements, or verified results through browser requests.

## 9. Global Error Handling

The application must provide clear feedback when:

- Registration or login fails.
- A room code is invalid, expired, or full.
- A user attempts an unauthorized action.
- The Python execution service is unavailable.
- A database operation fails.
- A WebSocket connection is interrupted.
- A match expires or is cancelled.
- A request is duplicated or submitted after a match has ended.

Errors should not expose passwords, secrets, hidden test cases, or internal server details.

## 10. General Design Principle

The backend is the source of truth for authentication, problem evaluation, room membership, match timing, winners, XP, ratings, streaks, and achievements.

The frontend displays the state and sends user actions. It must not independently decide whether a solution is accepted, who wins a battle, or which rewards are earned.