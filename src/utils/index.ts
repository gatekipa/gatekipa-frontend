import { IUserPlan } from "@/app/features/auth/thunk";
import { UserRole } from "@/constants/enums";

function getUserInitials(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return `${user.data.firstName[0]}${user.data.lastName[0]}`;
}

function getCompany(): string {
  const company = JSON.parse(localStorage.getItem("userInfo")!);
  if (!company) return "";
  return company.data.planInfo?.name;
}

function getCompanyId(): string {
  const company = JSON.parse(localStorage.getItem("userInfo")!);
  if (!company) return "";
  return company.data?.companyId ?? "";
}

function getCompanyInfo(): any {
  const company = JSON.parse(localStorage.getItem("userInfo")!);
  if (!company) return "";
  return company.data.planInfo ?? {};
}

function getUsername(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";

  const firstName = user.data.firstName || user.data.ownerFirstName;
  const lastName = user.data.lastName || user.data.ownerLastName;

  return `${firstName} ${lastName}`;
}

function getUserRole(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return user.data.userType ?? UserRole.ADMIN;
}

function getUserEmployeeId(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return user.data.employeeId;
}

function getUserVisitorId(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return user.data.visitorId;
}

function getUserPlan(): IUserPlan | null {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return null;

  return user.data.planInfo;
}

function getCompanyPlan(): IUserPlan | null {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return null;

  return user.data.planInfo;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function isMultiFactorAuthEnabled() {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return false;
  return user.data.isMultiFactorAuthEnabled;
}

export {
  getUserInitials,
  getUsername,
  getUserRole,
  formatDate,
  formatTime,
  getUserEmployeeId,
  getUserVisitorId,
  getUserPlan,
  getCompanyPlan,
  getCompany,
  getCompanyInfo,
  getCompanyId,
  isMultiFactorAuthEnabled,
};
