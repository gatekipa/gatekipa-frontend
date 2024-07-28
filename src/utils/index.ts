function getUserInitials(): string {
  const user = JSON.parse(localStorage.getItem('userInfo')!);
  if (!user) return '';
  return `${user.data.firstName[0]}${user.data.lastName[0]}`;
}

function getUsername(): string {
  const user = JSON.parse(localStorage.getItem('userInfo')!);
  if (!user) return '';
  return `${user.data.firstName} ${user.data.lastName}`;
}

function getUserRole(): string {
  const user = JSON.parse(localStorage.getItem('userInfo')!);
  if (!user) return '';
  return user.data.userType;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}
function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export { getUserInitials, getUsername, getUserRole, formatDate, formatTime };
