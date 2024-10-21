import {
  createEmployeeThunk,
  editEmployeeThunk,
  IEmployee,
} from "@/app/features/employee/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LoadingButton from "@/components/shared/loadingButton";
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

type CreateEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  employee?: IEmployee;
};

const createEmployeeFormSchema = z.object({
  employeeNo: z.string(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  emailAddress: z.string().email(),
  mobileNo: z.string().regex(/^\+1\d{10}$/, {
    message:
      "Invalid phone number. It should be in the format +1XXXXXXXXXX (11 digits)",
  }),
  designation: z.string().min(3),
  dateOfBirth: z.string(),
  timesheetDueDate: z.string(),
  payrollPeriodEndDate: z.string(),
  payDate: z.string(),
  shiftId: z.string(),
  avatar: z.any().optional(),
});

export type ICreateEmployeeForm = z.infer<typeof createEmployeeFormSchema>;

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const dispatch = useAppDispatch();
  const { loading, shifts } = useAppSelector((state) => state.employee);

  const form = useForm<ICreateEmployeeForm>({
    resolver: zodResolver(createEmployeeFormSchema),
    defaultValues: {
      employeeNo: employee?.employeeNo ?? "",
      firstName: employee?.firstName ?? "",
      lastName: employee?.lastName ?? "",
      emailAddress: employee?.emailAddress ?? "",
      mobileNo: employee?.mobileNo ?? "",
      designation: employee?.designation ?? "",
      dateOfBirth: employee?.dateOfBirth
        ? new Date(employee?.dateOfBirth).toString()
        : new Date("2004-01-01").toString(),
      timesheetDueDate: employee?.timesheetDueDate
        ? new Date(employee?.timesheetDueDate).toString()
        : new Date("2004-01-01").toString(),
      payrollPeriodEndDate: employee?.payrollPeriodEndDate
        ? new Date(employee?.payrollPeriodEndDate).toString()
        : new Date("2004-01-01").toString(),
      payDate: employee?.payDate
        ? new Date(employee?.payDate).toString()
        : new Date("2004-01-01").toString(),
      shiftId: employee?.shift.id ?? "",
      avatar: undefined,
    },
  });

  const onSubmit = useCallback(async (values: ICreateEmployeeForm) => {
    try {
      if (!employee) {
        const formData = new FormData();

        for (const key in values) {
          if (key !== "avatar") {
            formData.append(
              key,
              values[key as keyof ICreateEmployeeForm] as string
            );
          }
        }

        if (values.avatar && values.avatar[0]) {
          formData.append("avatar", values.avatar[0]);
        }

        // @ts-ignore
        await dispatch(createEmployeeThunk(formData)).unwrap();
      } else {
        const newEmployee = { ...employee!, ...values };
        // @ts-ignore
        await dispatch(editEmployeeThunk(newEmployee!)).unwrap();
      }
      form.reset();
      toast.success("Employee Created Successfully");
      onClose();
    } catch (error) {
      toast.error(`${error}`);
    }
  }, []);

  return (
    <Dialog
      open={isOpen}
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
            {!!employee ? "Edit Employee" : "Create New Employee"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {!!employee
              ? "You can edit employee details in the form below."
              : "You can create a new employee by filling the form below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex gap-x-2 w-full">
                <div className="flex w-1/2 flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="firstName" className="text-xs">
                          First Name
                        </Label>
                        <FormControl>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Please Enter First Name of the Employee"
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="lastName" className="text-xs">
                          Last Name
                        </Label>
                        <FormControl>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Please Enter Last Name of the Employee"
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
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="emailAddress" className="text-xs">
                          Email Address
                        </Label>
                        <FormControl>
                          <Input
                            id="emailAddress"
                            type="email"
                            placeholder="Please Enter Email Address of the Employee"
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
                    name="mobileNo"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="mobileNo" className="text-xs">
                          Mobile No
                        </Label>
                        <FormControl>
                          <Input
                            id="mobileNo"
                            type="text"
                            placeholder="Please Enter Mobile No of the Employee"
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
              <div className="flex w-full gap-x-2">
                <div className="flex w-1/2 flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="employeeNo"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="employeeNo" className="text-xs">
                          Employee No
                        </Label>
                        <FormControl>
                          <Input
                            id="employeeNo"
                            type="text"
                            disabled={!!employee}
                            placeholder="Provide Employee No (Leave blank for auto generation)"
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
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="designation" className="text-xs">
                          Designation
                        </Label>
                        <FormControl>
                          <Input
                            id="designation"
                            type="text"
                            placeholder="Please Enter Designation of the Employee"
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

              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="shiftId"
                  render={({ field }) => (
                    <FormItem>
                      <Label id="shiftId" className="text-xs">
                        Shift
                      </Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                              <SelectValue placeholder="Please select your shift" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shifts.map((shift) => (
                              <SelectItem key={shift.id} value={shift.id}>
                                {shift.name} ({shift.startTime} -{" "}
                                {shift.endTime})
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
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Label className="text-xs">Date of Birth</Label>
                      <FormControl>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          className="pl-3 text-left font-normal text-xs"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full gap-x-2">
                <div className="flex w-1/2 flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="payDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Label className="text-xs">Pay Date</Label>
                        <FormControl>
                          <Input
                            id="payDate"
                            type="date"
                            className="pl-3 text-left font-normal text-xs"
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
                    name="payrollPeriodEndDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Label className="text-xs">
                          Payroll Period End Date
                        </Label>

                        <FormControl>
                          <Input
                            id="payrollPeriodEndDate"
                            type="date"
                            className="pl-3 text-left font-normal text-xs"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="timesheetDueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Label className="text-xs">Timesheet Due Date</Label>
                      <FormControl>
                        <Input
                          id="timesheetDueDate"
                          type="date"
                          className="pl-3 text-left font-normal text-xs"
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
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <Label id="avatar" className="text-xs">
                        Avatar
                      </Label>
                      <FormControl>
                        <Input
                          id="avatar"
                          type="file"
                          accept=".jpeg,.jpg,.png"
                          multiple={false}
                          onChange={(e) => field.onChange(e.target.files)}
                          className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <LoadingButton
                  loading={loading}
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

export default CreateEmployeeModal;
