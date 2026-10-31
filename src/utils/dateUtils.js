/**
 * Format date string into human-readable format
 * e.g., 'Oct 31, 2026' or 'Today' / 'Tomorrow' / 'Yesterday'
 */
export function formatDueDate(dateString) {
  if (!dateString) return null;

  try {
    const targetDate = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';

    const options = { month: 'short', day: 'numeric' };
    if (targetDate.getFullYear() !== today.getFullYear()) {
      options.year = 'numeric';
    }

    return targetDate.toLocaleDateString('en-US', options);
  } catch (err) {
    return dateString;
  }
}

/**
 * Check if a date is in the past (overdue)
 */
export function isOverdue(dateString, status) {
  if (!dateString || status === 'Completed') return false;
  try {
    const targetDate = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return targetDate.getTime() < today.getTime();
  } catch {
    return false;
  }
}

/**
 * Check if a date is today
 */
export function isDueToday(dateString, status) {
  if (!dateString || status === 'Completed') return false;
  try {
    const targetDate = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return targetDate.getTime() === today.getTime();
  } catch {
    return false;
  }
}
