import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { registerUserThunk } from "../../../../app/features/auth/thunk";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import LoadingButton from "@/components/shared/loadingButton";

enum UserType {
  VISITOR = "VISITOR",
  EMPLOYEE = "EMPLOYEE",
}

const registrationFormSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  companyId: z.string().min(3),
  password: z.string().min(8),
  mobileNo: z.string().regex(/^\+1\d{10}$/, {
    message:
      "Invalid phone number. It should be in the format +1XXXXXXXXXX (11 digits)",
  }),
  userType: z.nativeEnum(UserType),
});

type IRegistrationForm = z.infer<typeof registrationFormSchema>;

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { companies } = useAppSelector((state) => state.company);
  const {
    loading,
    registerUser: { emailAddress },
  } = useAppSelector((state) => state.auth);

  const form = useForm<IRegistrationForm>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyId: "",
      password: "",
      mobileNo: "",
      userType: UserType.EMPLOYEE,
    },
  });

  const onSubmit = useCallback(async (values: IRegistrationForm) => {
    try {
      await dispatch(
        registerUserThunk({ ...values, emailAddress, isEmailVerified: true })
      ).unwrap();
      toast.success("Registration Successfull");
      form.reset();
      navigate("/auth/login");
    } catch (err) {
      toast.error(err as string);
    }
  }, []);

  return (
    <Card className="w-[350px] md:w-[600px]">
      <CardHeader className="space-y-2">
        <CardTitle>Registration</CardTitle>
        <CardDescription>Create a new account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="firstName">First Name</FormLabel>
                      <FormControl>
                        <Input
                          id="firstName"
                          type="text"
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
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="lastName">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          type="text"
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
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="companyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                            <SelectValue placeholder="Please select your company" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companies.map((company) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                            <SelectValue placeholder="Please select your user type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(UserType).map((userType) => (
                            <SelectItem key={userType} value={userType}>
                              {userType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
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
                      <FormLabel id="mobileNo">Mobile Number</FormLabel>
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
                      <div className="text-xs my-5 text-gray-800">
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Please enter your password"
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
                loading={loading}
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
                  to="company"
                  className="text-sm underline transition-opacity hover:opacity-75"
                >
                  Register as Company
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
