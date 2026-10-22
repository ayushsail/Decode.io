# Decode.io — System Architecture

## 1. Architecture Overview

Decode.io will use a client-server architecture with a React frontend, Java Spring Boot backend, PostgreSQL database, and an isolated Python code execution service.

The backend will be the source of truth for authentication, problem evaluation, battle results, XP, competitive ratings, and streaks.

## 2. Technology Stack

### Frontend
- React
- TypeScript
- Vite
- HTML and CSS
- Monaco Editor for Python code editing

Responsibilities:
- Render the user interface.
- Display the problem library and coding workspace.
- Submit user actions to the backend.
- Display evaluation results, progress, and battle updates.
- Handle responsive layouts and client-side form validation.

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Security
- Spring Data JPA
- Hibernate
- WebSocket support

Responsibilities:
- Implement application business logic.
- Expose REST APIs.
- Authenticate users and authorize requests.
- Manage problems, submissions, battles, daily challenges, and rewards.
- Validate match results and update ratings.
- Coordinate isolated Python code execution.
- Persist application data through the database layer.

### Database
- PostgreSQL
- Spring Data JPA and Hibernate

Responsibilities:
- Store users and profile information.
- Store coding problems and metadata.
- Store submission records and evaluation results.
- Store battle rooms, match results, and participant records.
- Store daily completions, streak-related records, XP transactions, and achievements.

PostgreSQL will be the primary application database. A second database will not be introduced without a specific requirement.

### Python Execution Service

Responsibilities:
- Receive submitted Python source code and permitted test inputs.
- Execute code in an isolated environment.
- Enforce execution time and memory limits.
- Evaluate results against hidden test cases.
- Return a structured verdict to the Java backend.

Untrusted submissions must never be executed directly inside the Spring Boot application process.

The execution provider or self-hosted execution infrastructure will be selected during implementation.

## 3. High-Level Architecture

Browser
    |
    v
React + TypeScript Frontend
    |
    | HTTPS / REST API
    | WebSocket for live battle events
    v
Java Spring Boot Backend
    |
    +---- Spring Security
    |
    +---- Application Services
    |       |
    |       +---- Practice and Problems
    |       +---- Submissions
    |       +---- Battles and Matchmaking
    |       +---- Daily Challenges and Streaks
    |       +---- XP, Ratings and Achievements
    |
    +---- Spring Data JPA / Hibernate
    |       |
    |       v
    |    PostgreSQL
    |
    +---- Code Execution Adapter
            |
            v
       Isolated Python Execution Service

## 4. Backend Module Responsibilities

### Authentication Module
- Registration and login.
- User identity and authorization.
- Protected endpoints and account ownership.

### Problem Module
- Retrieve published problems.
- Filter by difficulty and topic.
- Retrieve public problem descriptions, examples, constraints, and starter code.
- Support authorized problem administration.

### Submission Module
- Accept user submissions.
- Validate the problem and requesting user.
- Request execution from the Python execution service.
- Record evaluation results.
- Update solved-problem status and eligible rewards.

### Battle Module
- Create private rooms and invitation codes.
- Validate room membership and readiness.
- Manage battle lifecycle and timers.
- Synchronize match events.
- Verify winners and record results.
- Maintain separate Casual and Ranked rules.

### Daily Challenge Module
- Select the challenge assigned to a date.
- Record verified daily completions.
- Prevent duplicate completion rewards.
- Calculate current and longest streaks.

### Progression Module
- Calculate XP awards.
- Track levels and achievements.
- Maintain competitive ratings and rating history.
- Expose user progress statistics.

## 5. Communication Rules

### REST API
Use REST endpoints for normal application operations such as:
- Authentication.
- Retrieving problems.
- Creating submissions.
- Reading submission history.
- Creating or joining a battle room.
- Retrieving daily challenges and profile progress.

Use a versioned API prefix such as `/api/v1`.

### WebSocket
Use WebSocket communication for real-time battle updates, including:
- Player joined or disconnected.
- Player readiness.
- Match countdown and start.
- Submission status updates.
- Match completion and result notifications.

WebSocket messages communicate events; they do not replace backend validation.

## 6. Security Boundaries

- Validate and authorize all important operations on the backend.
- Keep hidden test cases inaccessible to ordinary users.
- Never trust a frontend-provided verdict or winner.
- Do not allow clients to choose their own XP or rating changes.
- Protect user-owned records from unauthorized modification.
- Restrict Python execution with isolation and resource limits.
- Keep database credentials and other secrets outside source control.
- Verify that room participants are authorized before sending private room events.

## 7. Initial Deployment Model

During development, the application may run as separate local services:

- React frontend development server.
- Spring Boot backend.
- PostgreSQL database.
- Python execution service or approved external execution provider.

The services can be deployed independently when required.

The architecture should remain simple enough for one developer to understand and maintain. Microservices, distributed queues, and additional infrastructure will not be added unless they solve a demonstrated problem.

## 8. Architecture Principles

- Separate user interface, business logic, persistence, and code execution.
- Keep business rules inside backend services.
- Use PostgreSQL as the primary source of persistent application data.
- Prefer small, testable modules over a single large class.
- Centralize rules for XP, streaks, rating changes, and match results.
- Record critical state transitions and prevent duplicate processing.
- Design for safe failure, reconnection, and reliable result persistence.

## 9. Initial Architecture Decision

The first version will use a modular Spring Boot backend rather than multiple independently deployed business microservices.

The Python execution environment will remain a separate security boundary because running untrusted code poses different risks from ordinary application logic.

Detailed database tables, API contracts, authentication mechanisms, and execution-provider configuration will be documented separately.