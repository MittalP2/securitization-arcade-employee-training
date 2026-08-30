> 🎮 **[Take the live Study Arcade tour](https://securitization-arcade.pulak261.chatgpt.site/?tour=1)** — site access is currently owner-only.

# Study Arcade

Study Arcade is an interactive employee-learning platform for structured onboarding and colleague-led training. This repository demonstrates its first topic: **Securitization Fundamentals — From Loans to Bonds in 30 Core Days + 2 Advanced Bonus Levels**.

Auto loans are used as a practical example, but the course teaches securitization concepts that apply across asset classes. Study Arcade is the platform; Securitization Fundamentals is one topic within it.

## What is working

- A complete 32-level syllabus with a Learning Map that shows phases, prerequisites, the current day, and mastered days
- Daily lessons, five flashcards, five-question quizzes, applied exercises, and answer explanations
- An 80% mastery target, XP, saved progress, and green completion ticks
- **Present Day** mode for trainer-led sessions and later learner review
- Day feedback and a Fireworks-powered **Learning Coach Debrief**
- A learner-focused Coach Debrief with quiz stats, missed-concept reteaching, one practical example, and on-demand alternative examples
- An 11-step guided product tour

Progress, feedback, quiz results, and Coach Debriefs are stored in the learner's browser. Fireworks does not retain learner history, and there is currently no central employee dashboard or cross-device learner account.

## Daily learning loop

**Orient → Learn → Connect → Recall → Apply → Check → Reflect → Revisit**

A day reaches 100% when the learner completes every lesson section, masters all five flashcards, and scores at least 80% on the quiz.

## Learning Coach

The Coach helps a learner turn a completed day's quiz and reflection into a grounded next step. It uses four bounded tools:

1. Retrieve approved lesson context.
2. Choose one learning action.
3. Prepare a device-local review queue.
4. Draft a trainer handoff for human review when the approved material is insufficient.

The workflow runs server-side using **Fireworks AI with Kimi K2.6**. It maps missed questions to approved lesson concepts, explains the correct answer, creates a practical example, and can generate a different example when the learner asks. A failed model stage retries once; if it still fails, the learner is told that results could not be produced and the incident is recorded in the app-owner logs.

## Five-minute demo

1. Open **Current Topic** to explain that Study Arcade is the platform and Securitization Fundamentals is the current topic.
2. Start **Take a tour** and show the guided onboarding.
3. Open the **Learning Map** to show phases and prerequisite connections.
4. Show a lesson's **Builds on → Today → Unlocks** learning thread.
5. Flip a flashcard and answer a quiz question.
6. Point out XP, progress, and the green mastery tick.
7. Open **Give feedback** and generate the Learning Coach Debrief.
8. Finish with **Present Day** mode.

For a live Coach demonstration, prepare Day 1 at 100% without a saved debrief before presenting. Do not reset it immediately before the demo, because reset removes that day's progress, feedback, and debrief from the browser.

## Architecture and technology

🗺️ **[View the Mermaid architecture diagram](docs/architecture.md)**

**Stack:** Next.js, React, TypeScript, custom CSS, version-controlled JSON curriculum, Fireworks AI, browser `localStorage`, GitHub, and OpenAI Sites.

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` to configure Fireworks. The app uses a safe fallback Coach when Fireworks is not configured.

## Links

- [Live Study Arcade](https://securitization-arcade.pulak261.chatgpt.site)
- [Guided tour](https://securitization-arcade.pulak261.chatgpt.site/?tour=1)
- [Mermaid architecture](docs/architecture.md)
