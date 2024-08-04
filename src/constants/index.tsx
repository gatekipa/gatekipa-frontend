import { UserRole } from './enums';
import { adminRoutes, employeeRoutes, Route, visitorRoutes } from './routes';

export const mappedRoutes: { [key in UserRole]: Route[] } = {
  [UserRole.ADMIN]: adminRoutes,
  [UserRole.EMPLOYEE]: employeeRoutes,
  [UserRole.VISITOR]: visitorRoutes,
};
