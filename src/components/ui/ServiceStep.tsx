import { ServiceStep as ServiceStepType } from '@/data/services';

interface Props {
  step: ServiceStepType;
  detailed?: boolean;
}

export default function ServiceStep({ step, detailed = false }: Props) {
  return (
    <div className="timeline-step">
      <div className="timeline-number">{step.number}</div>
      <div className="timeline-content">
        <h3>
          {step.icon} {step.title}
        </h3>
        <p>{detailed ? step.longDescription : step.shortDescription}</p>
        {detailed && step.deliverables.length > 0 && (
          <ul className="timeline-deliverables">
            {step.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}
        {step.note && <span className="timeline-note">{step.note}</span>}
      </div>
    </div>
  );
}
