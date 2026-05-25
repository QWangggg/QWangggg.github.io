import { getScenarioById } from './selectors';
import type { Skill } from './types';

export interface SkillSearchInput {
  query?: string;
  scenarioId?: string;
}

export interface SkillSearchResult {
  skill: Skill;
  reasons: string[];
}

function includesKeyword(values: string[], query: string) {
  const normalized = query.toLowerCase();
  return values.some((value) => value.toLowerCase().includes(normalized));
}

function toSearchText(skill: Skill) {
  return [
    skill.name,
    skill.oneLinePurpose,
    skill.problemSolved,
    skill.whenToUse,
    skill.sourcePath,
    ...skill.triggerKeywords,
    ...skill.triggerConditions,
    ...skill.inputRequirements,
    ...skill.relatedQueries,
  ]
    .join(' ')
    .toLowerCase();
}

export function searchSkills(
  skills: Skill[],
  input: SkillSearchInput,
): SkillSearchResult[] {
  const query = input.query?.trim() ?? '';
  const scenarioId = input.scenarioId?.trim() ?? '';
  const scenario = scenarioId ? getScenarioById(scenarioId) : undefined;

  return skills
    .filter((skill) => {
      const matchesScenario = scenarioId
        ? skill.applicableScenarios.includes(scenarioId)
        : true;

      if (!matchesScenario) {
        return false;
      }

      if (!query) {
        return true;
      }

      return toSearchText(skill).includes(query.toLowerCase());
    })
    .map((skill) => {
      const reasons: string[] = [];

      if (scenario && skill.applicableScenarios.includes(scenario.id)) {
        reasons.push(`命中场景：${scenario.label}`);
      }

      if (query) {
        if (includesKeyword(skill.triggerKeywords, query)) {
          reasons.push('命中触发关键词');
        }

        if (includesKeyword(skill.relatedQueries, query)) {
          reasons.push('命中相似问题');
        }

        if (!reasons.length) {
          reasons.push('命中用途与问题描述');
        }
      }

      return { skill, reasons };
    });
}
