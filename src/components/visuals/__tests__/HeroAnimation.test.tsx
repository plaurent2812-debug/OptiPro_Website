import { render } from '@testing-library/react';
import HeroAnimation from '@/components/visuals/HeroAnimation';

describe('HeroAnimation component', () => {
  it('renders without crashing', () => {
    const { container } = render(<HeroAnimation />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has aria-hidden for accessibility', () => {
    const { container } = render(<HeroAnimation />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the dashboard with audit title', () => {
    const { container } = render(<HeroAnimation />);
    expect(container.textContent).toContain('Audit OptiPro');
  });

  it('renders the score badge', () => {
    const { container } = render(<HeroAnimation />);
    expect(container.textContent).toContain('87');
    expect(container.textContent).toContain('Score Optimisation');
  });

  it('renders all four orbital nodes', () => {
    const { container } = render(<HeroAnimation />);
    expect(container.textContent).toContain('Outils');
    expect(container.textContent).toContain('Données');
    expect(container.textContent).toContain('Auto');
    expect(container.textContent).toContain('Process');
  });

  it('renders three metric rows', () => {
    const { container } = render(<HeroAnimation />);
    expect(container.textContent).toContain('72%');
    expect(container.textContent).toContain('89%');
    expect(container.textContent).toContain('64%');
  });
});
