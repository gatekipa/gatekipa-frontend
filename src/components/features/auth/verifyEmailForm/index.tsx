import { verifyEmailThunk } from "@/app/features/auth/thunk";
import { useAppDispatch } from "@/app/hooks";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const verifyEmailSchema = z.object({
  emailAddress: z.string().email(),
});

export type IVerifyEmail = z.infer<typeof verifyEmailSchema>;

const VerifyEmailForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const form = useForm<IVerifyEmail>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      emailAddress: email,
    },
  });

  const onSubmit = useCallback(async (data: IVerifyEmail) => {
    try {
      await dispatch(verifyEmailThunk({ ...data, forSignUp: true })).unwrap();
      form.reset();
      // toast.success("Successfully Verified Email Address");
    } catch (error) {
      toast.error(error as string);
    }
  }, []);

  return (
    <Card className="w-[350px] md:w-[700px]">
      <CardHeader className="space-y-2">
        <CardTitle>Sign Up - Register to GateKipas</CardTitle>
        <CardDescription className="text-xs">
          Get started by verifying your email address.
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
                      <Label id="emailAddress" className="text-xs">
                        Email Address
                      </Label>
                      <FormControl>
                        <Input
                          id="emailAddress"
                          type="text"
                          placeholder="Please enter your email address"
                          autoComplete="off"
                          className={`text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                            form.formState.errors.emailAddress
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
              <div className="mt-4">
                <LoadingButton
                  loading={false}
                  type="submit"
                  className="w-full"
                  label="Next"
                />
              </div>
              <p>
                Already have an account.? Please{" "}
                <Link
                  to="/auth/login"
                  className="text-sm underline underline-offset-4 transition-opacity hover:opacity-80"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerifyEmailForm;
