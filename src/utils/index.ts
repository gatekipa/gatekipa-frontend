function getUserInitials(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return `${user.firstName[0]}${user.lastName[0]}`;
}

function getUsername(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return `${user.firstName} ${user.lastName}`;
}

export { getUserInitials, getUsername };
