# Study Arcade architecture

This Mermaid diagram shows the current demo architecture, including the boundary between the Fireworks-powered Coach workflow and learning history stored locally in the learner's browser.

```mermaid
flowchart TB
    GitHub["GitHub<br/>source and curriculum versions"] --> Sites["OpenAI Sites<br/>build and hosting"]
    Sites --> Web["Study Arcade Web App<br/>Next.js · React · TypeScript"]

    Learner["Learner"] --> Web
    Trainer["Colleague-trainer"] --> Web
    Curriculum["Approved course library<br/>32-level curriculum JSON"] --> Web
    State["Browser localStorage<br/>slide progress · quiz attempts · feedback · debrief history"] -->|loads local history| Web

    Web --> CoachAPI["Coach API route<br/>bounded server-side workflow"]
    CoachAPI --> Fireworks["Fireworks AI<br/>Kimi K2.6"]
    CoachAPI --> Retrieve["Tool 1 · Retrieve approved context"]
    CoachAPI --> Map["Tool 2 · Map missed questions"]
    CoachAPI --> Explain["Tool 3 · Explain the concept"]
    CoachAPI --> Example["Tool 4 · Create a practical example"]
    Retrieve --> Curriculum
    CoachAPI --> Evidence["Deterministic evidence mapping<br/>submitted answers · quiz gaps"]
    Evidence --> Debrief["Learner-facing Coach Debrief<br/>quiz stats · concept refresh · practical example"]
    Debrief --> Web
    Web -->|saves returned debrief| State

    Web --> ExampleAPI["Another-example API"]
    ExampleAPI --> Fireworks
    ExampleAPI --> Web

    Secrets["Protected Sites secret<br/>Fireworks API key"] --> CoachAPI
```

The Coach receives recent review context only when the browser submits it with a debrief request. Fireworks does not persist learner history, and the current demo has no central learner database or trainer dashboard.
