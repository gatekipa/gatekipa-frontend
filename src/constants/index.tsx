import { UserRole } from "./enums";
import {
  adminRoutes,
  employeeRoutes,
  Route,
  superAdminRoutes,
  visitorRoutes,
} from "./routes";

export const mappedRoutes: { [key in UserRole]: Route[] } = {
  [UserRole.ADMIN]: adminRoutes,
  [UserRole.EMPLOYEE]: employeeRoutes,
  [UserRole.VISITOR]: visitorRoutes,
  [UserRole.SUPER_ADMIN]: superAdminRoutes,
};
