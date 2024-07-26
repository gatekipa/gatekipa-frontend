import { createEmployeeThunk } from '@/app/features/employee/thunk';
import { useAppDispatch } from '@/app/hooks';
import LoadingButton from '@/components/shared/loadingButton';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { PopoverClose } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type CreateEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const createEmployeeFormSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  emailAddress: z.string().email(),
  mobileNo: z.string().min(11),
  designation: z.string().min(3),
  dateOfBirth: z.date(),
  shiftId: z.string(),
});

export type ICreateEmployeeForm = z.infer<typeof createEmployeeFormSchema>;

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const form = useForm<ICreateEmployeeForm>({
    resolver: zodResolver(createEmployeeFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      mobileNo: '',
      designation: '',
      dateOfBirth: new Date(),
      shiftId: '6698d88c8c92fa5f838408cc',
    },
  });

  const onSubmit = useCallback(async (values: ICreateEmployeeForm) => {
    try {
      await dispatch(createEmployeeThunk(values)).unwrap();
      form.reset();
      toast.success('Employee Created Successfully');
      onClose();
    } catch (error) {
      toast.error(`${error}`);
    }
  }, []);

  const loading = false;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Employee</DialogTitle>
          <DialogDescription className='text-xs'>
            You can create a new employee by filling the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <Label id='firstName' className='text-xs'>
                        First Name
                      </Label>
                      <FormControl>
                        <Input
                          id='firstName'
                          type='text'
                          placeholder='Please Enter First Name of the Employee'
                          autoComplete='off'
                          className='text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <Label id='lastName' className='text-xs'>
                        Last Name
                      </Label>
                      <FormControl>
                        <Input
                          id='lastName'
                          type='text'
                          placeholder='Please Enter Last Name of the Employee'
                          autoComplete='off'
                          className='text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <FormField
                  control={form.control}
                  name='emailAddress'
                  render={({ field }) => (
                    <FormItem>
                      <Label id='emailAddress' className='text-xs'>
                        Email Address
                      </Label>
                      <FormControl>
                        <Input
                          id='emailAddress'
                          type='email'
                          placeholder='Please Enter Email Address of the Employee'
                          autoComplete='off'
                          className='text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <FormField
                  control={form.control}
                  name='mobileNo'
                  render={({ field }) => (
                    <FormItem>
                      <Label id='mobileNo' className='text-xs'>
                        Mobile No
                      </Label>
                      <FormControl>
                        <Input
                          id='mobileNo'
                          type='text'
                          placeholder='Please Enter Mobile No of the Employee'
                          autoComplete='off'
                          className='text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <FormField
                  control={form.control}
                  name='designation'
                  render={({ field }) => (
                    <FormItem>
                      <Label id='designation' className='text-xs'>
                        Designation
                      </Label>
                      <FormControl>
                        <Input
                          id='designation'
                          type='text'
                          placeholder='Please Enter Designation of the Employee'
                          autoComplete='off'
                          className='text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <FormField
                  control={form.control}
                  name='dateOfBirth'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <Label className='text-xs'>Date of Birth</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'pl-3 text-left font-normal text-xs',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-full p-0' align='end'>
                          <PopoverClose>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverClose>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <LoadingButton
                  loading={loading}
                  type='submit'
                  className='w-full'
                />
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmployeeModal;