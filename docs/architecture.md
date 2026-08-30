# Study Arcade architecture

This Mermaid diagram shows the current demo architecture, including the boundary between the Fireworks-powered Coach workflow and learning history stored locally in the learner's browser.

```mermaid
flowchart TB
    GitHub["GitHub<br/>source and curriculum versions"] --> Sites["OpenAI Sites<br/>build and hosting"]
    Sites --> Web["Study Arcade Web App<br/>Next.js · React · TypeScript"]

    Learner["Learner"] --> Web
    Trainer["Colleague-trainer"] --> Web
    Curriculum["Approved course library<br/>32-level curriculum JSON"] --> Web
    State["Browser localStorage<br/>progress · feedback · debrief history · review queues"] -->|loads local history| Web

    Web --> CoachAPI["Coach API route<br/>bounded server-side workflow"]
    CoachAPI --> Fireworks["Fireworks AI<br/>Kimi K2.6"]
    CoachAPI --> Retrieve["Tool 1 · Retrieve approved context"]
    CoachAPI --> Decide["Tool 2 · Select learning action"]
    CoachAPI --> Review["Tool 3 · Prepare review queue"]
    CoachAPI --> Handoff["Tool 4 · Prepare trainer handoff"]
    Retrieve --> Curriculum
    Handoff -.->|human reviews; nothing sent automatically| Trainer
    CoachAPI --> Debrief["Learner-facing Coach Debrief<br/>strengths · concepts to revisit · challenge · next action"]
    Debrief --> Web
    Web -->|saves returned debrief| State

    Web --> EvalAPI["Coach Eval API<br/>5 fixed scenarios · 15 checks"]
    EvalAPI --> CoachAPI
    EvalAPI --> Score["Deterministic scoring<br/>pass rate above 85% = acceptable"]
    Score --> Web

    Secrets["Protected Sites secret<br/>Fireworks API key"] --> CoachAPI
```

The Coach receives recent review context only when the browser submits it with a debrief request. Fireworks does not persist learner history, and the current demo has no central learner database or trainer dashboard.
