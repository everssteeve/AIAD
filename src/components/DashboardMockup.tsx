interface MetricBar {
  label: string;
  value: number;
  target: number;
  unit: string;
}

interface DashboardProps {
  category: string;
}

const dashboardData: Record<string, { title: string; metrics: MetricBar[] }> = {
  productivite: {
    title: 'Dashboard Productivité',
    metrics: [
      { label: 'Cycle Time', value: 2.5, target: 3, unit: 'jours' },
      { label: 'Lead Time', value: 10, target: 14, unit: 'jours' },
      { label: 'Throughput', value: 4, target: 3, unit: 'features/sem' },
      { label: 'Release Frequency', value: 5, target: 5, unit: 'déploiements/sem' },
      { label: 'Deployment Success', value: 97, target: 95, unit: '%' },
    ],
  },
  qualite: {
    title: 'Dashboard Qualité',
    metrics: [
      { label: 'Couverture Tests Backend', value: 85, target: 80, unit: '%' },
      { label: 'Couverture Tests Frontend', value: 72, target: 70, unit: '%' },
      { label: 'Bugs Production', value: 3, target: 5, unit: '/mois' },
      { label: 'MTTD', value: 18, target: 24, unit: 'heures' },
      { label: 'MTTR', value: 3, target: 4, unit: 'heures' },
      { label: 'First-Time Success', value: 74, target: 70, unit: '%' },
    ],
  },
  'efficacite-ia': {
    title: "Dashboard Efficacité IA",
    metrics: [
      { label: 'Adoption Agents', value: 93, target: 90, unit: '%' },
      { label: 'First-Time Success Agents', value: 72, target: 70, unit: '%' },
      { label: 'Ratio Généré/Manuel', value: 82, target: 80, unit: '%' },
      { label: 'Itérations Moyennes', value: 2.5, target: 3, unit: '/feature' },
      { label: 'Faux Positifs', value: 15, target: 20, unit: '%' },
      { label: 'Satisfaction PE', value: 8.5, target: 8, unit: '/10' },
    ],
  },
  outcomes: {
    title: 'Dashboard Outcomes',
    metrics: [
      { label: 'Atteinte Outcome Criteria', value: 75, target: 70, unit: '%' },
      { label: 'Satisfaction Utilisateur', value: 8.2, target: 8, unit: '/10' },
      { label: 'Adoption Fonctionnalité', value: 65, target: 60, unit: '%' },
      { label: 'Time to Value', value: 4, target: 5, unit: 'minutes' },
      { label: 'Retention Rate', value: 84, target: 80, unit: '%' },
    ],
  },
  equipe: {
    title: "Dashboard Équipe",
    metrics: [
      { label: 'Satisfaction Équipe', value: 7.8, target: 7, unit: '/10' },
      { label: 'Psychological Safety', value: 8.3, target: 8, unit: '/10' },
      { label: 'Temps en Flow', value: 4.5, target: 4, unit: 'h/jour' },
    ],
  },
};

function MetricRow({ metric }: { metric: MetricBar }) {
  const ratio = Math.min(metric.value / metric.target, 1.5);
  const isGood = metric.label === 'Bugs Production' || metric.label === 'Faux Positifs' || metric.label === 'Itérations Moyennes' || metric.label === 'MTTD' || metric.label === 'MTTR'
    ? metric.value <= metric.target
    : metric.value >= metric.target;
  const barColor = isGood ? '#22c55e' : '#f59e0b';
  const barWidth = Math.min(ratio * 100, 100);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
        <span style={{ fontWeight: 600 }}>{metric.label}</span>
        <span>
          <span style={{ fontWeight: 700, color: isGood ? '#22c55e' : '#f59e0b' }}>{metric.value}</span>
          <span style={{ color: 'var(--sl-color-gray-3)' }}> / {metric.target} {metric.unit}</span>
        </span>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'var(--sl-color-gray-6)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${barWidth}%`, height: '100%', background: barColor, borderRadius: '4px', transition: 'width 0.5s' }} />
      </div>
    </div>
  );
}

export default function DashboardMockup({ category }: DashboardProps) {
  const data = dashboardData[category];
  if (!data) return <p>Dashboard non disponible pour cette catégorie.</p>;

  return (
    <div style={{ margin: '1.5rem 0', padding: '1.25rem', border: '1px solid var(--sl-color-gray-5)', borderRadius: '0.75rem' }}>
      <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>{data.title}</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--sl-color-gray-3)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Exemple de visualisation avec données fictives
      </p>
      {data.metrics.map((m) => (
        <MetricRow key={m.label} metric={m} />
      ))}
    </div>
  );
}
