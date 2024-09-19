import { createDiscount, editDiscount } from "@/app/features/pricing/thunk";
import { useAppDispatch } from "@/app/hooks";
import LoadingButton from "@/components/shared/loadingButton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

type CreateDiscountModalProps = {
  open: boolean;
  onClose: () => void;
  discount?: any;
};

export enum DiscountType {
  FLAT = "FLAT",
  PERCENTAGE = "PERCENTAGE",
}

const discountSchema = z.object({
  code: z.string(),
  maxNoUsage: z.preprocess((val) => Number(val), z.number()),
  discountValue: z.preprocess((val) => Number(val), z.number()),
  discountType: z.nativeEnum(DiscountType),
  isActive: z.boolean(),
  expiryDate: z.string(),
});

export type IDiscount = z.infer<typeof discountSchema>;

export type IDiscountWithId = IDiscount & { id: string };

const CreateDiscountModal: React.FC<CreateDiscountModalProps> = ({
  open,
  onClose,
  discount,
}) => {
  const dispatch = useAppDispatch();

  const form = useForm<IDiscount>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      code: discount?.code || "",
      maxNoUsage: discount?.maxNoUsage || 0,
      discountValue: discount?.discountValue || 0,
      discountType: discount?.discountType || DiscountType.FLAT,
      isActive: discount?.isActive || true,
      expiryDate: discount?.expiryDate || new Date(),
    },
  });

  const onSubmit = useCallback(
    async (data: IDiscount) => {
      try {
        if (!discount) {
          const _expiryDate = new Date(data.expiryDate);
          await dispatch(
            createDiscount({ ...data, expiryDate: _expiryDate.toString() })
          ).unwrap();
        } else {
          await dispatch(editDiscount({ ...discount, ...data })).unwrap();
        }

        toast.success(
          `${discount ? "Discount Updated" : "Discount Created"} Successfully!`
        );

        form.reset();
        onClose();
      } catch (error) {
        toast.error(error as string);
      }
    },
    [discount]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          onClose();
        }
      }}
    >
      <DialogContent className="md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {!!discount ? "Edit Discount" : "Create New Discount"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {!!discount
              ? "You can edit discount details in the form below."
              : "You can create a new discount by filling the form below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex gap-x-2 w-full">
                <div className="flex w-1/2 flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="code" className="text-xs">
                          Code
                        </Label>
                        <FormControl>
                          <Input
                            id="code"
                            type="text"
                            placeholder="Please Enter Code for Discount"
                            autoComplete="off"
                            className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-xs"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-1/2 flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="discountValue"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="discountValue" className="text-xs">
                          Discount Value
                        </Label>
                        <FormControl>
                          <Input
                            id="discountValue"
                            type="number"
                            min={0}
                            placeholder="Please Enter Discount Value"
                            autoComplete="off"
                            className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-x-2 w-full">
                <div className="flex w-1/2 flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="maxNoUsage"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="maxNoUsage" className="text-xs">
                          Max No Usage
                        </Label>
                        <FormControl>
                          <Input
                            id="maxNoUsage"
                            type="number"
                            min={0}
                            placeholder="Please Enter Max No Usage"
                            autoComplete="off"
                            className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-1/2 flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="discountType"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="discountType" className="text-xs">
                          Discount Type
                        </Label>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Please Select Discount Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(DiscountType).map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <Label id="expiryDate" className="text-xs">
                        Expiry Date
                      </Label>
                      <FormControl>
                        <Input
                          id="expiryDate"
                          type="date"
                          placeholder="Please Enter Expiry Date"
                          autoComplete="off"
                          className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label id="active" className="text-xs -translate-y-1">
                        Active
                      </Label>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <LoadingButton
                  loading={false}
                  type="submit"
                  className="w-full"
                />
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDiscountModal;
