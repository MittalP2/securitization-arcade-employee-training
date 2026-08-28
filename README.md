> 🎮 **[Take the live Study Arcade tour](https://securitization-arcade.pulak261.chatgpt.site/?tour=1)** — the guided walkthrough starts automatically and introduces the current **Securitization Fundamentals** topic.

# Study Arcade

### Current topic: Securitization Fundamentals

**From Loans to Bonds in 30 Days**

Study Arcade is a topic-agnostic employee-learning platform for turning complex organizational knowledge into structured, measurable, and reusable learning journeys. Learners select a topic from the Study Arcade library, then enter a connected experience of lessons, visual maps, presentation mode, flashcards, quizzes, examples, and progress signals.

**Securitization Fundamentals is the first topic available in the platform—not the identity or limit of the web app.** The current demo opens directly into this topic; a multi-topic home and topic selector are planned as the next platform layer.

Within the Securitization Fundamentals topic, auto loans provide a consistent practical case study because they make abstract deal mechanics easier to follow. The curriculum teaches broader securitization foundations that transfer to other asset classes; it is not an Auto ABS-only course.

## Platform model

Study Arcade separates the reusable learning experience from the subject being taught:

1. **Study Arcade** — the learning platform and shared interaction model.
2. **Learning Library** — where employees select shared foundations or role-specific organizational learning paths.
3. **Topic Journey** — the lessons, phases, map, practice, assessments, and presentations for that subject.

For this demo, the path is:

**Study Arcade → Learning Library → Securitization Fundamentals → 32-day learning journey**

Future topics can use a different duration, syllabus, examples, and mastery criteria while retaining the same familiar Study Arcade experience.

## Why Study Arcade exists

New employees are often trained through a mixture of colleague-led explanations, slide decks, documents, spreadsheets, and personal notes. The quality and depth of that experience can vary, while the context behind a training session is easily lost afterward.

Study Arcade turns that fragmented workflow into a guided journey:

- **Learners** can see what a concept depends on, learn it in context, practise it, test their understanding, and revisit the original training presentation.
- **Trainers** get a consistent scope for each session, clear learning outcomes, ready-to-use teaching material, and visibility into what the learner should be able to explain.
- **Organizations** gain a foundation for repeatable onboarding, knowledge-gap identification, targeted coaching, and responsible learning analytics.

> **Teach consistently. Learn visibly. Retain the context.**

## The experience

Study Arcade uses a three-panel workspace inspired by the familiarity of a study notebook:

1. **Journey navigation** — move between days, see the current level, and open the complete course map.
2. **Daily lesson** — understand the objective, prerequisites, core ideas, worked examples, and what the lesson unlocks next.
3. **Practice Studio** — reinforce the lesson through concept connections, flashcards, quizzes, progress, and XP.

Two guided modes support different moments:

- **Take a tour** introduces the product and demonstrates its main capabilities.
- **Present Day** gives trainers a focused teaching view and leaves the same presentation available for employees to revisit after the session.

## Learning design

The experience follows a simple rhythm for every day:

**Orient → Learn → Connect → Recall → Apply → Check → Revisit**

- The **Learning Map** acts as both the course index and the learner's mental model, showing phases, prerequisites, and connections between earlier and later concepts.
- **Flashcards** build active recall instead of passive recognition.
- **Quizzes** provide immediate explanations and use an 80% mastery target.
- **XP and progress** make momentum visible, but are learning signals—not standalone employee-performance scores.
- **Presentation mode** keeps colleague-led training and self-paced review connected to the same source material.

## Current topic structure

The approved Securitization Fundamentals syllabus remains fixed at 32 days:

- **Days 1–30:** the core journey, ending with a final assessment and graduation milestone.
- **Days 31–32:** advanced bonus levels covering funding, pool management, and encumbrance controls.

The journey moves from the basic loan-to-bond flow through SPVs, tranches, waterfalls, credit enhancement, legal documents, collateral analysis, investor communication, modelling, and applied structuring. Each day identifies the prior knowledge it builds on and the later concepts it unlocks.

## What the current demo includes

The first demo implements:

- Interactive learning experiences for **Days 1–4**
- A visible **Learning Library** that separates the Study Arcade platform from shared foundations and role-specific paths
- An illustrative citation block for **ABS Suite: Sales Enablement**, showing how approved internal sources and freshness metadata could appear
- The complete **32-day Learning Map** with phases and prerequisite connections
- Daily lessons, contextual examples, flashcards, quizzes, feedback, and an 80% mastery target
- An intelligent **Day Debrief** that captures clarity, confidence, improvement requests, and optional comments, then recommends a useful next action
- **Take a tour** product walkthrough
- **Present Day** trainer mode
- XP, lesson progress, quiz results, and device-local progress saving
- A responsive experience for desktop and mobile

Progress in this demo is stored in the learner's browser. Central learner accounts, trainer dashboards, and organization-wide reporting are part of the product roadmap and are not yet implemented.

## Product vision

Study Arcade is designed as a reusable multi-topic platform rather than a securitization website. An organization should be able to publish additional topics while keeping the same learning system: a governed syllabus, prerequisite map, daily missions, trainer presentations, retrieval practice, applied simulations, assessments, and progress insights.

The intended outcome is not simply course completion. It is evidence that an employee can explain a concept, connect it to the wider system, and apply it in a realistic scenario.

## Learning-agent definition

> My agent helps **new employees and the colleagues who train them** complete **a connected journey from prerequisite discovery through lessons, practice, assessment, and targeted review** in **the Study Arcade web experience**, replacing **a fragmented workflow of presentations, documents, spreadsheets, videos, and personal notes that takes hours to assemble and makes understanding difficult to verify**. It performs **lesson guidance, concept explanation, review planning, flashcard practice, quiz assessment, and next-step recommendations** using **four governed capabilities: the approved course library, Learning Map, assessment engine, and learner-progress record**; it hands off to a human **when a question requires deal-specific judgment, current market interpretation, or legal, accounting, rating, or investment advice**. It works when **a learner can complete a daily mission and accurately explain or apply its main concept in under 20 minutes with at least an 80% assessment success rate**.

This describes the planned intelligent learning layer. The current demo uses curated content and rule-based interactions; it does not yet present generated financial guidance as an implemented capability.

## Agent decision framework

| Field | Decision |
|---|---|
| **Agent goal** | Guide an employee through a governed learning journey and help them accurately explain and apply each concept. |
| **Where do people use it?** | Learners and trainers use it in the Study Arcade web app on desktop or mobile, with presentation mode for colleague-led sessions. |
| **What steps does it take, in order?** | 1. Establish the learner's current lesson and prerequisite context. 2. Teach the approved material and provide relevant practice. 3. Evaluate the response, explain gaps, and recommend progression or review. |
| **What can it actually do?** | **Look up:** approved lessons, glossary definitions, prerequisites, and learning progress. **Change:** record progress, score assessments, create a review queue, and adjust recommendations—without changing the approved syllabus. |
| **What does it need to remember?** | During a session it needs the current lesson, question, and response context; across sessions it should remember completed lessons, attempts, difficult concepts, flashcard status, and course position. |
| **What should it never do?** | It must never invent financial facts, silently alter the syllabus, expose another learner's information, or frame educational material as deal-specific professional advice. |
| **Human-in-the-loop** | The learner controls progression and reviews explanations before completing a lesson. A qualified colleague or subject-matter expert handles uncertain content and questions requiring professional judgment. |
| **What happens when something breaks?** | Retry a failed approved-content lookup once, then fall back to the static lesson and clearly state what is unavailable. If the source material cannot answer reliably, stop and request clarification or human review. |
| **How do you know it worked?** | The learner completes a daily mission and explains or applies its main concept in under 20 minutes with at least 80% assessment accuracy. |

## Responsible measurement

Learning analytics should support coaching, not surveillance. Quiz accuracy, attempts, progress, and XP can indicate where an employee may need help, but they should be interpreted with context and never used alone for performance evaluation.

Course content should remain approved and version-controlled. Deal-specific, legal, accounting, rating, investment, and current-market questions belong with qualified humans.

## Roadmap

- Build the interactive experience for Days 5–32
- Expand the Learning Library into a full Study Arcade home with shared foundations and ABS Suite role paths
- Define a reusable topic schema so each subject can have its own duration, phases, outcomes, and mastery criteria
- Add applied simulations and scenario-based decisions
- Add learner accounts and secure cross-device progress
- Create trainer and organization dashboards with cohort-level knowledge-gap insights
- Add a course-authoring workflow for additional organizational topics
- Introduce an AI learning coach grounded only in approved course material
- Add accessibility, content-quality, and learning-effectiveness evaluation

## Technology

- Next.js, React, and TypeScript
- Responsive custom CSS
- Browser storage for demo progress
- GitHub for source control and curriculum versioning
- OpenAI Sites for the current hosted demo

The first release intentionally avoids unnecessary infrastructure. Vector search, long-term agent memory, and model orchestration should be introduced only when the approved content library, cross-session personalization, or multi-course scale makes them materially useful.

## Run locally

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal.

To create a production build:

```bash
npm run build
```

## Explore the project

- **Live experience:** [Study Arcade — Securitization Fundamentals](https://securitization-arcade.pulak261.chatgpt.site)
- **Source:** [securitization-arcade-employee-training](https://github.com/MittalP2/securitization-arcade-employee-training)

---

**Study Arcade** is the platform. **Securitization Fundamentals** is its first selectable topic. **Auto loans** are the case study that makes that topic concrete.
