export interface SkillHistoryEntry {
  id: string;
  title: string;
  note?: string;
  outcome?: 'verified' | 'draft' | 'updated';
  createdAt: string;
}

export interface SkillScenario {
  id: string;
  label: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  oneLinePurpose: string;
  problemSolved: string;
  whenToUse: string;
  applicableScenarios: string[];
  triggerKeywords: string[];
  triggerConditions: string[];
  inputRequirements: string[];
  usageMethod: string[];
  expectedOutput: string[];
  sourcePath: string;
  relatedQueries: string[];
  history: SkillHistoryEntry[];
  updatedAt: string;
}

export interface SkillDraft {
  id?: string;
  name: string;
  oneLinePurpose: string;
  problemSolved: string;
  whenToUse: string;
  applicableScenarios: string[];
  triggerKeywords: string[];
  triggerConditions: string[];
  inputRequirements: string[];
  usageMethod: string[];
  expectedOutput: string[];
  sourcePath: string;
  relatedQueries: string[];
  historyNote?: string;
}
