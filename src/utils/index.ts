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
  return company?.planInfo?.name;
}

function getCompanyId(): string {
  const company = JSON.parse(localStorage.getItem("userInfo")!);
  if (!company) return "";
  return company?.companyId?.id ?? "";
}

function getCompanyInfo(): any {
  const company = JSON.parse(localStorage.getItem("userInfo")!);
  if (!company) return "";
  return company.planInfo ?? {};
}

function getUsername(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";

  const firstName = user.firstName || user.ownerFirstName;
  const lastName = user.lastName || user.ownerLastName;

  return `${firstName} ${lastName}`;
}

function getUserRole(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return user.userType ?? UserRole.ADMIN;
}

function getUserEmployeeId(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return user?.employeeId ?? "";
}

function getUserVisitorId(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return user.visitorId ?? "";
}

function getUserPlan(): IUserPlan | null {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return null;

  return user.planInfo;
}

function getCompanySubscriptionStatus(): boolean {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return false;

  return user?.companyId?.isSubscriptionActive || false;
}

function getCompanyPlan(): IUserPlan | null {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return null;

  return user.planInfo;
}

function getUserEmail(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return ``;

  return user.emailAddress;
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

function formatDateInWords(date: Date): string {
  const timestamp = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return timestamp.split("at")[0];
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
  return user.isMultiFactorAuthEnabled;
}

function getUserPlanId(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return user.companyId?.plan?.id ?? "";
}

function getNextPaymentDate(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return user?.companyId?.nextPaymentDate ?? "";
}

function getLastPaymentDate(): string {
  const user = JSON.parse(localStorage.getItem("userInfo")!);
  if (!user) return "";
  return user?.companyId?.lastPaymentDate ?? "";
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
  getUserEmail,
  getUserPlanId,
  getCompanySubscriptionStatus,
  getNextPaymentDate,
  getLastPaymentDate,
  formatDateInWords,
};
