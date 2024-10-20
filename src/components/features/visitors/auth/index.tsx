import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import React, { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Select from "react-select";
import {
  addExistingReceptionVisitorThunk,
  addNewReceptionVisitorThunk,
  fetchReceptionVisitorsThunk,
} from "@/app/features/company/thunk";

enum VisitorAuthState {
  EXISTING = "EXISTING",
  NEW = "NEW",
  DEFAULT = "DEFAULT",
}

const visitorSignInFormSchema = z.object({
  emailAddress: z.string().optional(),
  mobileNo: z.string().optional(),
  employeeId: z.string(),
  purposeOfVisit: z.string(),
});

const visitorSignUpFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string(),
  mobileNo: z.string(),
  purposeOfVisit: z.string(),
  employeeId: z.string(),
});

export type VisitorSignInForm = z.infer<typeof visitorSignInFormSchema>;
export type VisitorSignUpForm = z.infer<typeof visitorSignUpFormSchema>;

const VisitorAuth: React.FC = () => {
  const [userType, setUserType] = useState<VisitorAuthState>(
    VisitorAuthState.DEFAULT
  );

  const { employees } = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();

  const signInForm = useForm<VisitorSignInForm>({
    resolver: zodResolver(visitorSignInFormSchema),
    defaultValues: {
      emailAddress: "",
      mobileNo: "",
      employeeId: "",
      purposeOfVisit: "",
    },
    mode: "onChange",
  });

  const signUpForm = useForm<VisitorSignUpForm>({
    resolver: zodResolver(visitorSignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      mobileNo: "",
      purposeOfVisit: "",
      employeeId: "",
    },
    mode: "onChange",
  });

  const visitorSignUpHandler = useCallback(
    async (values: VisitorSignUpForm) => {
      try {
        await dispatch(addNewReceptionVisitorThunk(values)).unwrap();
        await dispatch(fetchReceptionVisitorsThunk()).unwrap();
        signUpForm.reset();
        toast.success("You have checked in successfully!");
        setUserType(VisitorAuthState.DEFAULT);
      } catch (error) {
        toast.success(error as string);
      }
    },
    []
  );

  const visitorSigninHandler = useCallback(
    async (values: VisitorSignInForm) => {
      try {
        if (!values.emailAddress && !values.mobileNo) {
          toast.error("Please provide either email or mobile number");
          return;
        }
        await dispatch(addExistingReceptionVisitorThunk(values)).unwrap();
        await dispatch(fetchReceptionVisitorsThunk()).unwrap();

        signInForm.reset();
        toast.success("You have checked in successfully!");
        setUserType(VisitorAuthState.DEFAULT);
      } catch (error) {
        toast.success(error as string);
      }
    },
    []
  );

  const defaultContent = (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Visitor Self Check In</h2>
      <p className="text-center text-muted-foreground">
        Please let us know if you have visited us before?
      </p>
      <div className="flex flex-col space-y-4">
        <Button
          onClick={() => setUserType(VisitorAuthState.EXISTING)}
          className="bg-slate-600 text-white"
        >
          I've visited before
        </Button>
        <Button onClick={() => setUserType(VisitorAuthState.NEW)}>
          I'm visting first time
        </Button>
      </div>
    </div>
  );

  const transformedEmployees = useMemo(
    () =>
      employees.map((employee) => ({
        label: `${employee.firstName} ${employee.lastName}`,
        value: employee.id,
      })),
    [employees]
  );

  const existingContent = (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(visitorSigninHandler)}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <div className="space-y-2">
          <FormField
            control={signInForm.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="email" className="text-xs">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Please enter your email address"
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
        <div className="space-y-2">
          <FormField
            control={signInForm.control}
            name="mobileNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="mobile" className="text-xs">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    id="mobile"
                    placeholder="Please enter your phone number"
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
        <div className="space-y-2">
          <FormField
            control={signInForm.control}
            name="employeeId"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xs">Employee</FormLabel>
                <Controller
                  control={signInForm.control}
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
                          (option: any) => option.value === field.value
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
        <div className="space-y-2">
          <FormField
            control={signInForm.control}
            name="purposeOfVisit"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="purposeOfVisit" className="text-xs">
                  Purpose of Visit
                </FormLabel>
                <FormControl>
                  <Input
                    id="purposeOfVisit"
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
        <div className="flex gap-2">
          <Button type="submit" className="w-full">
            Check In
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setUserType(VisitorAuthState.DEFAULT)}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );

  const newContent = (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(visitorSignUpHandler)}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div className="space-y-2">
          <FormField
            control={signUpForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="firstName" className="text-xs">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    placeholder="Please enter your first name"
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
        <div className="space-y-2">
          <FormField
            control={signUpForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="lastName" className="text-xs">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="lastName"
                    placeholder="Please enter your last name"
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
        <div className="space-y-2">
          <FormField
            control={signUpForm.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="email" className="text-xs">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Please enter your email address"
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
        <div className="space-y-2">
          <FormField
            control={signUpForm.control}
            name="mobileNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="mobile" className="text-xs">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    id="mobile"
                    placeholder="Please enter your phone number"
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
        <div className="space-y-2">
          <FormField
            control={signUpForm.control}
            name="employeeId"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xs">Employee</FormLabel>
                <Controller
                  control={signUpForm.control}
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
                          (option: any) => option.value === field.value
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
        <div className="space-y-2">
          <FormField
            control={signUpForm.control}
            name="purposeOfVisit"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="purposeOfVisit" className="text-xs">
                  Purpose of Visit
                </FormLabel>
                <FormControl>
                  <Input
                    id="purposeOfVisit"
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
        <div className="flex gap-x-2">
          <Button type="submit" className="w-full">
            Check In
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setUserType(VisitorAuthState.DEFAULT)}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );

  const contentMap = {
    [VisitorAuthState.DEFAULT]: defaultContent,
    [VisitorAuthState.EXISTING]: existingContent,
    [VisitorAuthState.NEW]: newContent,
  };

  return (
    <Card>
      <CardContent className="p-5">{contentMap[userType]}</CardContent>
    </Card>
  );
};

export default VisitorAuth;
