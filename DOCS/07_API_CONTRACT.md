# Decode.io — API Contracts

## 1. Purpose

This document defines how the React frontend communicates with the Java Spring Boot backend.

The backend exposes REST APIs for normal application operations and WebSocket events for live battle updates.

All public application APIs use the prefix:

`/api/v1`

The backend is responsible for authorization, validation, business rules, and persistent state changes.

## 2. API Conventions

### HTTP Methods

- GET — Retrieve data.
- POST — Create a resource or initiate an action.
- PATCH — Update selected fields or transition a resource.
- DELETE — Remove a resource when deletion is permitted.

### Common Responses

Successful requests return the requested data or confirmation.

Errors should include:
- An appropriate HTTP status code.
- A stable error code.
- A readable error message.
- Optional field-level validation details.

### Important HTTP Status Codes

- 200 — Request succeeded.
- 201 — Resource created.
- 202 — Request accepted for asynchronous processing.
- 400 — Invalid request.
- 401 — Authentication required.
- 403 — Insufficient permissions.
- 404 — Resource not found.
- 409 — Request conflicts with the current resource state.
- 429 — Rate limit exceeded.
- 500 — Unexpected server error.

Timestamps returned by APIs should use ISO 8601 format. Server-generated timestamps should be stored consistently, preferably in UTC.

## 3. Authentication and Profiles

### Registration

`POST /api/v1/auth/register`

Creates a user account.

Request fields:
- username
- email
- password

Expected result:
- Account creation confirmation and permitted public user information.

### Login

`POST /api/v1/auth/login`

Authenticates a user.

Request fields:
- email
- password

Expected result:
- Authenticated session or token, depending on the selected security design.

### Current User

`GET /api/v1/users/me`

Returns the authenticated user's profile and progress summary.

### Public Profile

`GET /api/v1/users/{userId}`

Returns permitted public profile information.

Rules:
- Private account information must not be exposed.
- Users cannot edit another user's account or rewards.
- Authentication and session handling will be finalized during implementation.

## 4. Python Problem Library

### List Problems

`GET /api/v1/problems`

Optional query parameters:
- difficulty
- topic
- search
- page
- size
- status

Expected result:
- Paginated problem summaries with identifiers, titles, difficulties, topics, and permitted solved-status information.

### Retrieve a Problem

`GET /api/v1/problems/{problemId}`

Returns:
- Problem statement.
- Difficulty and topic tags.
- Constraints.
- Public sample inputs and outputs.
- Python starter code.

Rules:
- Only published problems are publicly available.
- Hidden test cases and expected outputs must never appear in this response.

## 5. Python Practice Engine

### Run Sample Code

`POST /api/v1/submissions/run`

Request fields:
- problemId
- sourceCode

Purpose:
- Execute submitted code against permitted sample tests.

Expected result:
- Execution output and sample-test results.
- An execution status and relevant diagnostics.

### Submit a Solution

`POST /api/v1/submissions`

Request fields:
- problemId
- sourceCode
- optional matchId when the submission belongs to an active battle.

Expected result:
- Submission identifier.
- Initial processing status.

The endpoint may return HTTP 202 when evaluation continues asynchronously.

### Retrieve a Submission

`GET /api/v1/submissions/{submissionId}`

Returns:
- Current or final verdict.
- Permitted test results.
- Execution duration and memory usage when available.
- Submission timestamps.

### Retrieve Submission History

`GET /api/v1/users/me/submissions`

Returns the authenticated user's authorized submission history.

Rules:
- The server verifies ownership and match participation.
- Accepted status must come from the trusted evaluation service.
- Evaluation errors must not be recorded as Wrong Answer.
- Repeated requests must not generate duplicate XP or match results.
- Python code must execute in an isolated environment with resource limits.

## 6. Private 1v1 Coding Battles

### Create a Room

`POST /api/v1/battles/rooms`

Request fields:
- mode: CASUAL
- optional problem-selection preference.

Expected result:
- Room identifier.
- Invitation code.
- Room status and expiry information.

The backend generates the room code.

### Join a Room

`POST /api/v1/battles/rooms/{roomCode}/join`

Expected result:
- Room details and permitted participant information.

Rules:
- Only two distinct players can occupy a standard 1v1 room.
- Expired or started rooms cannot accept new players.
- The server verifies membership and authorization.

### Set Readiness

`PATCH /api/v1/battles/rooms/{roomCode}/readiness`

Request fields:
- ready

Purpose:
- Updates the authenticated player's readiness status.

### Start a Casual Match

`POST /api/v1/battles/rooms/{roomCode}/start`

Purpose:
- Validates room membership and readiness.
- Creates the match and selects its problem.
- Records the server-controlled start time and deadline.

Only an authorized host may initiate the match.

### Retrieve a Match

`GET /api/v1/battles/matches/{matchId}`

Returns:
- Match mode and status.
- Problem information.
- Match timing.
- Permitted participant details.
- Final results when available.

### List Match History

`GET /api/v1/users/me/matches`

Returns the authenticated user's authorized match history.

### Rematch

`POST /api/v1/battles/matches/{matchId}/rematch`

Initiates a new match request based on a completed match.

The backend must validate the participants and create a new match rather than modifying the previous result.

## 7. Ranked Matchmaking

### Join Ranked Queue

`POST /api/v1/battles/ranked/queue`

Places the authenticated player into the ranked matchmaking queue.

### Leave Ranked Queue

`DELETE /api/v1/battles/ranked/queue`

Removes the player from the queue when a match has not already been assigned.

### Retrieve Ranked Rating

`GET /api/v1/users/me/rating`

Returns:
- Current competitive rating.
- Ranked match statistics where available.

Rules:
- Only eligible Ranked results affect rating.
- Casual matches never modify rating.
- Match assignment and rating updates are controlled by the backend.
- Each completed ranked match can update a participant's rating only once.

## 8. Daily Challenges and Streaks

### Retrieve Daily Challenge

`GET /api/v1/daily-challenges/current`

Returns:
- Challenge date.
- Problem summary.
- Completion status for the authenticated user.
- Relevant publication and deadline information.

### Retrieve Daily Challenge History

`GET /api/v1/daily-challenges/history`

Returns previous daily challenges and the authenticated user's completion history.

### Retrieve Streak Statistics

`GET /api/v1/users/me/streak`

Returns:
- Current streak.
- Longest streak.
- Qualifying completion dates.

Rules:
- The initial daily reset timezone is Asia/Kolkata.
- Completion is recorded only after a verified Accepted submission.
- Daily completion and its XP reward must be processed at most once per user per date.
- Streak values must be derived from authoritative completion records.

## 9. XP and Achievements

### Retrieve Progress

`GET /api/v1/users/me/progress`

Returns:
- Total XP.
- Level.
- Solved-problem count.
- Current and longest streak.
- Permitted activity statistics.

### Retrieve Achievements

`GET /api/v1/users/me/achievements`

Returns unlocked achievements and their unlock timestamps.

Rules:
- The frontend cannot directly award XP or unlock achievements.
- Eligible rewards are calculated by backend services.
- Duplicate reward requests must not create additional awards.

## 10. WebSocket Events

WebSocket communication is used for real-time battle updates.

Proposed event categories include:

- ROOM_MEMBER_JOINED
- ROOM_READINESS_CHANGED
- MATCH_COUNTDOWN
- MATCH_STARTED
- SUBMISSION_STATUS_CHANGED
- PLAYER_SOLVED
- MATCH_COMPLETED
- PLAYER_DISCONNECTED
- PLAYER_RECONNECTED

Rules:
- The server validates every client action.
- Clients cannot publish authoritative winner, rating, or XP updates.
- Private battle events are delivered only to authorized participants.
- Reconnection must restore the current permitted match state.
- The server's match deadline is authoritative.

Exact WebSocket destinations and payloads will be specified when the battle module is implemented.

## 11. Internal Python Execution Integration

The Java backend communicates with a separate trusted execution service.

This is an internal integration, not a public endpoint exposed to ordinary users.

The integration must support:
- Submitting Python source code and authorized test inputs.
- Requesting execution against public or hidden tests.
- Receiving a processing status and final verdict.
- Returning execution metrics when available.
- Handling timeouts, unavailable services, and invalid evaluator responses.

The execution service must enforce isolation and resource limits. Hidden tests and their expected outputs must not be returned to the browser.

## 12. API Security Requirements

- Authenticate protected requests.
- Authorize access to user-owned resources.
- Validate all request fields on the server.
- Reject invalid match-state transitions.
- Rate-limit expensive code execution requests.
- Prevent duplicate XP awards and rating updates.
- Keep secrets and private test data out of public responses.
- Use appropriate transaction boundaries for critical database changes.
- Return useful errors without exposing internal stack traces or secrets.

## 13. Implementation Notes

This document defines the initial API contract, not a completed implementation.

Request schemas, response DTOs, authentication strategy, pagination conventions, WebSocket payloads, and the exact code-execution integration will be refined as the corresponding modules are implemented.

The API should remain versioned and documented so that frontend and backend development can proceed independently.