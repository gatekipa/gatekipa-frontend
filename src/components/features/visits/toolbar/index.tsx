import { addNewVisitThunk } from "@/app/features/company/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LoadingButton from "@/components/shared/loadingButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getUserRole } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { format } from "date-fns";
import { PlusCircleIcon } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const visitFormSchema = z.object({
  purposeOfVisit: z.string().min(3),
  personToMeet: z.string().min(3),
  personToMeetEmail: z.string().email(),
  personToMeetMobileNo: z.string().min(10),
  checkInWithVisitCreation: z.boolean().default(false),
  employeeId: z.string().nullable(),
  visitDate: z.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    {
      message: "Visit date must be today or in the future",
    }
  ),
});

export type IVisitForm = z.infer<typeof visitFormSchema>;

type IVisitsToolbarProps = {
  visitorId: string;
};

const VisitsToolbar: React.FC<IVisitsToolbarProps> = ({ visitorId }) => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employee);
  const { loading } = useAppSelector((state) => state.company);

  const form = useForm<IVisitForm>({
    resolver: zodResolver(visitFormSchema),
    defaultValues: {
      purposeOfVisit: "",
      personToMeet: "",
      personToMeetEmail: "",
      personToMeetMobileNo: "",
      checkInWithVisitCreation: false,
      employeeId: null,
      visitDate: new Date(),
    },
  });

  const onSubmit = useCallback(async (values: IVisitForm) => {
    try {
      await dispatch(addNewVisitThunk({ visitorId, payload: values })).unwrap();
      form.reset();
      toast.success("Added Visitor Successfully");
    } catch (err) {
      toast.error(err as string);
    }
  }, []);

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
      <Dialog>
        <DialogTrigger>
          <Button
            size="sm"
            className="text-xs"
            variant="link"
            title="Create a new visit"
          >
            <PlusCircleIcon size={12} className="mr-2" />
            Create Visit
          </Button>
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
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Label className="text-sm">Employee</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between text-xs",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? transformedEmployees.find(
                                        (employee) =>
                                          employee.value === field.value
                                      )?.label
                                    : "Select Employee"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search employee..."
                                  className="h-9 text-xs"
                                />
                                <CommandList>
                                  <CommandEmpty className="text-xs">
                                    No employees found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {transformedEmployees.map((employee) => (
                                      <CommandItem
                                        value={employee.value}
                                        key={employee.value}
                                        onSelect={() => {
                                          form.setValue(
                                            "employeeId",
                                            employee.value
                                          );
                                        }}
                                      >
                                        {employee.label}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            employee.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
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
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="personToMeet"
                      render={({ field }) => (
                        <FormItem>
                          <Label id="personToMeet" className="text-sm">
                            Person To Meet
                          </Label>
                          <FormControl>
                            <Input
                              id="personToMeet"
                              type="text"
                              placeholder="Please enter the name of the person to meet"
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
                      name="personToMeetEmail"
                      render={({ field }) => (
                        <FormItem>
                          <Label id="personToMeetEmail" className="text-sm">
                            Person To Meet Email
                          </Label>
                          <FormControl>
                            <Input
                              id="personToMeetEmail"
                              type="email"
                              placeholder="Please enter email address of the person to meet"
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
                      name="personToMeetMobileNo"
                      render={({ field }) => (
                        <FormItem>
                          <Label id="personToMeetMobileNo" className="text-sm">
                            Person To Meet Mobile Number
                          </Label>
                          <FormControl>
                            <Input
                              id="personToMeetMobileNo"
                              type="text"
                              placeholder="Please enter mobile number of the person"
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
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  className="text-xs"
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>

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
                  <DialogClose className="w-full">
                    <LoadingButton
                      disabled={form.formState.isSubmitting}
                      loading={loading}
                      type="submit"
                      className="w-full"
                    />
                  </DialogClose>
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
