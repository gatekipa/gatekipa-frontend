import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../ui/button";
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
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { registerUserThunk } from "../../../../app/features/auth/thunk";
import { toast } from "sonner";

const registrationFormSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  emailAddress: z.string().email(),
  password: z.string().min(8),
  mobileNo: z.string().min(10),
});

type IRegistrationForm = z.infer<typeof registrationFormSchema>;

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<IRegistrationForm>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      mobileNo: "",
    },
  });

  const onSubmit = useCallback((values: IRegistrationForm) => {
    dispatch(registerUserThunk(values));
    toast.success("Registration Successfull");
    form.reset();
    navigate("/auth/login");
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
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="emailAddress"
                          type="email"
                          placeholder="Please enter your email address"
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
              <Button className="w-full" type="submit">
                Register
              </Button>

              <div className="flex justify-between items-center mt-3">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm underline transition-opacity hover:opacity-75"
                >
                  Forgot Password
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
