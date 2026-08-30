> 🎮 **[Take the live Study Arcade tour](https://securitization-arcade.pulak261.chatgpt.site/?tour=1)** — site access is currently owner-only.

# Study Arcade

Study Arcade is an interactive employee-learning platform for structured onboarding and colleague-led training. This repository demonstrates its first topic: **Securitization Fundamentals — From Loans to Bonds in 30 Core Days + 2 Advanced Bonus Levels**.

Auto loans are used as a practical example, but the course teaches securitization concepts that apply across asset classes. Study Arcade is the platform; Securitization Fundamentals is one topic within it.

## What is working

- A complete 32-level syllabus with a Learning Map that shows phases, prerequisites, the current day, and mastered days
- Daily lessons, five flashcards, five-question quizzes, applied exercises, and answer explanations
- Slide-based lesson completion, optional practice XP, saved progress, and green completion ticks
- **Present Day** mode for trainer-led sessions and later learner review
- Independent day feedback and a Fireworks-powered **Learning Coach Debrief**
- A learner-focused Coach Debrief with quiz stats, missed-concept reteaching, one practical example, and on-demand alternative examples
- An 11-step guided product tour

Progress, feedback, quiz results, and Coach Debriefs are stored in the learner's browser. Fireworks does not retain learner history, and there is currently no central employee dashboard or cross-device learner account.

## Daily learning loop

**Orient → Learn → Connect → Recall → Apply → Check → Reflect → Revisit**

A day reaches 100% when the learner completes every lesson slide. Flashcards, quiz attempts, feedback, and Coach Debrief are independent reinforcement activities; the quiz has no passing-score requirement.

## Learning Coach

After any completed quiz attempt, the Coach turns submitted answers into targeted reteaching. Feedback is a separate action and is never required to generate the debrief.

1. Read the submitted quiz evidence.
2. Map missed questions to approved lesson concepts.
3. Explain the correct answer with a practical example.
4. Generate a different example when the learner asks.

The workflow runs server-side using **Fireworks AI with Kimi K2.6**. It maps missed questions to approved lesson concepts, explains the correct answer, creates a practical example, and can generate a different example when the learner asks. A failed model stage retries once; if it still fails, the learner is told that results could not be produced and the incident is recorded in the app-owner logs.

## Five-minute demo

1. Open **Current Topic** to explain that Study Arcade is the platform and Securitization Fundamentals is the current topic.
2. Start **Take a tour** and show the guided onboarding.
3. Open the **Learning Map** to show phases and prerequisite connections.
4. Show a lesson's **Builds on → Today → Unlocks** learning thread.
5. Flip a flashcard and answer a quiz question.
6. Point out XP, slide-based progress, and the green completion tick.
7. Show **Give feedback** and **Coach Debrief** as separate actions.
8. Finish the lesson after all slides are complete, then open **Present Day** mode.

For a live Coach demonstration, submit the Day 1 quiz without saving a debrief before presenting. Do not reset immediately before the demo, because reset removes that day's progress, feedback, and debrief from the browser.

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
