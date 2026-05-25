import { SKILL_SCENARIOS } from './data';
import { loadSkills } from './storage';
import type { Skill, SkillDraft, SkillScenario } from './types';

export function getAllScenarios(): SkillScenario[] {
  return SKILL_SCENARIOS;
}

export function getAllSkills(): Skill[] {
  return loadSkills().sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export function getSkillById(skillId: string): Skill | undefined {
  return getAllSkills().find((skill) => skill.id === skillId || skill.slug === skillId);
}

export function getScenarioById(scenarioId: string): SkillScenario | undefined {
  return SKILL_SCENARIOS.find((scenario) => scenario.id === scenarioId);
}

export function buildSkillDraft(skill?: Skill): SkillDraft {
  return {
    id: skill?.id,
    name: skill?.name ?? '',
    oneLinePurpose: skill?.oneLinePurpose ?? '',
    problemSolved: skill?.problemSolved ?? '',
    whenToUse: skill?.whenToUse ?? '',
    applicableScenarios: skill?.applicableScenarios ?? [],
    triggerKeywords: skill?.triggerKeywords ?? [],
    triggerConditions: skill?.triggerConditions ?? [],
    inputRequirements: skill?.inputRequirements ?? [],
    usageMethod: skill?.usageMethod ?? [],
    expectedOutput: skill?.expectedOutput ?? [],
    sourcePath: skill?.sourcePath ?? '',
    relatedQueries: skill?.relatedQueries ?? [],
    historyNote: '',
  };
}
