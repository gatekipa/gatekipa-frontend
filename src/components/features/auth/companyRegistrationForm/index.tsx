import { resetRegisterUser } from "@/app/features/auth/slice";
import { registerCompanyThunk } from "@/app/features/company/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LoadingButton from "@/components/shared/loadingButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const companyRegistrationFormSchema = z.object({
  name: z.string().min(3),
  ownerFirstName: z.string().min(3),
  ownerLastName: z.string().min(3),
  companyCode: z.string().min(3),
  address: z.string().min(8),
  mobileNo: z.string().min(10),
  emailAddress: z.string().email(),
});

export type ICompanyRegistration = z.infer<
  typeof companyRegistrationFormSchema
> & {
  emailAddress: string;
  isEmailVerified: boolean;
};

const CompanyRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    registerUser: { emailAddress },
  } = useAppSelector((state) => state.auth);

  const form = useForm<ICompanyRegistration>({
    resolver: zodResolver(companyRegistrationFormSchema),
    defaultValues: {
      name: "",
      ownerFirstName: "",
      ownerLastName: "",
      companyCode: "",
      address: "",
      mobileNo: "",
      emailAddress: emailAddress,
    },
  });

  const onSubmit = useCallback(
    async (data: ICompanyRegistration) => {
      try {
        await dispatch(
          registerCompanyThunk({ ...data, emailAddress, isEmailVerified: true })
        ).unwrap();
        dispatch(resetRegisterUser());
        toast.success("Successfully registered");
        navigate("/auth/login");
        form.reset();
      } catch (error) {
        toast.error(error as string);
      }
    },
    [emailAddress]
  );

  return (
    <Card className="w-[350px] md:w-[600px]">
      <CardHeader className="space-y-2">
        <CardTitle>Company Registration</CardTitle>
        <CardDescription className="text-xs">
          Create a new account to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="name" className="text-xs">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Please enter company's name"
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
                  name="companyCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="companyCode" className="text-xs">
                        Company Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="companyCode"
                          placeholder="Please enter company code"
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
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="emailAddress" className="text-xs">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="emailAddress"
                          type="email"
                          disabled
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
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="ownerFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="lastName" className="text-xs">
                        Owner's First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="ownerFirstName"
                          type="text"
                          placeholder="Please enter owner's first name"
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
                  name="ownerLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="lastName" className="text-xs">
                        Owner's Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="ownerLastName"
                          type="text"
                          placeholder="Please enter owner's last name"
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
                  name="mobileNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="mobileNo" className="text-xs">
                        Mobile Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="mobileNo"
                          type="text"
                          placeholder="Please enter your mobile number"
                          autoComplete="off"
                          className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <div className="text-xs my-5 p-3 rounded-md bg-yellow-100 text-yellow-800">
                        Consent: By providing your mobile number, you consent to
                        receive an SMS with a one-time password or verification
                        code.
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="address" className="text-xs">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="address"
                          placeholder="Please enter company's address"
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

              <div>
                <p className="text-sm">
                  Already have an account.? Please{" "}
                  <Link
                    to="/auth/login"
                    className="text-sm font-semibold underline transition-opacity hover:opacity-75"
                  >
                    Login
                  </Link>{" "}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <LoadingButton
                loading={false}
                type="submit"
                className="w-full"
                label="Register"
              />
              <div className="flex justify-between items-center mt-3">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm underline transition-opacity hover:opacity-75"
                >
                  Forgot Password
                </Link>
                <Link
                  to="/auth/register"
                  className="text-sm underline transition-opacity hover:opacity-75"
                >
                  Register as User
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompanyRegistrationForm;
