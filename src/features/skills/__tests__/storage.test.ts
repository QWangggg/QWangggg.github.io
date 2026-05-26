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

  it('normalizes malformed persisted records instead of returning unsafe shapes', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'broken-skill',
          name: 'Broken Skill',
          history: [{}],
          triggerKeywords: 'not-an-array',
          inputRequirements: null,
        },
      ]),
    );

    const skills = loadSkills();
    const restored = skills.find((skill) => skill.id === 'broken-skill');

    expect(restored).toBeTruthy();
    expect(restored?.triggerKeywords).toEqual([]);
    expect(restored?.inputRequirements).toEqual([]);
    expect(restored?.history).toEqual([]);
    expect(Array.isArray(restored?.applicableScenarios)).toBe(true);
  });

  it('falls back to seed skills when persisted records are unusable', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([{ foo: 'bar' }]));

    const skills = loadSkills();

    expect(skills.length).toBeGreaterThan(0);
    expect(skills[0].name).toBeTruthy();
    expect(skills.some((skill) => skill.id === 'frontend-bug-triage')).toBe(
      true,
    );
  });
});
