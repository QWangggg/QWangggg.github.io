import { DEFAULT_SKILLS } from './data';
import type { Skill, SkillDraft, SkillHistoryEntry } from './types';

const STORAGE_KEY = 'ai-coding-skill-workflow-platform.skills';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function cloneSeedSkills() {
  return DEFAULT_SKILLS.map((skill) => ({
    ...skill,
    applicableScenarios: [...skill.applicableScenarios],
    triggerKeywords: [...skill.triggerKeywords],
    triggerConditions: [...skill.triggerConditions],
    inputRequirements: [...skill.inputRequirements],
    usageMethod: [...skill.usageMethod],
    expectedOutput: [...skill.expectedOutput],
    relatedQueries: [...skill.relatedQueries],
    history: skill.history.map((entry) => ({ ...entry })),
  }));
}

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createHistoryEntry(note: string): SkillHistoryEntry {
  const now = new Date().toISOString();

  return {
    id: `history-${Date.now()}`,
    title: '手动更新记录',
    note,
    outcome: 'updated',
    createdAt: now,
  };
}

export function loadSkills(): Skill[] {
  if (!isBrowser()) {
    return cloneSeedSkills();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      const seeded = cloneSeedSkills();
      saveSkills(seeded);
      return seeded;
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error('Skill storage payload is invalid.');
    }

    return parsed;
  } catch (error) {
    const seeded = cloneSeedSkills();
    saveSkills(seeded);
    return seeded;
  }
}

export function saveSkills(skills: Skill[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
}

export function upsertSkill(draft: SkillDraft): Skill {
  const skills = loadSkills();
  const now = new Date().toISOString();
  const existing = draft.id ? skills.find((skill) => skill.id === draft.id) : undefined;
  const slug = existing?.slug ?? toSlug(draft.name);
  const history = existing ? [...existing.history] : [];

  if (draft.historyNote?.trim()) {
    history.unshift(createHistoryEntry(draft.historyNote.trim()));
  }

  const nextSkill: Skill = {
    id: existing?.id ?? `skill-${Date.now()}`,
    slug,
    name: draft.name.trim(),
    oneLinePurpose: draft.oneLinePurpose.trim(),
    problemSolved: draft.problemSolved.trim(),
    whenToUse: draft.whenToUse.trim(),
    applicableScenarios: [...draft.applicableScenarios],
    triggerKeywords: [...draft.triggerKeywords],
    triggerConditions: [...draft.triggerConditions],
    inputRequirements: [...draft.inputRequirements],
    usageMethod: [...draft.usageMethod],
    expectedOutput: [...draft.expectedOutput],
    sourcePath: draft.sourcePath.trim(),
    relatedQueries: [...draft.relatedQueries],
    history,
    updatedAt: now,
  };

  const nextSkills = existing
    ? skills.map((skill) => (skill.id === existing.id ? nextSkill : skill))
    : [nextSkill, ...skills];

  saveSkills(nextSkills);

  return nextSkill;
}
