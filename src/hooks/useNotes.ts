import { useState, useEffect } from 'react';

const NOTES_KEY = 'n8n_mastery_notes_v1';

export function useNotes(lessonId: string) {
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      if (stored) {
        const notesObj = JSON.parse(stored);
        setNote(notesObj[lessonId] || '');
      }
    } catch (e) {
      console.error(e);
    }
  }, [lessonId]);

  const saveNote = (newNote: string) => {
    setNote(newNote);
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      const notesObj = stored ? JSON.parse(stored) : {};
      notesObj[lessonId] = newNote;
      localStorage.setItem(NOTES_KEY, JSON.stringify(notesObj));
    } catch (e) {
      console.error(e);
    }
  };

  return { note, saveNote };
}
