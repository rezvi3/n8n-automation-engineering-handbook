import { Stage, Module, Lesson } from '../../types/curriculum';
import { stage0 } from './stage0';
import { stage1 } from './stage1';
import { stage2 } from './stage2';
import { stage3 } from './stage3';
import { stage4 } from './stage4';
import { stage5 } from './stage5';
import { stage6 } from './stage6';
import { stage7 } from './stage7';

export const stages: Stage[] = [
  stage0,
  stage1,
  stage2,
  stage3,
  stage4,
  stage5,
  stage6,
  stage7
];

export const allModules: Module[] = stages.flatMap(s => s.modules);

export const allLessons: Lesson[] = allModules.flatMap(m => m.lessons);

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find(l => l.id === id);
}

export function getModuleById(id: string): Module | undefined {
  return allModules.find(m => m.id === id);
}

export function getStageById(id: string): Stage | undefined {
  return stages.find(s => s.id === id);
}

export function getAdjacentLessons(currentId: string): { prevLesson?: Lesson; nextLesson?: Lesson } {
  const index = allLessons.findIndex(l => l.id === currentId);
  if (index === -1) return {};
  return {
    prevLesson: index > 0 ? allLessons[index - 1] : undefined,
    nextLesson: index < allLessons.length - 1 ? allLessons[index + 1] : undefined
  };
}

export function searchCurriculum(query: string): Lesson[] {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  return allLessons.filter(l => 
    l.title.toLowerCase().includes(q) ||
    l.subtitle.toLowerCase().includes(q) ||
    l.whyItMatters.toLowerCase().includes(q) ||
    l.technicalDetails.toLowerCase().includes(q) ||
    l.keyTakeaways.some(t => t.toLowerCase().includes(q))
  );
}
