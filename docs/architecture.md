# Study Arcade architecture

This Mermaid diagram shows the current demo architecture, including the boundary between the Fireworks-powered Coach workflow and learning history stored locally in the learner's browser.

```mermaid
flowchart TB
    GitHub["GitHub<br/>source and curriculum versions"] --> Sites["OpenAI Sites<br/>build and hosting"]
    Sites --> Web["Study Arcade Web App<br/>Next.js · React · TypeScript"]

    Learner["Learner"] --> Web
    Trainer["Colleague-trainer"] --> Web
    Curriculum["Approved course library<br/>32-level curriculum JSON"] --> Web
    State["Browser localStorage<br/>slide progress · quiz attempts · debrief history"] -->|loads learner history| Web
    CurriculumFeedback["Device-local curriculum feedback<br/>clarity · usefulness · improvement ideas<br/>not yet centrally delivered"] <-->|separate curriculum-improvement loop| Web

    Web -->|submitted quiz evidence only| CoachAPI["Coach API route<br/>bounded server-side workflow"]
    CoachAPI <-->|model calls + bounded tool calls| Fireworks["Fireworks AI<br/>Kimi K2.6"]
    CoachAPI --> Evidence["Deterministic evidence mapping<br/>submitted answers · quiz gaps"]
    Evidence --> Retrieve["Retrieve approved course context"]
    Retrieve --> Curriculum
    Retrieve --> Decide["Choose a learning action"]
    Decide --> Review["Prepare a local review queue<br/>or trainer handoff draft"]
    Review --> Compose["Compose grounded reteaching<br/>and one practical example"]
    Compose --> Debrief["Learner-facing Coach Debrief<br/>quiz stats · concept refresh · practical example"]
    Debrief --> Web
    Web -->|saves returned debrief| State

    Web --> ExampleAPI["Another-example API"]
    ExampleAPI --> Fireworks
    ExampleAPI --> Web

    Secrets["Protected Sites secret<br/>Fireworks API key"] --> CoachAPI
```

The Coach receives recent review context only when the browser submits it with a debrief request. Fireworks does not persist learner history, and the current demo has no central learner database or trainer dashboard.
