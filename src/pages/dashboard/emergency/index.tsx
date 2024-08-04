import React, { useState } from 'react';
import { MailIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ToolTip from '@/components/shared/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useEmergencyReports from '@/hooks/emergency';
import PaginatedTable from '@/components/shared/paginatedTable';
import { ColumnDef } from '@tanstack/react-table';
import {
  IEmergencyEmployeeReport,
  IEmergencyVisitorReport,
} from '@/app/features/employee/thunk';
import ColumnHeader from '@/components/shared/columnHeader';
import { formatDate } from '@/utils';
import SendEmailModal from '@/components/features/emergency/sendEmailModal';

export const columns: ColumnDef<IEmergencyEmployeeReport>[] = [
  {
    accessorKey: 'employee.firstName',
    header: ({ column }) => <ColumnHeader column={column} label='First Name' />,
    enableSorting: true,
  },
  {
    accessorKey: 'employee.lastName',
    header: ({ column }) => <ColumnHeader column={column} label='Last Name' />,
    enableSorting: true,
  },
  {
    accessorKey: 'employee.emailAddress',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Email Address' />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'employee.mobileNo',
    header: ({ column }) => <ColumnHeader column={column} label='Mobile No' />,
    enableSorting: true,
  },
  {
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Check In Time' />
    ),
    cell: ({ row }) => `${formatDate(new Date(row.original.checkInTime))}`,
    enableSorting: true,
  },
];

export const visitorColumns: ColumnDef<IEmergencyVisitorReport>[] = [
  {
    accessorKey: 'visitor.firstName',
    header: ({ column }) => <ColumnHeader column={column} label='First Name' />,
    enableSorting: true,
  },
  {
    accessorKey: 'visitor.lastName',
    header: ({ column }) => <ColumnHeader column={column} label='Last Name' />,
    enableSorting: true,
  },
  {
    accessorKey: 'visitor.emailAddress',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Email Address' />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'visitor.mobileNo',
    header: ({ column }) => <ColumnHeader column={column} label='Mobile No' />,
    enableSorting: true,
  },
  {
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Check In Time' />
    ),
    cell: ({ row }) => `${formatDate(new Date(row.original.checkInTime))}`,
    enableSorting: true,
  },
];

export enum EmergencyTab {
  EMPLOYEES = 'employee',
  VISITORS = 'visitor',
}

const EmergencyPage: React.FC = () => {
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [tab, setTab] = useState<EmergencyTab>(EmergencyTab.EMPLOYEES);
  const { emergency, loading } = useEmergencyReports(tab);

  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center mt-8'>
          <h2 className='text-2xl font-semibold'>Emergency</h2>
          <ToolTip title='Send Email'>
            <Button className='text-xs' onClick={() => setOpenEmailModal(true)}>
              <MailIcon size={16} className='mr-2' />
              Send Email
            </Button>
          </ToolTip>
        </div>
      </CardContent>
      <div>
        <div className='mx-5'>
          <Tabs
            defaultValue={EmergencyTab.EMPLOYEES}
            className=''
            onValueChange={(value) => {
              setTab(value as EmergencyTab);
            }}
          >
            <TabsList className='grid w-max grid-cols-2'>
              <TabsTrigger value={EmergencyTab.EMPLOYEES}>
                Employees
              </TabsTrigger>
              <TabsTrigger value={EmergencyTab.VISITORS}>Visitors</TabsTrigger>
            </TabsList>
            <TabsContent value={EmergencyTab.EMPLOYEES}>
              {loading ? (
                <p>Loading</p>
              ) : (
                <PaginatedTable data={emergency.employee} columns={columns} />
              )}
            </TabsContent>
            <TabsContent value={EmergencyTab.VISITORS}>
              {loading ? (
                <p>Loading</p>
              ) : (
                <PaginatedTable
                  data={emergency.visitor}
                  columns={visitorColumns}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
        {openEmailModal && (
          <SendEmailModal
            isOpen={openEmailModal}
            onClose={() => setOpenEmailModal(false)}
            type={tab}
          />
        )}
      </div>
    </Card>
  );
};

export default EmergencyPage;
