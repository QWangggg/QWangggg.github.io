import { DEFAULT_SKILLS } from './data';
import type { Skill, SkillDraft, SkillHistoryEntry } from './types';

const STORAGE_KEY = 'ai-coding-skill-workflow-platform.skills';
const VALID_HISTORY_OUTCOMES = new Set(['verified', 'draft', 'updated']);

function isBrowser() {
  return (
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  );
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

function safeString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function safeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => safeString(item)).filter(Boolean);
}

function normalizeHistoryEntry(
  value: unknown,
  index: number,
): SkillHistoryEntry | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const item = value as Partial<SkillHistoryEntry>;
  const title = safeString(item.title);

  if (!title) {
    return null;
  }

  const createdAt = safeString(item.createdAt) || new Date(0).toISOString();
  const outcome = safeString(item.outcome);

  return {
    id: safeString(item.id) || `history-restored-${index}`,
    title,
    note: safeString(item.note) || undefined,
    outcome: VALID_HISTORY_OUTCOMES.has(outcome)
      ? (outcome as SkillHistoryEntry['outcome'])
      : undefined,
    createdAt,
  };
}

function normalizeSkill(value: unknown, fallbackSkill: Skill): Skill | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const item = value as Partial<Skill>;
  const id = safeString(item.id);
  const name = safeString(item.name);

  if (!id || !name) {
    return null;
  }

  const history = Array.isArray(item.history)
    ? item.history
        .map((historyItem, index) => normalizeHistoryEntry(historyItem, index))
        .filter((historyItem): historyItem is SkillHistoryEntry =>
          Boolean(historyItem),
        )
    : [];

  return {
    id,
    slug: safeString(item.slug) || toSlug(name),
    name,
    oneLinePurpose: safeString(item.oneLinePurpose),
    problemSolved: safeString(item.problemSolved),
    whenToUse: safeString(item.whenToUse),
    applicableScenarios: safeStringArray(item.applicableScenarios),
    triggerKeywords: safeStringArray(item.triggerKeywords),
    triggerConditions: safeStringArray(item.triggerConditions),
    inputRequirements: safeStringArray(item.inputRequirements),
    usageMethod: safeStringArray(item.usageMethod),
    expectedOutput: safeStringArray(item.expectedOutput),
    sourcePath: safeString(item.sourcePath),
    relatedQueries: safeStringArray(item.relatedQueries),
    history,
    updatedAt: safeString(item.updatedAt) || fallbackSkill.updatedAt,
  };
}

function normalizeSkills(rawSkills: unknown[]) {
  const seedSkills = cloneSeedSkills();
  const normalized = rawSkills
    .map((skill, index) =>
      normalizeSkill(skill, seedSkills[index] ?? seedSkills[0]),
    )
    .filter((skill): skill is Skill => Boolean(skill));

  return normalized.length ? normalized : seedSkills;
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

    const normalized = normalizeSkills(parsed);

    saveSkills(normalized);

    return normalized;
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
  const existing = draft.id
    ? skills.find((skill) => skill.id === draft.id)
    : undefined;
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
