import { loadSkills, upsertSkill } from '../storage';

const STORAGE_KEY = 'ai-coding-skill-workflow-platform.skills';

describe('skill storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('hydrates seed data on first load', () => {
    const skills = loadSkills();

    expect(skills.length).toBeGreaterThan(0);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeTruthy();
  });

  it('persists new skills to localStorage', () => {
    const created = upsertSkill({
      name: 'Test Skill',
      oneLinePurpose: 'Validate create flow',
      problemSolved: 'Verify local persistence works.',
      whenToUse: 'When checking the create-skill workflow.',
      applicableScenarios: ['skill-capture'],
      triggerKeywords: ['test', 'persistence'],
      triggerConditions: ['Need to create a new skill card'],
      inputRequirements: ['Skill name'],
      usageMethod: ['Fill in the form and save'],
      expectedOutput: ['The new skill appears in results'],
      sourcePath: 'skills/test.md',
      relatedQueries: ['test skill creation'],
      historyNote: 'first creation note',
    });

    const skills = loadSkills();
    const saved = skills.find((skill) => skill.id === created.id);

    expect(saved).toBeTruthy();
    expect(saved?.history[0].note).toContain('first creation note');
  });
});
