interface Props {
  role: string;
}

const interactions: Record<string, { collaborates: string[]; description: string }> = {
  'pm': {
    collaborates: ['PE', 'Tech Lead', 'QA', 'AE'],
    description: 'Le PM définit la valeur et collabore avec le PE pour les SPECs, le Tech Lead pour les trade-offs, le QA pour les critères de Done, et l\'AE pour le feedback des agents.',
  },
  'pe': {
    collaborates: ['PM', 'AE', 'QA', 'Tech Lead'],
    description: 'Le PE transforme les intentions du PM en SPECs, utilise l\'écosystème configuré par l\'AE, valide la qualité avec le QA, et respecte l\'architecture du Tech Lead.',
  },
  'ae': {
    collaborates: ['PE', 'Tech Lead', 'QA', 'PM'],
    description: 'L\'AE configure l\'écosystème pour les PE, aligne avec l\'architecture du Tech Lead, optimise les tests avec le QA, et rapporte l\'efficacité au PM.',
  },
  'qa': {
    collaborates: ['PE', 'PM', 'Tech Lead', 'AE'],
    description: 'Le QA définit "Done" avec le PE, valide les outcomes avec le PM, assure la cohérence qualité avec le Tech Lead, et vérifie les tests générés par les agents.',
  },
  'tech-lead': {
    collaborates: ['PE', 'PM', 'AE', 'QA'],
    description: 'Le Tech Lead guide l\'architecture avec les PE, arbitre les trade-offs avec le PM, définit les standards pour l\'AE, et établit les critères qualité avec le QA.',
  },
};

export default function RoleInteractions({ role }: Props) {
  const data = interactions[role];
  if (!data) return null;

  return (
    <div style={{ margin: '1.5rem 0', padding: '1.25rem', border: '1px solid var(--sl-color-gray-5)', borderRadius: '0.75rem' }}>
      <h3 style={{ marginTop: 0 }}>Interactions avec les autres rôles</h3>
      <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{data.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginTop: '0.75rem' }}>
        {data.collaborates.map((c) => (
          <span key={c} style={{ padding: '0.5rem 1rem', background: 'var(--sl-color-accent-low)', borderRadius: '1rem', fontSize: '0.9375rem', fontWeight: 600 }}>{c}</span>
        ))}
      </div>
    </div>
  );
}
