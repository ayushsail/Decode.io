# Decode.io — Development Roadmap

## 1. Objective

Build Decode.io incrementally, delivering a working application at each milestone.

The project will use React + TypeScript for the frontend, Java + Spring Boot for the backend, and PostgreSQL for persistent data.

Each milestone must be tested before the next one begins.

## 2. Phase 0 — Project Foundation

### Tasks
- Initialize the Git repository and establish the main branch.
- Create the frontend and backend project structure.
- Initialize the React + TypeScript frontend.
- Generate the Spring Boot Maven application.
- Connect Spring Boot to PostgreSQL.
- Configure environment variables and local development settings.
- Add a health-check API endpoint.
- Add initial automated tests.
- Document how to run both applications locally.

### Completion criteria
- The frontend starts successfully.
- The backend starts successfully.
- The backend connects to PostgreSQL.
- The frontend can communicate with the backend.
- Secrets are not committed to Git.
- The project can be started using documented instructions.

## 3. Phase 1 — Python Problem Library

### Tasks
- Create the initial PostgreSQL schema.
- Implement problem and topic entities.
- Implement repository, service, and controller layers.
- Add problem listing and problem detail APIs.
- Support difficulty and topic filtering.
- Build the problem library interface in React.
- Add initial curated Python problems.

### Completion criteria
- Problems are retrieved from PostgreSQL.
- Users can browse and filter published problems.
- A problem detail page displays the correct description and examples.
- Automated tests verify problem retrieval and filtering.

## 4. Phase 2 — Python Practice Engine

### Tasks
- Integrate the Monaco code editor.
- Implement sample-code execution.
- Select and integrate an isolated Python execution service.
- Implement asynchronous submission processing where necessary.
- Process evaluation verdicts.
- Store submission history.
- Track verified solved-problem status.
- Add server-side validation and execution limits.

### Completion criteria
- Users can edit and submit Python solutions.
- Correct and incorrect solutions receive appropriate verdicts.
- Runtime errors and execution-service failures are handled correctly.
- Hidden test cases remain private.
- Accepted submissions are stored persistently.
- Duplicate submissions do not generate duplicate rewards.

## 5. Phase 3 — Daily Challenges and Progression

### Tasks
- Implement daily challenge assignment.
- Establish the Asia/Kolkata daily reset policy.
- Record verified daily completions.
- Calculate current and longest streaks.
- Implement XP transactions.
- Introduce levels and a small initial achievement system.
- Build the user dashboard.

### Completion criteria
- Every user sees the same published daily challenge for a date.
- Only an Accepted submission earns completion credit.
- Duplicate requests cannot create duplicate daily rewards.
- Streaks are calculated correctly across consecutive dates.
- Progress persists after restarting the application.

## 6. Phase 4 — Casual 1v1 Coding Battles

### Tasks
- Implement private room creation.
- Generate unique invitation codes.
- Support joining and leaving a room.
- Implement player readiness.
- Establish shared match timing.
- Integrate WebSocket events.
- Use the practice engine to evaluate battle submissions.
- Determine verified match results.
- Implement the results screen and rematch flow.
- Handle reconnection and expired rooms.

### Completion criteria
- Two distinct users can join the same private room.
- Both players receive the same problem.
- The server controls the match start time and deadline.
- The first valid Accepted solution wins.
- Match results are persisted and finalized only once.
- Casual battles never modify competitive rating.
- XP rewards cannot be duplicated.

## 7. Phase 5 — Ranked Battles

### Tasks
- Implement ranked matchmaking.
- Introduce an initial competitive rating of 1000.
- Implement an Elo-style rating calculation.
- Record rating changes and match history.
- Handle matchmaking timeouts.
- Define disconnect, abandonment, and no-winner rules.
- Add ranked statistics and rating display.

### Completion criteria
- Players can enter and leave matchmaking.
- The system pairs eligible opponents.
- Both players receive the same ranked problem.
- Eligible results update ratings consistently.
- Each match can affect a player's rating no more than once.
- Casual and Ranked modes remain separate.

## 8. Phase 6 — Quality, Security, and Release

### Tasks
- Test authentication and authorization.
- Test database constraints and transaction handling.
- Test Python execution limits and failure cases.
- Test simultaneous submissions and duplicate requests.
- Test WebSocket reconnection.
- Test streak and XP edge cases.
- Improve mobile responsiveness and accessibility.
- Add centralized logging and useful error messages.
- Document environment configuration.
- Prepare deployment and production configuration.

### Completion criteria
- All essential automated tests pass.
- Critical backend operations enforce authorization.
- Hidden test cases and secrets remain protected.
- The application handles common failures predictably.
- The frontend, backend, database, and execution service work together.
- A new developer can follow the documented setup instructions.

## 9. Development Rules

- Complete one milestone before moving to the next.
- Keep changes small and commit working milestones to Git.
- Write tests for business rules and security-sensitive operations.
- Do not expose hidden tests or trusted evaluation results to the browser.
- Keep business logic inside Spring Boot services.
- Use PostgreSQL as the primary persistent database.
- Keep Python execution isolated from the main application.
- Avoid introducing technologies that do not solve an identified requirement.
- Update project documentation when implementation decisions change.

## 10. Initial Release Strategy

The implementation order prioritizes a functional practice engine first, followed by daily progression and casual battles.

Ranked matchmaking comes after the battle system has been tested with two users.

The first release should prioritize correctness, security, and a complete user experience over the total number of features.

Future additions must build on the working core rather than interrupting unfinished milestones.