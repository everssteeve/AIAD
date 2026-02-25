import { useState } from 'react';

interface TeamConfig {
  size: string;
  members: { person: string; responsibilities: string[] }[];
}

const configs: TeamConfig[] = [
  {
    size: '2-3 personnes',
    members: [
      { person: 'A', responsibilities: ['PM', 'Tech Lead'] },
      { person: 'B', responsibilities: ['PE', 'QA', 'AE'] },
    ],
  },
  {
    size: '4-6 personnes',
    members: [
      { person: 'A', responsibilities: ['PM'] },
      { person: 'B', responsibilities: ['PE', 'Tech Lead'] },
      { person: 'C', responsibilities: ['PE', 'AE'] },
      { person: 'D', responsibilities: ['QA'] },
    ],
  },
  {
    size: '7+ personnes',
    members: [
      { person: 'PM', responsibilities: ['Product Manager'] },
      { person: 'PE 1', responsibilities: ['Product Engineer'] },
      { person: 'PE 2', responsibilities: ['Product Engineer'] },
      { person: 'AE', responsibilities: ['Agents Engineer'] },
      { person: 'QA', responsibilities: ['QA Engineer'] },
      { person: 'TL', responsibilities: ['Tech Lead'] },
    ],
  },
];

export default function TeamConfigurator() {
  const [selected, setSelected] = useState(0);
  const config = configs[selected];

  return (
    <div style={{ margin: '1.5rem 0', padding: '1.25rem', border: '1px solid var(--sl-color-gray-5)', borderRadius: '0.75rem' }}>
      <h3 style={{ marginTop: 0 }}>Configuration d'équipe recommandée</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {configs.map((c, i) => (
          <button
            key={c.size}
            onClick={() => setSelected(i)}
            style={{
              padding: '0.625rem 1.25rem', borderRadius: '1rem', border: '1px solid',
              borderColor: i === selected ? 'var(--sl-color-accent)' : 'var(--sl-color-gray-5)',
              background: i === selected ? 'var(--sl-color-accent-low)' : 'transparent',
              color: 'var(--sl-color-text)', cursor: 'pointer', fontWeight: i === selected ? 700 : 400,
              fontSize: '0.9375rem',
            }}
          >
            {c.size}
          </button>
        ))}
      </div>
      <table className="rd-team-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid var(--sl-color-gray-5)' }}>Personne</th>
            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid var(--sl-color-gray-5)' }}>Responsabilités</th>
          </tr>
        </thead>
        <tbody>
          {config.members.map((m) => (
            <tr key={m.person}>
              <td className="rd-team-cell-person" style={{ padding: '0.5rem', borderBottom: '1px solid var(--sl-color-gray-6)', fontWeight: 600 }}>{m.person}</td>
              <td className="rd-team-cell-responsibilities" style={{ padding: '0.5rem', borderBottom: '1px solid var(--sl-color-gray-6)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {m.responsibilities.map((r) => (
                    <span key={r} style={{ padding: '0.25rem 0.625rem', background: 'var(--sl-color-accent-low)', borderRadius: '0.5rem', fontSize: '0.875rem' }}>{r}</span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
