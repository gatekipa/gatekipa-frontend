import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { adminRoutes, visitorRoutes } from '../../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logout } from '../../../app/features/auth/slice';
import { getUsername, getUserRole } from '@/utils';
import { ThemeProvider } from '@/components/providers/theme';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import logo from '../../../assets/logo.svg';
import { Card, CardContent } from '@/components/ui/card';
import { ModeToggle } from '@/components/shared/themeToggle';
import { ChevronDownIcon, ChevronUpIcon, KeyRound, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');

    if (!user && !userInfo) {
      navigate('/auth/login');
    }
  }, [user]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/auth/login');
  }, []);

  const routes = useMemo(
    () => (user?.userType === 'VISITOR' ? visitorRoutes : adminRoutes),
    [user]
  );

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='flex h-screen flex-col'>
        <Menubar className='flex items-center py-7 px-3 rounded-none md:justify-between'>
          <MenubarMenu>
            <div className='flex items-center'>
              <Link
                to='/dashboard'
                className='flex items-center space-x-2 px-4'
              >
                <img src={logo} alt='logo' className='w-8 h-8' />
                <span className='text-xl font-extrabold tracking-wide'>
                  GateKipa
                </span>
              </Link>

              <Badge
                variant='destructive'
                className='hidden uppercase md:block'
              >
                {getUserRole()}
              </Badge>
            </div>
          </MenubarMenu>
          <div className='flex gap-x-2 ml-auto'>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <div
                    className='flex gap-x-2 items-center'
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                  >
                    {getUsername()}
                    {!isMenuOpen ? (
                      <ChevronDownIcon className='w-4 h-4' />
                    ) : (
                      <ChevronUpIcon className='w-4 h-4' />
                    )}
                  </div>
                </MenubarTrigger>
                <MenubarContent>
                  <Link to='change-password'>
                    <MenubarItem>
                      <KeyRound size={15} className='mr-2' />
                      Change Password
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <MenubarItem onClick={handleLogout}>
                    <LogOut size={15} className='mr-2' />
                    Logout
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <ModeToggle />
          </div>
        </Menubar>
        <div className='flex-1 grid grid-cols-1 md:grid-cols-6'>
          <Card className='col-span-1 py-4 rounded-none'>
            <CardContent>
              <aside>
                {routes.map((route) => (
                  <NavLink
                    key={route.href}
                    to={route.href}
                    end
                    className={({ isActive }) =>
                      `flex gap-x-2 py-2.5 text-sm rounded transition duration-200 ${
                        isActive
                          ? 'underline underline-offset-4 font-semibold'
                          : ''
                      }`
                    }
                  >
                    {route.icon}
                    <span className='transition-all duration-300 ease-in-out hover:underline hover:underline-offset-4'>
                      {' '}
                      {route.label}
                    </span>
                  </NavLink>
                ))}
              </aside>
            </CardContent>
          </Card>
          <main className='col-span-5 overflow-x-hidden overflow-y-auto'>
            <div className='container mx-auto px-6 py-8'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;
