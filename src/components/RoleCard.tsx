interface Role {
  name: string;
  question: string;
  focus: string;
  href: string;
  emoji: string;
}

const roles: Role[] = [
  { name: 'Product Manager', question: 'Construit-on la bonne chose ?', focus: 'Valeur', href: '/roles/product-manager/', emoji: '🎯' },
  { name: 'Product Engineer', question: "L'agent produit-il le bon résultat ?", focus: 'Orchestration', href: '/roles/product-engineer/', emoji: '⚙️' },
  { name: 'Agents Engineer', question: "L'écosystème est-il optimal ?", focus: 'Configuration', href: '/roles/agents-engineer/', emoji: '🤖' },
  { name: 'QA Engineer', question: 'Le résultat est-il fiable ?', focus: 'Qualité', href: '/roles/qa-engineer/', emoji: '✅' },
  { name: 'Tech Lead', question: 'Le système reste-t-il cohérent ?', focus: 'Architecture', href: '/roles/tech-lead/', emoji: '🏗️' },
];

export default function RoleCard() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
      {roles.map((role) => (
        <a key={role.name} href={role.href} style={{
          display: 'block', padding: '1.25rem', border: '1px solid var(--sl-color-gray-5)',
          borderRadius: '0.75rem', textDecoration: 'none', color: 'var(--sl-color-text)',
          transition: 'border-color 0.2s, transform 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--sl-color-accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--sl-color-gray-5)'; e.currentTarget.style.transform = 'none'; }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{role.emoji}</div>
          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{role.name}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--sl-color-gray-2)', marginBottom: '0.5rem' }}>{role.question}</div>
          <div style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'var(--sl-color-accent-low)', borderRadius: '1rem', display: 'inline-block' }}>{role.focus}</div>
        </a>
      ))}
    </div>
  );
}
