import { addNewVisitThunk } from "@/app/features/company/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LoadingButton from "@/components/shared/loadingButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "react-select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getUserRole } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const visitFormSchema = z.object({
  purposeOfVisit: z.string().min(3),
  checkInWithVisitCreation: z.boolean().default(false),
  employeeId: z.string().nullable(),
  visitDate: z.string(),
});

export type IVisitForm = z.infer<typeof visitFormSchema>;

type IVisitsToolbarProps = {
  visitorId: string;
  mode: "table" | "toolbar";
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const VisitsToolbar: React.FC<IVisitsToolbarProps> = ({
  visitorId,
  mode,
  open,
  onClose,
  onOpen,
}) => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employee);
  const { loading } = useAppSelector((state) => state.company);

  const form = useForm<IVisitForm>({
    resolver: zodResolver(visitFormSchema),
    defaultValues: {
      purposeOfVisit: "",
      checkInWithVisitCreation: false,
      employeeId: null,
      visitDate: new Date().toString(),
    },
  });

  const onSubmit = useCallback(
    async (values: IVisitForm) => {
      try {
        await dispatch(
          addNewVisitThunk({ visitorId, payload: values })
        ).unwrap();
        form.reset();
        toast.success("Visit Created Successfully");
        onClose();
      } catch (err) {
        toast.error(err as string);
      }
    },
    [visitorId]
  );

  const transformedEmployees = useMemo(
    () =>
      employees.map((employee) => ({
        label: `${employee.firstName} ${employee.lastName}`,
        value: employee.id,
      })),
    [employees]
  );

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            form.reset();
            onClose();
          }
        }}
      >
        <DialogTrigger>
          {mode === "table" ? (
            <Button
              size="sm"
              variant="link"
              className="text-xs"
              onClick={onOpen}
            >
              <Plus className="mr-1" size={12} />
              Create Visit
            </Button>
          ) : (
            <Button size="sm" className="text-xs" onClick={onOpen}>
              <Plus className="mr-2" size={16} />
              Create Visit
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Create New Visit</DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="employeeId"
                      render={() => (
                        <FormItem className="flex flex-col">
                          <Label className="text-sm">Employee</Label>
                          <Controller
                            control={form.control}
                            name="employeeId"
                            render={({ field }) => (
                              <Select
                                isClearable={true}
                                isSearchable={true}
                                placeholder="Please select an employee"
                                className="text-xs"
                                // @ts-ignore
                                options={transformedEmployees}
                                onChange={(selectedOption) =>
                                  field.onChange(
                                    selectedOption ? selectedOption.value : ""
                                  )
                                }
                                value={
                                  transformedEmployees.find(
                                    (option) => option.value === field.value
                                  ) || null
                                }
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    borderColor: state.isFocused
                                      ? "transparent"
                                      : provided.borderColor,
                                    "&:hover": {
                                      borderColor: state.isFocused
                                        ? "transparent"
                                        : provided.borderColor,
                                    },
                                  }),
                                }}
                              />
                            )}
                          />
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="purposeOfVisit"
                      render={({ field }) => (
                        <FormItem>
                          <Label id="purposeOfVisit" className="text-sm">
                            Purpose of Visit
                          </Label>
                          <FormControl>
                            <Input
                              id="purposeOfVisit"
                              type="text"
                              placeholder="Please enter your purpose of visit"
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

                  {getUserRole() !== "ADMIN" && (
                    <div className="flex flex-col space-y-1.5">
                      <FormField
                        control={form.control}
                        name="visitDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <Label id="visitDate" className="text-sm">
                              Visit Date
                            </Label>
                            <FormControl>
                              <Input
                                id="visitDate"
                                type="date"
                                className="w-full pl-3 text-left font-normal"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  {getUserRole() !== "VISITOR" && (
                    <div className="flex items-center">
                      <FormField
                        control={form.control}
                        name="checkInWithVisitCreation"
                        render={({ field }) => (
                          <FormItem className="space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="checkInWithVisitCreation"
                                className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </FormControl>
                            <Label
                              id="checkInWithVisitCreation"
                              className="text-sm align-top"
                            >
                              With Check In
                            </Label>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <LoadingButton
                    disabled={form.formState.isSubmitting}
                    loading={loading}
                    type="submit"
                    className="w-full"
                  />
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisitsToolbar;
