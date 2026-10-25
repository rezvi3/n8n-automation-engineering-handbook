import { useState, useEffect } from 'react';
import { allLessons } from '../data/curriculum';

interface ProgressState {
  completedLessons: string[];
  bookmarkedLessons: string[];
  lastVisitedLessonId: string;
  quizScores: Record<string, number>;
}

const STORAGE_KEY = 'n8n_mastery_progress_v1';

const defaultState: ProgressState = {
  completedLessons: [],
  bookmarkedLessons: [],
  lastVisitedLessonId: allLessons[0]?.id || 'lesson-0-1',
  quizScores: {}
};

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultState, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [state]);

  const toggleComplete = (lessonId: string) => {
    setState(prev => {
      const completed = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: completed };
    });
  };

  const toggleBookmark = (lessonId: string) => {
    setState(prev => {
      const bookmarked = prev.bookmarkedLessons.includes(lessonId)
        ? prev.bookmarkedLessons.filter(id => id !== lessonId)
        : [...prev.bookmarkedLessons, lessonId];
      return { ...prev, bookmarkedLessons: bookmarked };
    });
  };

  const setLastVisited = (lessonId: string) => {
    setState(prev => ({ ...prev, lastVisitedLessonId: lessonId }));
  };

  const recordQuizScore = (quizId: string, score: number) => {
    setState(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [quizId]: score }
    }));
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress, bookmarks, and quiz scores? This cannot be undone.')) {
      setState(defaultState);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const progressPercentage = Math.round(
    (state.completedLessons.length / Math.max(1, allLessons.length)) * 100
  );

  return {
    completedLessons: state.completedLessons,
    bookmarkedLessons: state.bookmarkedLessons,
    lastVisitedLessonId: state.lastVisitedLessonId,
    quizScores: state.quizScores,
    isCompleted: (id: string) => state.completedLessons.includes(id),
    isBookmarked: (id: string) => state.bookmarkedLessons.includes(id),
    toggleComplete,
    toggleBookmark,
    setLastVisited,
    recordQuizScore,
    resetProgress,
    progressPercentage,
    totalLessons: allLessons.length
  };
}
