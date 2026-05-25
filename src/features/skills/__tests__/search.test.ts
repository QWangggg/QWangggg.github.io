import { DEFAULT_SKILLS } from '../data';
import { searchSkills } from '../search';

describe('searchSkills', () => {
  it('returns results for a free-form query', () => {
    const results = searchSkills(DEFAULT_SKILLS, { query: 'node-sass' });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].skill.id).toBe('frontend-bug-triage');
    expect(results[0].reasons).toContain('命中相似问题');
  });

  it('supports scenario filtering with multi-scenario skills', () => {
    const results = searchSkills(DEFAULT_SKILLS, { scenarioId: 'code-review' });

    expect(results).toHaveLength(1);
    expect(results[0].skill.id).toBe('frontend-bug-triage');
    expect(results[0].reasons).toContain('命中场景：代码审查');
  });

  it('supports combined query and scenario filters', () => {
    const results = searchSkills(DEFAULT_SKILLS, {
      query: 'React',
      scenarioId: 'project-bootstrap',
    });

    expect(results).toHaveLength(1);
    expect(results[0].skill.id).toBe('project-bootstrap-react');
  });
});
