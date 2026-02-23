<!--
  Sync Impact Report
  ==================
  Version change: 0.0.0 → 1.0.0 (initial ratification)
  Added principles:
    - I. Intention over Execution
    - II. Empirisme Radical
    - III. Orchestration Systémique
    - IV. Excellence Produit
    - V. Qualité Intégrée
  Added sections:
    - Artefacts & Standards
    - Development Workflow
    - Governance
  Templates status:
    - .specify/templates/plan-template.md — ✅ aligned (Constitution Check section present)
    - .specify/templates/spec-template.md — ✅ aligned (success criteria, user stories, requirements)
    - .specify/templates/tasks-template.md — ✅ aligned (phased approach, checkpoints, parallel opportunities)
  Follow-up TODOs: none
-->

# AIAD Constitution

## Core Principles

### I. Intention over Execution

The value of a developer lies in the ability to express precise intent, not in writing code manually. Every feature MUST begin with a clear specification of the problem and expected outcomes before any implementation starts.

- Specifications MUST define the "why" and "what" before the "how"
- Outcome Criteria MUST be defined before construction begins
- A well-written SPEC (30 min–1 h) MUST save more time than it costs in agent correction cycles
- Ambiguity in intent is the primary source of wasted effort; precision is non-negotiable

**Rationale**: AI agents generate code effectively when given clear context. Without precise intent, agents produce generic output that requires extensive rework, negating their productivity benefit.

### II. Empirisme Radical

Decisions MUST be validated by observation, not by opinion or upfront planning. The cycle "Hypothèse → Essayer → Observer → Adapter" governs all work.

- Hypotheses MUST be stated explicitly before implementation
- Observable outcomes MUST take precedence over delivered outputs
- Data-informed decisions MUST prevail over intuition-based decisions (target: >80% data-driven)
- Rigid sprint planning MUST be replaced by natural cadences adapted to each task

**Rationale**: Traditional frameworks over-index on planning and conformity. AIAD optimizes for learning speed—the faster an hypothesis is validated or invalidated, the faster value is created.

### III. Orchestration Systémique

Humans define the "why" and "what"; AI agents handle the "how". Investing in agent configuration and context MUST benefit the entire team multiplicatively.

- The AGENT-GUIDE MUST be maintained as a living document, reviewed at minimum monthly
- Agent ecosystem MUST follow the minimal-first principle: start with core agents, add by pain, remove by obsolescence
- First-time success rate of generated code MUST target >70%
- Ratio of generated code to manual code MUST target >80/20
- Every PE MUST validate generated code against the SPEC before integration

**Rationale**: A well-configured agent ecosystem is a team-wide force multiplier. One hour invested in agent context saves repeated hours across every feature implementation.

### IV. Excellence Produit

The sole measure of success is value delivered to users, not effort spent or process compliance. Product thinking MUST prevail over project thinking.

- Every feature MUST have measurable Outcome Criteria defined before build
- Features MUST be validated against user outcomes at defined milestones (1 week, 1 month, 3 months)
- Feature adoption rate MUST target >60% within 1 month of release
- Features not meeting outcome targets MUST trigger a decision: iterate, pivot, or sunset
- "Shipped" is not "Done"—output without adoption is waste

**Rationale**: Building technically perfect features that nobody uses is the most expensive form of waste. AIAD exists to maximize user value, not feature count.

### V. Qualité Intégrée

Quality MUST be built in from the start, not verified at the end. The Definition of Output Done (DoOD) is non-negotiable.

- A feature is "Done" ONLY when ALL DoOD criteria are satisfied—no exceptions
- Tests MUST be written before implementation when TDD is specified in the SPEC
- Code coverage MUST target >80% backend, >70% frontend
- Bugs in production MUST follow a decreasing trend (-20% per quarter target)
- Mean Time To Detect (MTTD) MUST target <24h; Mean Time To Repair (MTTR) MUST target <4h
- Security scans MUST pass, no secrets in code, all inputs validated

**Rationale**: Velocity without quality is an illusion. Production bugs destroy user trust and create hidden debt that compounds over time.

## Artefacts & Standards

The following artefacts are mandatory for every feature and MUST remain living documents:

| Artefact | Purpose | Primary Owner |
|----------|---------|---------------|
| **PRD** | Define WHY and WHAT to build | PM |
| **ARCHITECTURE** | Define technical standards and constraints | Tech Lead |
| **AGENT-GUIDE** | Provide optimal context to AI agents | AE + PE |
| **SPECS** | Bridge business intent to concrete implementation | PE |
| **DoOD** | Uniform quality standard for "Done" | QA + PE |
| **DoOuD** | Measure whether delivered value is realized | PM |

Every artefact MUST meet four criteria: **Actionnable**, **Vivant** (living), **Minimal**, and **Collaboratif**.

Responsibilities MUST be clearly assigned regardless of team size. The five key responsibilities (PM, PE, AE, QA, Tech Lead) MUST each have an identified owner—one person MAY hold multiple responsibilities.

## Development Workflow

All work follows the four iterative phases: **PLANIFIER → IMPLÉMENTER → VALIDER → INTÉGRER**.

- Cycle time (PLANIFIER → INTÉGRER) MUST target <3 days
- Lead time (Idea → Production) MUST target <2 weeks
- Deployment success rate MUST target >95%
- Synchronizations MUST be intentional, timeboxed, and decision-oriented—not ceremonial
- Retrospectives MUST produce 1–3 concrete improvement actions with owners and deadlines
- The framework itself MUST be reviewed quarterly for relevance and adapted as needed

## Governance

This constitution is the highest-authority document for the AIAD project. All implementation decisions, code reviews, and process choices MUST comply with the principles defined herein.

- Amendments REQUIRE documentation of the change, rationale, and impact assessment
- Amendments MUST follow semantic versioning (MAJOR: principle removal/redefinition, MINOR: new principle/expansion, PATCH: clarification/wording)
- Compliance with this constitution MUST be verified during code reviews and plan approvals (Constitution Check in plan-template.md)
- Complexity beyond what is strictly needed MUST be justified in writing (Complexity Tracking)
- Refer to the AGENT-GUIDE for runtime development guidance

**Version**: 1.0.0 | **Ratified**: 2026-02-23 | **Last Amended**: 2026-02-23
