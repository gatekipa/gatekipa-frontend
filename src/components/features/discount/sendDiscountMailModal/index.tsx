import {
  IDiscountedCompany,
  sendDiscountMail,
} from "@/app/features/pricing/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type SendDiscountMailModalProps = {
  open: boolean;
  onClose: () => void;
  discountedCompany: IDiscountedCompany;
};

const sendDiscountedMailSchema = z.object({
  email: z.string(),
  discountId: z.string(),
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
      email: discountedCompany.emailAddress ?? "",
      discountId: "",
    },
  });
  const dispatch = useAppDispatch();

  const { activeDiscounts } = useAppSelector((state) => state.pricing);

  const onSubmitHandler = useCallback(
    async (values: ISendDiscountedMailForm) => {
      try {
        await dispatch(sendDiscountMail(values)).unwrap();
        toast.success("Discount mail sent successfully");
        form.reset();
        onClose();
      } catch (error) {
        toast.error(error as string);
      }
    },
    [discountedCompany]
  );

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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label id="email" className="text-xs">
                        Email
                      </Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="text"
                          disabled
                          placeholder="Please enter email address"
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
                  name="discountId"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs">Discount</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                            <SelectValue placeholder="Please select discount you want to apply" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activeDiscounts.map((company) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Send</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SendDiscountMailModal;
