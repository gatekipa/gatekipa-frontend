import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
import { useAppDispatch } from "../../../../app/hooks";
import { loginThunk } from "../../../../app/features/auth/thunk";

const loginFormSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(8),
});

type ILoginForm = z.infer<typeof loginFormSchema>;

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async (values: ILoginForm) => {
    try {
      await dispatch(loginThunk(values)).unwrap();
      toast.success("Login Successfull");
      form.reset();
      navigate("/dashboard");
    } catch (error) {
      toast.error(`${error}`);
    }
  }, []);

  return (
    <Card className="w-[350px] md:w-[600px]">
      <CardHeader className="space-y-2">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Sign in to access your account and data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <p className="text-sm">
                  Don't have an account.? Please{" "}
                  <Link
                    to="/auth/register"
                    className="text-sm font-semibold underline transition-opacity hover:opacity-75"
                  >
                    Sign Up
                  </Link>{" "}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full" type="submit">
                Login
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

export default LoginForm;
