> 🎮 **[Take the live Study Arcade tour](https://securitization-arcade.pulak261.chatgpt.site/?tour=1)** — the guided walkthrough starts automatically and introduces the platform through its current Securitization Fundamentals topic.

# Study Arcade

### Current live topic: Securitization Fundamentals

**From Loans to Bonds in 30 Core Days + 2 Advanced Bonus Levels**

Study Arcade is a topic-agnostic organizational learning platform that turns complex internal knowledge into structured, measurable, and reusable learning journeys. It combines connected lessons, concept maps, active recall, assessments, applied scenarios, trainer presentations, learner feedback, and visible mastery signals in one experience.

**Study Arcade is the platform. Securitization Fundamentals is its first complete topic—not the identity or limit of the product.** The Learning Library also demonstrates how shared foundations and role-specific paths such as ABS Suite Sales Enablement and Marketing Enablement can live in the same system.

Auto loans provide the practical case study for the current curriculum because they make abstract deal mechanics easier to follow. The course teaches broader securitization foundations that transfer to other asset classes; it is not positioned as an Auto ABS-only platform.

## The organizational problem

Employee training is often distributed across colleague-led explanations, slide decks, documents, spreadsheets, Confluence pages, town-hall presentations, and personal notes. The experience varies by trainer, the context behind a session is easily lost, and course completion alone does not show whether the employee can explain or apply the material.

Study Arcade creates one connected workflow:

- **Learners** see prerequisites, learn in context, practise retrieval, test understanding, apply concepts, give feedback, and revisit the original teaching sequence.
- **Trainers** receive a consistent scope for each session, clear outcomes, ready presentation material, and visibility into what the learner should be able to explain.
- **Organizations** gain a foundation for repeatable onboarding, governed knowledge sharing, targeted coaching, and responsible learning analytics.

> **Teach consistently. Learn visibly. Retain the context.**

## Platform model

Study Arcade separates the reusable learning system from the topic being taught:

1. **Study Arcade** — the platform and shared interaction model.
2. **Learning Library** — shared foundations and role-specific organizational learning paths.
3. **Topic Journey** — the syllabus, phases, concept map, lessons, practice, assessments, feedback, and presentations for one subject.

The current path is:

**Study Arcade → Learning Library → Securitization Fundamentals → 32-level journey**

Future topics can have different durations, sources, examples, learning maps, and mastery criteria while retaining the same familiar Study Arcade experience.

## What is live now

- A complete, selectable **32-level Securitization Fundamentals curriculum**
- **Days 1–30** as the core journey and **Days 31–32** as advanced bonus levels
- A full **Learning Map** combining phases, course index, prerequisites, and later applications
- Connected lesson sections with plain-English explanations, technical mechanics, examples, and applied labs or decision scenarios
- Five **flashcards** and five-question **knowledge checks** for every day
- An **80% quiz mastery target**, XP, persistent progress, and a green completion tick for mastered days
- A one-time **email completion receipt** when a learner first masters a day, summarizing quiz score, XP, and the next lesson
- An agentic **End-of-Day Learning Coach** that reads assessment and reflection evidence, retrieves approved context, chooses a next action, creates a challenge, and updates review memory
- A visible **Agent Activity** trail plus a human-reviewed trainer-handoff draft when approved material is insufficient
- **Present Day** mode for colleague-led training and later employee review
- An 11-step **Take a tour** walkthrough
- A visible **Learning Library** with illustrative future organizational paths
- An illustrative approved-source citation block for ABS Suite Sales Enablement
- Responsive desktop and mobile behavior

Progress, feedback, Coach Debriefs, and the review queue are currently saved on the learner’s device. Resetting a day removes that day’s lesson progress, cards, quiz state, completion tick, feedback, and Coach Debrief. Central learner accounts, secure cross-device records, and trainer dashboards are not yet implemented.

Completion emails use a server-side Resend integration, so the API key is never exposed in the browser or committed to GitHub. The quick-demo sender can deliver only to the email address associated with the Resend account; organization-wide delivery will require a verified company sending domain and authenticated learner accounts.

## Daily learning loop

Every day follows the same learning rhythm:

**Orient → Learn → Connect → Recall → Apply → Check → Reflect → Revisit**

A day reaches 100% mastery when the learner:

1. Completes every lesson section.
2. Masters all five flashcards.
3. Submits the quiz with at least 80% accuracy.

The green tick is a visible mastery reward. After reflection, the Learning Coach compares confidence with demonstrated understanding, chooses a grounded next action, creates a quick challenge, and remembers fragile concepts for later review. These signals guide learning and coaching—not standalone employee-performance scoring.

## Content governance and citations

Organizational topics could be grounded in approved sources such as secure Confluence pages, product documentation, town-hall presentations, playbooks, policies, and training decks. The product direction is to display source identity, freshness, and citations so learners and trainers can trace important claims back to governed material.

The current ABS Suite Sales Enablement citation block is **illustrative**. Live secure-source ingestion, permissions, and retrieval are roadmap capabilities rather than claims about the current release.

## Five-minute demo flow

1. Open the **Current Topic** selector to explain platform versus topic.
2. Start **Take a tour**, show the guided onboarding, then skip it.
3. Open the **Learning Map** to show all phases and prerequisite connections.
4. Enter a daily lesson and show the Builds on → Today → Unlocks thread.
5. Flip a flashcard and open the quiz to demonstrate active recall and assessment.
6. Point to progress, XP, and a green completion tick.
7. Complete **Give feedback** to show the Learning Coach retrieving context, choosing an action, updating review memory, and producing a personalized Coach Debrief.
8. Finish in **Present Day** mode to explain the trainer and post-training review experience.

## Learning-agent definition

> My agent helps **new employees and the colleagues who train them** complete **a governed journey from prerequisite discovery through lessons, practice, assessment, reflection, and targeted review** in **the Study Arcade web experience**, replacing **a fragmented workflow of presentations, documents, internal pages, spreadsheets, and personal notes that takes hours to assemble and makes understanding difficult to verify**. It performs **lesson guidance, concept explanation, review planning, flashcard practice, quiz assessment, and next-step recommendations** using **four governed capabilities: the approved course library, Learning Map, assessment engine, and learner-progress record**; it hands off to a human **when a question requires source-owner clarification, deal-specific judgment, current-market interpretation, or legal, accounting, rating, or investment advice**. It works when **a learner can complete a daily learning cycle in under 60 minutes and explain or apply the main concept with at least 80% assessment accuracy**.

The current implementation runs a bounded tool-using Coach workflow through a server-side Fireworks AI model when configured. It calls approved-context retrieval, learning-action selection, review-memory, and trainer-handoff tools in an explicit state sequence; provider calls retry once and fall back to deterministic approved guidance rather than blocking the learner or inventing facts. It does not generate deal-specific financial guidance.

## Architecture and technology stack

```mermaid
flowchart TB
    GitHub["GitHub<br/>source and curriculum versions"] --> Sites["OpenAI Sites<br/>build and hosting"]
    Sites --> Web["Study Arcade Web App<br/>Next.js · React · TypeScript"]

    Learner["Learner"] --> Web
    Trainer["Colleague-trainer"] --> Web
    Curriculum["Approved course library<br/>32-day curriculum JSON"] --> Web
    Web <--> State["Device-local learning state<br/>progress · feedback · Coach memory"]

    Web --> CoachAPI["Coach API route<br/>bounded server-side workflow"]
    CoachAPI --> Fireworks["Fireworks AI<br/>Kimi K2.6"]
    CoachAPI --> Retrieve["Tool 1 · Retrieve approved context"]
    CoachAPI --> Decide["Tool 2 · Select learning action"]
    CoachAPI --> Memory["Tool 3 · Update review queue"]
    CoachAPI --> Handoff["Tool 4 · Prepare trainer handoff"]
    Retrieve --> Curriculum
    Handoff -.->|human reviews; nothing sent automatically| Trainer
    CoachAPI --> Debrief["Coach Debrief<br/>summary · challenge · next action · activity trail"]
    Debrief --> Web

    Web --> EmailAPI["Completion-email API route"]
    EmailAPI -.->|optional when configured| Resend["Resend<br/>completion receipt"]

    Secrets["Protected Sites secrets<br/>Fireworks and Resend API keys"] --> CoachAPI
    Secrets --> EmailAPI
```

| Layer | Technology | Role |
|---|---|---|
| Experience | Next.js, React, TypeScript, custom responsive CSS | Lessons, maps, flashcards, quizzes, presentations, feedback, and Coach Debriefs |
| Hosting | OpenAI Sites | Builds and serves the private web experience and server routes |
| Approved content | Version-controlled JSON | Stores the 32-day curriculum, definitions, quizzes, prerequisites, and examples |
| Agent model | Fireworks AI using Kimi K2.6 | Interprets learning evidence, selects the next action, and composes the personalized debrief |
| Agent control flow | Typed server-side workflow | Runs retrieval → decision → memory or handoff → debrief, with one retry and a safe fallback |
| Learning state | Browser `localStorage` | Remembers progress, feedback, completed Coach Debriefs, and the review queue on the learner’s device |
| Email | Resend, optional | Sends a one-time completion receipt when configured; it is not part of the Coach’s reasoning |
| Source control | GitHub | Stores the application, documentation, and curriculum history |

The current architecture deliberately does not use a vector database, Mem0, Lyzr, or LangGraph. The curriculum is small and structured enough for governed direct retrieval, while the bounded TypeScript workflow makes every decision, write action, retry, and human handoff explicit.

## Agent decision framework

| Field | Decision |
|---|---|
| **Agent goal** | Guide an employee through a governed learning journey and help them accurately explain and apply each concept. |
| **Where do people use it?** | Learners and trainers use it in the Study Arcade web app, with presentation mode supporting colleague-led sessions and later review. |
| **What steps does it take, in order?** | 1. Establish the learner’s current level and prerequisite context. 2. Teach and practise the approved material. 3. Evaluate understanding, explain gaps, collect reflection, and recommend progression or review. |
| **What can it actually do?** | **Look up:** approved lessons, definitions, prerequisites, citations, and learner progress. **Change:** record progress, score assessments, update a review queue, and adjust recommendations without changing the approved syllabus. |
| **What does it need to remember?** | It needs the current lesson and response context during a session; across sessions it should remember completed sections, attempts, difficult concepts, flashcard status, feedback, and course position. |
| **What should it never do?** | It must never invent financial facts, silently alter approved content, expose another learner’s information, bypass source permissions, or frame educational material as deal-specific professional advice. |
| **Human-in-the-loop** | The learner controls progression and reviews explanations. A qualified colleague, source owner, or subject-matter expert handles uncertain content and questions requiring professional judgment. |
| **What happens when something breaks?** | Retry an approved-content lookup once, then fall back to the static lesson and state what is unavailable. If the governed sources cannot support an answer, stop and request clarification or human review. |
| **How do you know it worked?** | The learner completes the daily cycle in under 60 minutes and accurately explains or applies the main concept with at least 80% assessment accuracy. |

## Responsible measurement

Learning analytics should support coaching, not surveillance. Quiz accuracy, attempts, progress, feedback, and XP can reveal where help may be useful, but they must be interpreted with context and never used alone for performance evaluation.

Course content should remain approved, cited where appropriate, and version-controlled. Deal-specific, legal, accounting, rating, investment, and current-market questions belong with qualified humans.

## Roadmap

- Expand the Learning Library into a complete multi-topic home and authoring experience
- Add secure approved-source ingestion, permission-aware retrieval, citations, and freshness indicators
- Add learner accounts and secure cross-device progress
- Create trainer and organization dashboards with cohort-level knowledge-gap insights
- Turn applied scenarios into interactive calculators, decision labs, and simulations
- Move Learning Coach memory from the device to authenticated, permission-aware learner records
- Add reusable topic schemas, content review workflows, and publishing approvals
- Expand accessibility, content-quality, and learning-effectiveness evaluation

## Technology

- Next.js, React, and TypeScript
- Responsive custom CSS
- Version-controlled curriculum data
- Fireworks AI tool calling for the bounded Learning Coach workflow
- Browser storage for device-local progress, feedback, Coach Debriefs, and review memory
- GitHub for source control
- OpenAI Sites for the hosted experience

The current release intentionally avoids unnecessary infrastructure. The 32-day curriculum is small and structured, so the Coach retrieves from the approved in-app course payload rather than adding a vector database. Long-term server memory and retrieval infrastructure should be added only when authenticated learners, secure company sources, and multi-topic scale make them materially useful.

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal. To create a production build:

```bash
npm run build
```

## Repository structure

- `app/page.tsx` — platform UI, interactions, Days 1–4 content, mastery, feedback, tour, presentation, and navigation
- `app/data/` — structured curriculum content for Days 5–32
- `app/globals.css` — responsive visual system and interaction styling
- `app/layout.tsx` — page metadata and social-sharing configuration
- `public/og.png` — Study Arcade social preview
- `.openai/hosting.json` — hosted Sites project configuration

## Explore the project

- **Live experience:** [Study Arcade — Securitization Fundamentals](https://securitization-arcade.pulak261.chatgpt.site)
- **Guided tour:** [Start Take a tour automatically](https://securitization-arcade.pulak261.chatgpt.site/?tour=1)
- **Source:** [securitization-arcade-employee-training](https://github.com/MittalP2/securitization-arcade-employee-training)

---

**Study Arcade** is the platform. **Securitization Fundamentals** is its first complete topic. **Auto loans** are the practical case study that makes the topic concrete.
