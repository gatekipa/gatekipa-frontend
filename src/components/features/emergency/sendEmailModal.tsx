import { sendEmergencyEmail } from '@/app/features/employee/thunk';
import { useAppDispatch } from '@/app/hooks';
import LoadingButton from '@/components/shared/loadingButton';
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
import { Textarea } from '@/components/ui/textarea';
import { EmergencyTab } from '@/pages/dashboard/emergency';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type SendEmailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: EmergencyTab;
};

const sendMailSchema = z.object({
  subject: z.string(),
  content: z.string(),
});

export type ISendMail = z.infer<typeof sendMailSchema>;

const placholder = `Dear Team,

This is an urgent notification requiring your immediate attention and action. An emergency situation has arisen, and all employees must evacuate the building immediately.

Please follow the established emergency exit routes and proceed to the designated assembly points as quickly and safely as possible.

Do not use the elevators. If you encounter any obstacles or need assistance, alert the nearest emergency personnel.

Your safety is our utmost priority. Please remain calm and follow all instructions from emergency responders.

Thank you for your cooperation.

Sincerely,`;

const SendEmailModal: React.FC<SendEmailModalProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  const form = useForm<ISendMail>({
    resolver: zodResolver(sendMailSchema),
    defaultValues: {
      subject: '',
      content: '',
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (values: ISendMail) => {
      try {
        await dispatch(sendEmergencyEmail({ ...values, type })).unwrap();
        toast.success('Email has been sent successfully');
        onClose();
      } catch (error) {
        toast.error(`${error}`);
      }
    },
    [type]
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Send Emergency Email</DialogTitle>
          <DialogDescription className='text-xs'>
            You can send email for emergency circumstances.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <FormField
                  control={form.control}
                  name='subject'
                  render={({ field }) => (
                    <FormItem>
                      <Label id='subject' className='text-xs'>
                        Subject
                      </Label>
                      <FormControl>
                        <Input
                          id='subject'
                          type='text'
                          placeholder={`Please provide the subject of the email`}
                          autoComplete='off'
                          className='text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <Label id='employeeNo' className='text-xs'>
                        Content
                      </Label>
                      <FormControl>
                        <Textarea
                          id='content'
                          rows={20}
                          placeholder={placholder}
                          autoComplete='off'
                          className='text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <LoadingButton
                loading={false}
                type='submit'
                label='Send Email'
                disabled={!form.formState.isValid}
                className='w-full mt-4'
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SendEmailModal;
