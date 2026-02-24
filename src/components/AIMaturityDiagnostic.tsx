import { useState, useCallback } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const DIMENSIONS = [
  { id: "tools", label: "Outils & Environnement", short: "Outils" },
  { id: "process", label: "Process de Développement", short: "Process" },
  { id: "docs", label: "Documentation & Artefacts", short: "Documentation" },
  { id: "quality", label: "Qualité & Tests", short: "Qualité" },
  { id: "collab", label: "Collaboration & Rôles", short: "Collaboration" },
  { id: "vision", label: "Vision & Stratégie", short: "Vision" },
];

const LEVELS = [
  {
    name: "Auto-complétion",
    color: "#94A3B8",
    description:
      "Votre équipe utilise l'IA comme un copilote réactif pour l'auto-complétion et l'assistance au codage. C'est un bon début, mais le potentiel de l'IA est bien plus vaste.",
  },
  {
    name: "Vibe Coding",
    color: "#3B82F6",
    description:
      "Votre équipe décrit en langage naturel ce qu'elle veut et l'IA génère le code. C'est puissant, mais sans structure, la dette technique s'accumule vite.",
  },
  {
    name: "Context Engineering",
    color: "#8B5CF6",
    description:
      "Votre équipe a construit un écosystème informationnel structuré autour de l'agent IA. Le contexte est maîtrisé, les agents sont configurés.",
  },
  {
    name: "Spec-Driven Development",
    color: "#10B981",
    description:
      "Votre équipe opère au plus haut niveau de maturité : des spécifications formalisées guident l'ensemble du développement. L'intention prime sur l'exécution.",
  },
];

const QUESTIONS = [
  // Dimension 0: Outils & Environnement
  {
    dimension: 0,
    text: "Quels outils IA votre équipe utilise-t-elle au quotidien ?",
    options: [
      "Copilot / TabNine pour l'auto-complétion dans l'IDE",
      "Cursor / Windsurf / ChatGPT pour générer des blocs de code entiers",
      "Agent IA de codage (Claude Code, Codex CLI) avec MCP, fichier de config, SubAgents",
      "Agent IA orchestré par des specs formalisées (PRD → ARCHITECTURE → SPECS → Code)",
    ],
  },
  {
    dimension: 0,
    text: "Comment votre agent IA accède-t-il au contexte de votre projet ?",
    options: [
      "Il n'a pas de contexte spécifique, il travaille fichier par fichier",
      "On lui copie-colle du contexte dans le prompt quand nécessaire",
      "Un fichier de config (CLAUDE.md / AGENTS.md) + MCP lui donne accès au projet",
      "Plusieurs documents vivants (PRD, ARCHITECTURE, AGENT-GUIDE, SPECS) structurent systématiquement son contexte",
    ],
  },
  {
    dimension: 0,
    text: "Votre agent IA utilise-t-il des extensions ou des connexions à des outils externes ?",
    options: [
      "Non, juste l'auto-complétion dans l'IDE",
      "Pas vraiment, on utilise principalement le chat",
      "Oui, des MCP (Playwright, Context7, BD…) et/ou des SubAgents spécialisés",
      "Oui, un écosystème complet : MCP + SubAgents + Skills + Hooks + pipeline CI/CD intégré",
    ],
  },
  // Dimension 1: Process
  {
    dimension: 1,
    text: "Comment une nouvelle fonctionnalité est-elle développée ?",
    options: [
      "Le dev code manuellement avec aide IA pour compléter le code",
      "On décrit la fonctionnalité en langage naturel et l'IA génère le code",
      "On prépare le contexte (docs, règles) puis on guide l'agent étape par étape",
      "On rédige une SPEC formalisée, l'agent planifie puis implémente, on valide",
    ],
  },
  {
    dimension: 1,
    text: "Combien de fonctionnalités développez-vous en parallèle avec l'IA ?",
    options: [
      "L'IA assiste sur le fichier en cours, pas de notion de « fonctionnalité »",
      "On essaie de faire tout d'un coup (approche « Big Bang »)",
      "On découpe en tâches, mais sans formalisme strict",
      "Strictement une fonctionnalité à la fois : Spec → Implémentation → Validation → Commit",
    ],
  },
  {
    dimension: 1,
    text: "Que se passe-t-il quand l'IA génère du code incorrect ?",
    options: [
      "On corrige manuellement",
      "On re-prompte jusqu'à obtenir quelque chose qui marche",
      "On ajuste le contexte/prompt et on documente l'erreur dans le fichier de config",
      "On analyse si le problème vient de la SPEC, on corrige la source, et on ajoute une règle préventive",
    ],
  },
  // Dimension 2: Documentation
  {
    dimension: 2,
    text: "Quelle documentation guide votre développement IA ?",
    options: [
      "Pas de documentation spécifique à l'IA",
      "Des prompts sauvegardés ou des notes informelles",
      "Un CLAUDE.md / AGENTS.md avec des règles, patterns et vocabulaire métier",
      "Un écosystème complet : PRD → ARCHITECTURE → AGENT-GUIDE → SPECS par tâche",
    ],
  },
  {
    dimension: 2,
    text: "Vos documents de développement sont-ils mis à jour régulièrement ?",
    options: [
      "Nous n'avons pas de docs spécifiques à l'IA",
      "Rarement, on se concentre sur le code",
      "Le fichier de config agent est enrichi à chaque itération",
      "Tous les artefacts sont des documents vivants mis à jour systématiquement (rétrospective IA incluse)",
    ],
  },
  // Dimension 3: Qualité
  {
    dimension: 3,
    text: "Comment gérez-vous la qualité du code généré par l'IA ?",
    options: [
      "On vérifie manuellement le code suggéré avant de l'accepter",
      "On teste manuellement en lançant l'application",
      "L'agent génère des tests, on les valide et on exécute",
      "Les tests attendus sont spécifiés dans la SPEC, couverture >80% visée, revue automatique par SubAgent",
    ],
  },
  {
    dimension: 3,
    text: "Mesurez-vous des métriques liées à l'utilisation de l'IA ?",
    options: [
      "Non",
      "Pas formellement, on a une idée du gain de temps",
      "On suit quelques indicateurs (taux d'adoption, bugs)",
      "Dashboard avec vélocité, first-time success rate, couverture tests, lead time, ratio génération/correction",
    ],
  },
  // Dimension 4: Collaboration
  {
    dimension: 4,
    text: "Comment les rôles sont-ils définis par rapport à l'IA ?",
    options: [
      "Les devs utilisent l'IA individuellement, pas d'impact sur les rôles",
      "Certains devs sont plus « vibe coders » que d'autres, pas de formalisme",
      "On commence à distinguer des rôles (qui prépare le contexte, qui valide)",
      "Rôles clairement définis : Product Owner, Tech Lead, Product Engineer, QA Engineer",
    ],
  },
  {
    dimension: 4,
    text: "Comment partagez-vous les bonnes pratiques IA dans l'équipe ?",
    options: [
      "Informellement, chacun découvre par soi-même",
      "On partage des prompts qui marchent bien",
      "On a un guide partagé et des rétrospectives incluant l'IA",
      "Rétrospectives IA dédiées, AGENT-GUIDE collaboratif, coaching hebdomadaire, métriques d'efficacité IA suivies",
    ],
  },
  // Dimension 5: Vision
  {
    dimension: 5,
    text: "Quelle est la vision de votre équipe sur l'IA dans le développement ?",
    options: [
      "Un outil pratique pour aller plus vite sur le code",
      "Un moyen de générer du code plus rapidement",
      "Un partenaire de développement qu'il faut bien configurer et guider",
      "Un changement de paradigme : les devs deviennent des orchestrateurs stratégiques",
    ],
  },
  {
    dimension: 5,
    text: "Où en êtes-vous dans la gestion de la sécurité du code IA ?",
    options: [
      "On fait confiance à l'IA + revue manuelle classique",
      "On n'y pense pas vraiment, on se concentre sur le résultat",
      "Validation systématique, pas de secrets dans les prompts, scan de sécurité",
      "Agent Sécurité dédié, scan automatique post-génération, gouvernance formalisée, audit trail",
    ],
  },
];

const RECOMMENDATIONS: Record<number, string[]> = {
  1: [
    "Essayez de décrire votre prochaine fonctionnalité en langage naturel plutôt que de coder directement",
    "Testez Cursor ou Claude Code pour générer des blocs de code entiers",
    "Commencez par un petit projet pour expérimenter le vibe coding",
    "Formez-vous aux prompts efficaces pour le développement",
  ],
  2: [
    "Créez un fichier CLAUDE.md avec les règles et conventions de votre projet",
    "Installez des MCP (Context7, Playwright) pour enrichir le contexte de votre agent",
    "Arrêtez le Big Bang : développez une fonctionnalité à la fois",
    "Documentez les erreurs récurrentes de l'agent pour les éviter",
    "Mettez en place des SubAgents spécialisés (Code Reviewer, Test Writer)",
  ],
  3: [
    "Formalisez vos spécifications : chaque tâche devrait avoir une SPEC écrite",
    "Adoptez le workflow : PRD → ARCHITECTURE → SPECS → Implémentation → Validation",
    "Mettez en place des métriques d'efficacité IA (first-time success rate, couverture tests)",
    "Introduisez les rétrospectives IA dans vos rituels d'équipe",
    "Découvrez le framework AIAD pour structurer votre approche",
  ],
  4: [
    "Félicitations ! Vous êtes dans le top <5% des organisations",
    "Optimisez vos Agents Spécialisés (Sécurité, Qualité, Documentation)",
    "Mesurez votre ROI et partagez vos résultats avec la communauté",
    "Envisagez de former d'autres équipes à votre approche",
    "Contribuez à l'évolution du framework AIAD",
  ],
};

const DIM_RECOMMENDATIONS: Record<string, Record<number, string>> = {
  tools: {
    1: "Explorez les agents IA de codage (Claude Code, Cursor) au-delà de la simple auto-complétion",
    2: "Configurez un fichier CLAUDE.md et connectez des MCP pour structurer le contexte de votre agent",
    3: "Complétez votre écosystème avec un pipeline de spécifications formalisées (PRD → ARCHITECTURE → SPECS)",
    4: "Votre outillage est au top ! Continuez à optimiser et partager vos configurations",
  },
  process: {
    1: "Commencez à décrire vos fonctionnalités en langage naturel pour l'IA plutôt que de coder directement",
    2: "Structurez votre approche : découpez en tâches et guidez l'agent avec du contexte préparé",
    3: "Formalisez le cycle complet : Spec → Plan → Implémentation → Validation → Commit",
    4: "Votre process est exemplaire ! Affinez les métriques de cycle et réduisez le lead time",
  },
  docs: {
    1: "Créez au minimum un fichier de configuration agent avec les règles de base de votre projet",
    2: "Structurez votre documentation : ajoutez des patterns, du vocabulaire métier, des anti-patterns",
    3: "Mettez en place l'écosystème complet d'artefacts : PRD, ARCHITECTURE, AGENT-GUIDE, SPECS",
    4: "Documentation exemplaire ! Automatisez la détection de docs obsolètes avec un Agent Documentation",
  },
  quality: {
    1: "Demandez à votre agent IA de générer des tests unitaires pour le code qu'il produit",
    2: "Faites générer les tests par l'agent et exécutez-les systématiquement avant de valider",
    3: "Spécifiez les tests attendus dans vos SPECS et visez >80% de couverture avec revue automatique",
    4: "Qualité au top ! Ajoutez des tests de mutation et un Agent Qualité pour détecter les faiblesses",
  },
  collab: {
    1: "Partagez les bonnes pratiques IA entre développeurs, ne laissez pas chacun seul",
    2: "Commencez à distinguer les rôles : qui prépare le contexte, qui orchestre, qui valide",
    3: "Formalisez les rôles (Product Engineer, QA) et instaurez des rétrospectives IA dédiées",
    4: "Collaboration exemplaire ! Formez d'autres équipes et partagez votre modèle organisationnel",
  },
  vision: {
    1: "Prenez conscience que l'IA est plus qu'un outil de productivité — c'est un changement de paradigme",
    2: "Investissez dans la configuration et le guidage de l'agent plutôt que de juste « générer du code »",
    3: "Adoptez pleinement le paradigme : les devs deviennent des orchestrateurs, l'intention prime sur l'exécution",
    4: "Vision exemplaire ! Évangélisez en interne et contribuez à la communauté AIAD",
  },
};

// ─── Styles (scoped CSS) ─────────────────────────────────────────────────────

const SCOPED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display&display=swap');
  .aiad-diagnostic, .aiad-diagnostic * {
    font-family: 'DM Sans', sans-serif;
    box-sizing: border-box;
  }
  .aiad-diagnostic h1, .aiad-diagnostic h2, .aiad-diagnostic h3, .aiad-diagnostic h4 {
    border: none;
  }
  @keyframes aiad-fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes aiad-countUp {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes aiad-pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3); }
    50% { box-shadow: 0 0 0 12px rgba(59,130,246,0); }
  }
  .aiad-diagnostic button { cursor: pointer; }
  .aiad-diagnostic button:hover { filter: brightness(1.03); }
`;

// ─── Components ──────────────────────────────────────────────────────────────

function Pyramid() {
  const levels = [
    { label: "Niv. 4 — Spec-Driven Dev", w: "35%", color: "#10B981" },
    { label: "Niv. 3 — Context Engineering", w: "55%", color: "#8B5CF6" },
    { label: "Niv. 2 — Vibe Coding", w: "75%", color: "#3B82F6" },
    { label: "Niv. 1 — Auto-complétion", w: "95%", color: "#94A3B8" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem", margin: "1.5rem 0" }}>
      {levels.map((l, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.375rem",
            color: "#FFFFFF",
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "0.025em",
            padding: "0.625rem 0",
            width: l.w,
            background: l.color,
            opacity: 0,
            animation: `aiad-fadeSlideUp 0.5s ease ${0.15 * i}s forwards`,
          }}
        >
          {l.label}
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ value, max, color = "#3B82F6", height = 6 }: { value: number; max: number; color?: string; height?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ width: "100%", borderRadius: "9999px", overflow: "hidden", height, background: "#E2E8F0" }}>
      <div
        style={{
          height: "100%",
          borderRadius: "9999px",
          transition: "all 1s ease-out",
          width: `${pct}%`,
          background: color,
        }}
      />
    </div>
  );
}

function QuestionCard({
  question,
  selected,
  onSelect,
}: {
  question: (typeof QUESTIONS)[number];
  selected: number | undefined;
  onSelect: (v: number) => void;
}) {
  return (
    <div style={{ width: "100%", animation: "aiad-fadeSlideUp 0.4s ease forwards" }}>
      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "0.25rem",
          color: "#64748B",
        }}
      >
        {DIMENSIONS[question.dimension].label}
      </p>
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          lineHeight: "1.375",
          color: "#1B2A4A",
          marginTop: 0,
        }}
      >
        {question.text}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {question.options.map((opt, i) => {
          const isSelected = selected === i + 1;
          return (
            <button
              key={i}
              onClick={() => onSelect(i + 1)}
              style={{
                textAlign: "left",
                borderRadius: "0.75rem",
                padding: "1rem 1.25rem",
                border: `2px solid ${isSelected ? "#3B82F6" : "#E2E8F0"}`,
                transition: "all 0.2s",
                fontSize: "0.9375rem",
                lineHeight: "1.625",
                borderColor: isSelected ? "#3B82F6" : "#E2E8F0",
                background: isSelected ? "#EFF6FF" : "#FFFFFF",
                color: isSelected ? "#1E40AF" : "#334155",
                fontWeight: isSelected ? 600 : 400,
                boxShadow: isSelected ? "0 0 0 1px #3B82F6" : "0 1px 2px rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  marginRight: "0.75rem",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                  background: isSelected ? "#3B82F6" : "#F1F5F9",
                  color: isSelected ? "#FFFFFF" : "#94A3B8",
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RadarChartComponent({ dimensionScores }: { dimensionScores: number[] }) {
  const data = DIMENSIONS.map((d, i) => ({
    subject: d.short,
    score: dimensionScores[i],
    fullMark: 4,
  }));

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="#CBD5E1" strokeWidth={0.5} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#475569", fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 4]}
            tickCount={5}
            tick={{ fill: "#94A3B8", fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.2}
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#3B82F6" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

function DimensionDetail({ dimension, score, index }: { dimension: (typeof DIMENSIONS)[number]; score: number; index: number }) {
  const level = Math.min(Math.max(Math.round(score), 1), 4);
  const levelData = LEVELS[level - 1];
  const rec = DIM_RECOMMENDATIONS[dimension.id][level];

  return (
    <div
      style={{
        borderRadius: "0.75rem",
        padding: "1.25rem",
        border: "1px solid #E2E8F0",
        background: "#FFFFFF",
        animation: `aiad-fadeSlideUp 0.4s ease ${index * 0.08}s forwards`,
        opacity: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <h4 style={{ fontWeight: 700, fontSize: "0.875rem", color: "#1B2A4A", margin: 0 }}>
          {dimension.label}
        </h4>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "0.25rem 0.625rem",
            borderRadius: "9999px",
            background: levelData.color + "18",
            color: levelData.color,
          }}
        >
          {score.toFixed(1)} / 4
        </span>
      </div>
      <ProgressBar value={score} max={4} color={levelData.color} height={5} />
      <p style={{ fontSize: "0.75rem", marginTop: "0.625rem", fontWeight: 500, color: levelData.color, marginBottom: 0 }}>
        Niveau {level} — {levelData.name}
      </p>
      <p style={{ fontSize: "0.75rem", marginTop: "0.375rem", lineHeight: "1.625", color: "#64748B", marginBottom: 0 }}>
        {rec}
      </p>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function AIMaturityDiagnostic() {
  const [page, setPage] = useState<"home" | "quiz" | "results">("home");
  const [teamName, setTeamName] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const totalQuestions = QUESTIONS.length;
  const progress = Object.keys(answers).length;

  const handleSelect = useCallback(
    (value: number) => {
      setAnswers((prev) => ({ ...prev, [currentQ]: value }));
      setTimeout(() => {
        if (currentQ < totalQuestions - 1) {
          setCurrentQ((q) => q + 1);
        }
      }, 350);
    },
    [currentQ, totalQuestions]
  );

  const goNext = () => {
    if (currentQ < totalQuestions - 1) setCurrentQ((q) => q + 1);
  };
  const goPrev = () => {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  };

  const canFinish = progress === totalQuestions;

  const computeScores = () => {
    const dimTotals: Record<number, number> = {};
    const dimCounts: Record<number, number> = {};
    DIMENSIONS.forEach((_, i) => {
      dimTotals[i] = 0;
      dimCounts[i] = 0;
    });
    Object.entries(answers).forEach(([qIdx, val]) => {
      const dim = QUESTIONS[parseInt(qIdx)].dimension;
      dimTotals[dim] += val;
      dimCounts[dim] += 1;
    });
    const dimScores = DIMENSIONS.map((_, i) =>
      dimCounts[i] > 0 ? dimTotals[i] / dimCounts[i] : 0
    );
    const globalScore = dimScores.reduce((a, b) => a + b, 0) / dimScores.length;
    const globalLevel =
      globalScore < 1.75 ? 1 : globalScore < 2.5 ? 2 : globalScore < 3.25 ? 3 : 4;
    return { dimScores, globalScore, globalLevel };
  };

  const handleFinish = () => {
    setPage("results");
  };

  const handleRestart = () => {
    setPage("home");
    setCurrentQ(0);
    setAnswers({});
    setTeamName("");
  };

  const handleShare = () => {
    const { globalScore, globalLevel } = computeScores();
    const text = `Diagnostic Maturite IA — Developpement Logiciel\n${teamName ? `Equipe : ${teamName}\n` : ""}Score : ${globalScore.toFixed(1)}/4 — Niveau ${globalLevel} : ${LEVELS[globalLevel - 1].name}\n\nFaites votre diagnostic → framework AIAD`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  // ─── HOME PAGE ─────────────────────────────────────────────────────────

  if (page === "home") {
    return (
      <div className="aiad-diagnostic" style={{ background: "#F8FAFF" }}>
        <style>{SCOPED_CSS}</style>

        {/* Header accent */}
        <div
          style={{
            width: "100%",
            height: "0.375rem",
            background: "linear-gradient(90deg, #1B2A4A 0%, #3B82F6 50%, #10B981 100%)",
            borderRadius: "0.375rem 0.375rem 0 0",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
          <div style={{ width: "100%", maxWidth: "32rem", animation: "aiad-fadeSlideUp 0.6s ease forwards" }}>
            {/* Badge */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.025em",
                  background: "#1B2A4A",
                  color: "#93C5FD",
                }}
              >
                <span style={{ fontSize: 10 }}>&#9670;</span> FRAMEWORK AIAD
              </span>
            </div>

            <h1
              style={{
                textAlign: "center",
                fontSize: "2.25rem",
                fontWeight: 700,
                lineHeight: "1.25",
                marginBottom: "0.75rem",
                color: "#1B2A4A",
                fontFamily: "'DM Serif Display', serif",
                marginTop: 0,
              }}
            >
              Diagnostic de Maturite IA
            </h1>
            <p style={{ textAlign: "center", fontSize: "1rem", marginBottom: "0.25rem", color: "#475569" }}>
              Developpement Logiciel
            </p>
            <p style={{ textAlign: "center", fontSize: "0.875rem", marginBottom: "1.5rem", color: "#94A3B8" }}>
              Evaluez en 5 minutes ou se situe votre equipe dans l'adoption de l'IA
            </p>

            <Pyramid />

            {/* Team name input */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  marginBottom: "0.375rem",
                  letterSpacing: "0.025em",
                  textTransform: "uppercase",
                  color: "#64748B",
                }}
              >
                Nom de votre equipe{" "}
                <span style={{ color: "#94A3B8", fontWeight: 400, textTransform: "none" }}>(optionnel)</span>
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Ex: Equipe Produit, Squad Frontend…"
                style={{
                  width: "100%",
                  borderRadius: "0.75rem",
                  padding: "0.75rem 1rem",
                  fontSize: "0.875rem",
                  border: "2px solid #E2E8F0",
                  outline: "none",
                  background: "#FFFFFF",
                  color: "#1B2A4A",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
              />
            </div>

            {/* CTA */}
            <button
              onClick={() => setPage("quiz")}
              style={{
                width: "100%",
                borderRadius: "0.75rem",
                padding: "1rem 0",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.025em",
                border: "none",
                background: "linear-gradient(135deg, #1B2A4A 0%, #2563EB 100%)",
                boxShadow: "0 4px 20px rgba(27,42,74,0.25)",
                transition: "transform 0.2s",
              }}
            >
              Demarrer le diagnostic →
            </button>

            <p style={{ textAlign: "center", fontSize: "0.75rem", marginTop: "1rem", lineHeight: "1.625", color: "#94A3B8" }}>
              Base sur 30+ sources : McKinsey, Gartner, Thoughtworks, MIT Technology Review, Stack Overflow…
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── QUIZ PAGE ─────────────────────────────────────────────────────────

  if (page === "quiz") {
    const question = QUESTIONS[currentQ];

    return (
      <div className="aiad-diagnostic" style={{ background: "#F8FAFF" }}>
        <style>{SCOPED_CSS}</style>

        {/* Top progress bar */}
        <div style={{ width: "100%", height: "0.25rem", background: "#E2E8F0", borderRadius: "0.25rem" }}>
          <div
            style={{
              height: "100%",
              transition: "all 0.5s ease-out",
              width: `${(progress / totalQuestions) * 100}%`,
              background: "linear-gradient(90deg, #1B2A4A, #3B82F6)",
              borderRadius: "0.25rem",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          <button
            onClick={() => setPage("home")}
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              padding: "0.375rem 0.75rem",
              borderRadius: "0.5rem",
              color: "#64748B",
              background: "#F1F5F9",
              border: "none",
            }}
          >
            ← Accueil
          </button>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#3B82F6" }}>
            {progress} / {totalQuestions}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "1.5rem 1rem" }}>
          <div style={{ width: "100%", maxWidth: "32rem" }} key={currentQ}>
            <QuestionCard
              question={question}
              selected={answers[currentQ]}
              onSelect={handleSelect}
            />

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "2rem",
                gap: "0.75rem",
              }}
            >
              <button
                onClick={goPrev}
                disabled={currentQ === 0}
                style={{
                  padding: "0.625rem 1.25rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  border: "none",
                  color: currentQ === 0 ? "#CBD5E1" : "#475569",
                  background: currentQ === 0 ? "#F8FAFC" : "#F1F5F9",
                  cursor: currentQ === 0 ? "default" : "pointer",
                }}
              >
                ← Precedent
              </button>

              {currentQ < totalQuestions - 1 ? (
                <button
                  onClick={goNext}
                  disabled={!answers[currentQ]}
                  style={{
                    padding: "0.625rem 1.25rem",
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    border: "none",
                    background: answers[currentQ]
                      ? "linear-gradient(135deg, #1B2A4A, #2563EB)"
                      : "#CBD5E1",
                    cursor: answers[currentQ] ? "pointer" : "default",
                  }}
                >
                  Suivant →
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  disabled={!canFinish}
                  style={{
                    padding: "0.625rem 1.5rem",
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    border: "none",
                    background: canFinish
                      ? "linear-gradient(135deg, #059669, #10B981)"
                      : "#CBD5E1",
                    cursor: canFinish ? "pointer" : "default",
                    boxShadow: canFinish ? "0 4px 15px rgba(16,185,129,0.3)" : "none",
                  }}
                >
                  Voir mes resultats
                </button>
              )}
            </div>

            {/* Dimension pills */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.375rem", marginTop: "1.5rem" }}>
              {DIMENSIONS.map((d, i) => {
                const questionsInDim = QUESTIONS.filter((q) => q.dimension === i);
                const answeredInDim = questionsInDim.filter(
                  (_, qi) =>
                    answers[QUESTIONS.findIndex((q) => q === questionsInDim[qi])] !== undefined
                ).length;
                const allAnswered = answeredInDim === questionsInDim.length;
                const isCurrent = question.dimension === i;

                return (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.625rem",
                      borderRadius: "9999px",
                      fontWeight: 500,
                      background: allAnswered ? "#DCFCE7" : isCurrent ? "#DBEAFE" : "#F1F5F9",
                      color: allAnswered ? "#166534" : isCurrent ? "#1E40AF" : "#94A3B8",
                    }}
                  >
                    {allAnswered ? "✓ " : ""}
                    {d.short}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULTS PAGE ──────────────────────────────────────────────────────

  if (page === "results") {
    const { dimScores, globalScore, globalLevel } = computeScores();
    const levelData = LEVELS[globalLevel - 1];
    const recs = RECOMMENDATIONS[globalLevel];

    return (
      <div className="aiad-diagnostic" style={{ background: "#F8FAFF" }}>
        <style>{SCOPED_CSS}</style>

        {/* Accent bar */}
        <div
          style={{
            width: "100%",
            height: "0.375rem",
            background: `linear-gradient(90deg, ${levelData.color}, #1B2A4A)`,
            borderRadius: "0.375rem 0.375rem 0 0",
          }}
        />

        <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "2rem 1rem" }}>
          {/* Hero result */}
          <div
            style={{
              borderRadius: "1rem",
              padding: "2rem",
              marginBottom: "1.5rem",
              textAlign: "center",
              background: "linear-gradient(135deg, #1B2A4A 0%, #1E3A5F 50%, #1B2A4A 100%)",
              animation: "aiad-fadeSlideUp 0.6s ease forwards",
            }}
          >
            {teamName && (
              <p style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem", letterSpacing: "0.025em", color: "#93C5FD" }}>
                {teamName}
              </p>
            )}

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "5rem",
                height: "5rem",
                borderRadius: "1rem",
                marginBottom: "1rem",
                background: levelData.color + "25",
                border: `3px solid ${levelData.color}`,
                animation: "aiad-countUp 0.6s ease 0.3s forwards",
                opacity: 0,
              }}
            >
              <span
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 700,
                  color: levelData.color,
                  fontFamily: "'DM Serif Display', serif",
                }}
              >
                {globalLevel}
              </span>
            </div>

            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "0.25rem",
                fontFamily: "'DM Serif Display', serif",
                marginTop: 0,
              }}
            >
              {levelData.name}
            </h2>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ color: "#FFFFFF", fontSize: "1.125rem", fontWeight: 700 }}>
                {globalScore.toFixed(1)}
              </span>
              <span style={{ color: "#64748B" }}>/</span>
              <span style={{ color: "#94A3B8" }}>4.0</span>
            </div>

            {/* Global progress bar */}
            <div style={{ maxWidth: "20rem", margin: "0 auto 1rem" }}>
              <div style={{ width: "100%", height: "0.625rem", borderRadius: "9999px", background: "#374151" }}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: "9999px",
                    transition: "all 1.5s ease-out",
                    width: `${(globalScore / 4) * 100}%`,
                    background: `linear-gradient(90deg, ${levelData.color}, ${levelData.color}AA)`,
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.375rem" }}>
                {LEVELS.map((l, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.75rem",
                      color: i + 1 === globalLevel ? levelData.color : "#64748B",
                      fontWeight: i + 1 === globalLevel ? 700 : 400,
                    }}
                  >
                    Niv.{i + 1}
                  </span>
                ))}
              </div>
            </div>

            <p style={{ fontSize: "0.875rem", lineHeight: "1.625", maxWidth: "28rem", margin: "0 auto", color: "#CBD5E1" }}>
              {levelData.description}
            </p>
          </div>

          {/* Radar Chart */}
          <div
            style={{
              borderRadius: "1rem",
              padding: "1.25rem",
              marginBottom: "1.5rem",
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
              animation: "aiad-fadeSlideUp 0.5s ease 0.2s forwards",
              opacity: 0,
            }}
          >
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem", textAlign: "center", color: "#1B2A4A", marginTop: 0 }}>
              Profil par dimension
            </h3>
            <p style={{ fontSize: "0.75rem", textAlign: "center", marginBottom: "0.75rem", color: "#94A3B8" }}>
              Visualisez vos forces et axes d'amelioration
            </p>
            <RadarChartComponent dimensionScores={dimScores} />
          </div>

          {/* Dimension details */}
          <div style={{ marginBottom: "1.5rem", animation: "aiad-fadeSlideUp 0.5s ease 0.4s forwards", opacity: 0 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", color: "#1B2A4A", marginTop: 0 }}>
              Detail par dimension
            </h3>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {DIMENSIONS.map((d, i) => (
                <DimensionDetail key={i} dimension={d} score={dimScores[i]} index={i} />
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div
            style={{
              borderRadius: "1rem",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
              animation: "aiad-fadeSlideUp 0.5s ease 0.6s forwards",
              opacity: 0,
            }}
          >
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem", color: "#1B2A4A", marginTop: 0 }}>
              {globalLevel < 4 ? `Pour passer au Niveau ${globalLevel + 1}` : "Recommandations"}
            </h3>
            <p style={{ fontSize: "0.75rem", marginBottom: "1rem", color: "#94A3B8" }}>
              {globalLevel < 4
                ? `Actions concretes pour progresser vers ${LEVELS[globalLevel].name}`
                : "Vous etes au sommet — continuez a exceller"}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {recs.map((rec, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    borderRadius: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "#F8FAFF",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: "1.5rem",
                      height: "1.5rem",
                      borderRadius: "9999px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      marginTop: "0.125rem",
                      background: globalLevel === 4 ? "#DCFCE7" : "#DBEAFE",
                      color: globalLevel === 4 ? "#166534" : "#1E40AF",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p style={{ fontSize: "0.875rem", lineHeight: "1.625", color: "#334155", margin: 0 }}>
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem", animation: "aiad-fadeSlideUp 0.5s ease 0.8s forwards", opacity: 0 }}>
            <a
              href="https://discord.gg/Yx8A2G2Dy3"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                width: "100%",
                borderRadius: "0.75rem",
                padding: "0.875rem 0",
                textAlign: "center",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
                border: "2px solid #3B82F6",
                color: "#3B82F6",
                background: "#EFF6FF",
                boxSizing: "border-box",
              }}
            >
              Rejoindre la communaute Discord
            </a>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={handleShare}
                style={{
                  flex: 1,
                  borderRadius: "0.75rem",
                  padding: "0.75rem 0",
                  textAlign: "center",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  background: "#F1F5F9",
                  color: "#475569",
                  border: "none",
                }}
              >
                Copier mon resultat
              </button>
              <button
                onClick={handleRestart}
                style={{
                  flex: 1,
                  borderRadius: "0.75rem",
                  padding: "0.75rem 0",
                  textAlign: "center",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  background: "#F1F5F9",
                  color: "#475569",
                  border: "none",
                }}
              >
                Refaire le diagnostic
              </button>
            </div>
          </div>

          {/* Footer */}
          <p style={{ textAlign: "center", fontSize: "0.75rem", paddingBottom: "1.5rem", color: "#CBD5E1" }}>
            Diagnostic propulse par le Framework AIAD — AI-Agent Iterative Development
          </p>
        </div>
      </div>
    );
  }

  return null;
}
