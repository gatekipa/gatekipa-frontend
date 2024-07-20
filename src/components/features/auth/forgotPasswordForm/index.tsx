import React, { useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../ui/card";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../ui/button";
import { useAppDispatch } from "../../../../app/hooks";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../../../ui/label";
import { forgotPasswordThunk } from "../../../../app/features/auth/thunk";
import { setForgotPasswordUserEmail } from "@/app/features/auth/slice";

const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

export type IForgotPasswordForm = z.infer<typeof forgotPasswordFormSchema>;

const ForgotPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const form = useForm<IForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = useCallback(async (values: IForgotPasswordForm) => {
    try {
      await dispatch(
        forgotPasswordThunk({ emailAddress: values.email })
      ).unwrap();

      dispatch(setForgotPasswordUserEmail(values.email));

      toast.success("Please Check Your Email to Reset Password.");
      form.reset();

      navigate("/auth/verify-token");
    } catch (error: any) {
      toast.error(error);
    }
  }, []);

  return (
    <div className="h-full flex flex-col justify-around items-center md:mt-40">
      <Card className="w-[350px] md:w-[600px]">
        <CardHeader className="space-y-2">
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Please enter your email address to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="email">Email</Label>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Please enter your email address"
                            autoComplete="off"
                            className={`text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                              form.formState.errors.email
                                ? "border-red-500"
                                : ""
                            }`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
                <p className="text-xs">
                  Back to{" "}
                  <Link
                    to="/auth/login"
                    className="underline underline-offset-4 font-semibold transition-opacity hover:opacity-75"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
