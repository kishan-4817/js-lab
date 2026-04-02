const STORAGE_KEY = 'jslab_progress';

const defaultState = {
  completedLessons: [],
  xp: 0,
  streak: 0,
  lastActive: null,
  unlockedSections: ['basics'],
};

export function getProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultState, ...JSON.parse(saved) } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markLessonComplete(sectionId, lessonId, xpEarned) {
  const progress = getProgress();
  const key = `${sectionId}:${lessonId}`;
  if (!progress.completedLessons.includes(key)) {
    progress.completedLessons.push(key);
    progress.xp += xpEarned;
  }
  const today = new Date().toDateString();
  if (progress.lastActive !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    progress.streak = progress.lastActive === yesterday ? progress.streak + 1 : 1;
    progress.lastActive = today;
  }
  saveProgress(progress);
  return progress;
}

export function isLessonComplete(sectionId, lessonId) {
  const progress = getProgress();
  return progress.completedLessons.includes(`${sectionId}:${lessonId}`);
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
