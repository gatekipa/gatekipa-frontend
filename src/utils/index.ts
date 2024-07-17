function getUserInitials(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return `${user.data.firstName[0]}${user.data.lastName[0]}`;
}

function getUsername(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return `${user.data.firstName} ${user.data.lastName}`;
}

function getUserRole(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return user.data.userType;
}

export { getUserInitials, getUsername, getUserRole };
