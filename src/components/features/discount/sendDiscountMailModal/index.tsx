import { IDiscountedCompany } from "@/app/features/pricing/thunk";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SendDiscountMailModalProps = {
  open: boolean;
  onClose: () => void;
  discountedCompany: IDiscountedCompany;
};

const sendDiscountedMailSchema = z.object({
  subject: z.string(),
  message: z.string(),
});

export type ISendDiscountedMailForm = z.infer<typeof sendDiscountedMailSchema>;

const SendDiscountMailModal: React.FC<SendDiscountMailModalProps> = ({
  open,
  onClose,
  discountedCompany,
}) => {
  const form = useForm<ISendDiscountedMailForm>({
    resolver: zodResolver(sendDiscountedMailSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const onSubmitHandler = useCallback(() => {}, [discountedCompany]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Send Discount Mail to {discountedCompany.name}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <Label id="subject" className="text-xs">
                        Subject
                      </Label>
                      <FormControl>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="Please enter subject of the mail"
                          autoComplete="off"
                          className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <Label id="message" className="text-xs">
                        Message
                      </Label>
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder="Please enter message of the mail"
                          autoComplete="off"
                          className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SendDiscountMailModal;
