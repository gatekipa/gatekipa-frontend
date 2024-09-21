import { createShiftThunk } from "@/app/features/employee/thunk";
import { useAppDispatch } from "@/app/hooks";
import LoadingButton from "@/components/shared/loadingButton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const shiftSchema = z.object({
  name: z.string(),
  startTime: z.string().regex(timeRegex, "Invalid Time Format. 08:00"),
  endTime: z.string().regex(timeRegex, "Invalid Time Format. 09:00"),
  isActive: z.boolean(),
});
//   .refine(
//     (data) => {
//       const [startHour, startMinute] = data.startTime.split(":").map(Number);
//       const [endHour, endMinute] = data.endTime.split(":").map(Number);
//       return (
//         startHour < endHour ||
//         (startHour === endHour && startMinute < endMinute)
//       );
//     },
//     {
//       message: "Start Time must be less than End Time",
//       path: ["endTime"],
//     }
//   );

export type IShiftRequest = z.infer<typeof shiftSchema>;

const CreateShiftModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const form = useForm<IShiftRequest>({
    resolver: zodResolver(shiftSchema),
    defaultValues: {
      name: "",
      startTime: "",
      endTime: "",
      isActive: true,
    },
  });

  const onSubmitHandler = useCallback(
    async (values: IShiftRequest) => {
      try {
        await dispatch(createShiftThunk(values)).unwrap();
        toast.success("Shift created successfully");
        onClose();
      } catch (e) {
        toast.error(e as string);
      }
    },
    [onClose]
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
      <DialogContent className="md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Shift</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new shift
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="name" className="text-xs">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Please enter shift's name"
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
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="startTime" className="text-xs">
                        Start Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Please enter shift's start time e.g. 09:00"
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
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="endTime" className="text-xs">
                        End Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Please enter shift's end time e.g. 11:00"
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
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-2"
                        />
                      </FormControl>
                      <FormLabel id="isActive" className="text-xs">
                        Active{" "}
                      </FormLabel>

                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end items-center gap-x-3">
                <LoadingButton type="submit" loading={false} label="Submit" />
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShiftModal;
