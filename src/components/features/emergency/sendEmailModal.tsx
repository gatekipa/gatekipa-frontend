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
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type SendEmailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: 'employee' | 'visitor';
};

const sendMailSchema = z.object({
  subject: z.string(),
  content: z.string(),
});

export type ISendMail = z.infer<typeof sendMailSchema>;

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

  const onSubmit = useCallback((values: ISendMail) => {}, []);

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
                      <Label id='employeeNo' className='text-xs'>
                        Email's Subject
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
                      <FormMessage />
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
                        Email's Content
                      </Label>
                      <FormControl>
                        <Textarea
                          id='content'
                          rows={12}
                          placeholder={`Please provide the content of the email`}
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
            </div>
            <DialogFooter>
              <LoadingButton
                loading={false}
                type='submit'
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
