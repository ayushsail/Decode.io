# Decode.io — MVP Scope

## 1. Objective

Build the first usable version of Decode.io around three pillars: coding practice, competitive battles, and daily progress.

The application must be functional end to end, with a React frontend, Java Spring Boot backend, and PostgreSQL database.

## 2. Must-Have Features

### A. Python Problem Library

- Display coding problems with titles, descriptions, difficulty levels, and topic tags.
- Support Easy, Medium, and Hard difficulty levels.
- Provide problem details, examples, constraints, and starter code.
- Allow users to open and solve individual problems.
- Store problem information in PostgreSQL.

### B. Python Practice Engine

- Provide a code editor for Python 3.
- Allow users to run sample test cases.
- Allow users to submit solutions for hidden-test evaluation.
- Display verdicts such as Accepted, Wrong Answer, and Runtime Error.
- Record submissions and solved-problem status.
- Execute submitted code using a separate, isolated execution service.

### C. Private 1v1 Coding Battles

- Create a private battle room.
- Generate a unique invitation code.
- Allow a second player to join using the code.
- Display both players in a waiting lobby.
- Start both players on the same problem with a synchronized countdown.
- Use a shared match timer.
- Declare a winner using verified submission results.
- Display match results and provide a rematch option.
- Maintain separate Casual and Ranked modes.

**Development priority:** Implement and validate Casual mode first. Add Ranked matchmaking and rating updates after the core battle system works reliably.

### D. Daily Challenges and Streaks

- Publish one shared Daily Challenge per date.
- Allow users to submit solutions through the practice engine.
- Record completion only after an Accepted submission.
- Track current and longest streaks.
- Use Asia/Kolkata as the initial daily reset timezone.
- Award daily XP only once per user per date.

### E. Basic Progression

- User registration and login.
- Basic user profiles.
- XP and level tracking.
- A small initial set of achievements.
- Submission and battle history.
- Persistent progress stored in PostgreSQL.

## 3. Initial Content

- Start with approximately 20–30 curated Python problems.
- Include examples and tested hidden test cases.
- Cover fundamental topics such as strings, arrays, loops, functions, searching, and sorting.
- Begin with a small set of reliable problems rather than a large, unverified question bank.

## 4. Non-Functional Requirements

- Keep hidden test cases inaccessible to ordinary users.
- Execute untrusted Python code in a restricted environment.
- Validate all important operations on the backend.
- Prevent duplicate XP rewards and duplicate rating updates.
- Use server-controlled match timing and result calculation.
- Protect user data and enforce authorization.
- Provide responsive layouts for desktop and mobile.
- Include automated tests for important backend logic.

## 5. Features Outside the Initial Release

- Cooperative coding and shared editors.
- Team battles and tournaments.
- Public matchmaking until the basic ranked system is ready.
- Additional programming languages.
- AI-generated questions and AI tutoring.
- Voice and video communication.
- Advanced cosmetics and virtual currency.
- Native mobile applications.

These features may be considered after the initial release is stable.

## 6. Definition of Done

The MVP is considered ready when:

1. A user can browse Python problems and submit a solution for evaluation.
2. The system records verified results and user progress.
3. Two users can join a private room and complete a 1v1 Casual battle.
4. Match outcomes are determined by the backend.
5. Ranked matches can eventually update competitive ratings without affecting Casual mode.
6. Users can complete the Daily Challenge and maintain a streak.
7. XP rewards cannot be claimed repeatedly by manipulating client requests.
8. Data remains available after restarting the application.
9. Essential automated tests pass.
10. The application can be run locally using documented setup instructions.