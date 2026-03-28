import { Project } from '@/data/projects';

interface Props {
  project: Project;
  compact?: boolean;
}

export default function ProjectCard({ project, compact = false }: Props) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3>{project.title}</h3>
        <p className="project-card-meta">
          {project.client} · {project.sector}
        </p>
      </div>

      <div className="project-card-body">
        <div className="project-card-section">
          <h4>Contexte</h4>
          <p>{project.context}</p>
        </div>
        <div className="project-card-section">
          <h4>{compact ? 'Solution' : 'Problème'}</h4>
          <p>{compact ? project.solution : project.problem}</p>
        </div>
        {!compact && (
          <div className="project-card-section">
            <h4>Solution</h4>
            <p>{project.solution}</p>
          </div>
        )}
      </div>

      <div className="project-card-results">
        <h4>Résultats</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {project.results.map((r) => (
            <li
              key={r}
              style={{
                paddingLeft: '1.5rem',
                position: 'relative',
                color: 'var(--secondary)',
                marginBottom: '0.25rem',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: 'var(--accent)',
                  fontWeight: 700,
                }}
              >
                →
              </span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="project-card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-card-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
