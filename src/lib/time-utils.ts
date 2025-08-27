/**
 * Time utilities for relative time display
 */

export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const targetDate = new Date(date);
  
  // UTC 기준으로 시간 계산
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);

  // 미래 날짜인 경우 (음수 값) 방금 전으로 표시
  if (diffInSeconds < 0) {
    return 'Posted just now';
  }

  if (diffInSeconds < 60) {
    return `Posted ${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    const unit = diffInMinutes === 1 ? 'minute' : 'minutes';
    return `Posted ${diffInMinutes} ${unit} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    const unit = diffInHours === 1 ? 'hour' : 'hours';
    return `Posted ${diffInHours} ${unit} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    const unit = diffInDays === 1 ? 'day' : 'days';
    return `Posted ${diffInDays} ${unit} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    const unit = diffInWeeks === 1 ? 'week' : 'weeks';
    return `Posted ${diffInWeeks} ${unit} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    const unit = diffInMonths === 1 ? 'month' : 'months';
    return `Posted ${diffInMonths} ${unit} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  const unit = diffInYears === 1 ? 'year' : 'years';
  return `Posted ${diffInYears} ${unit} ago`;
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}