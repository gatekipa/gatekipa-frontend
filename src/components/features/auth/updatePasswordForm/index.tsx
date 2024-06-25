import React, { useCallback } from "react";
import { Button } from "../../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Label } from "../../../ui/label";
import { toast } from "sonner";
import { z } from "zod";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../ui/input";
import { updatePasswordThunk } from "../../../../app/features/auth/thunk";
import { useNavigate } from "react-router-dom";

const updatePasswordFormSchema = z.object({
  password: z.string().min(8),
});

export type IUpdatePasswordForm = z.infer<typeof updatePasswordFormSchema>;

const UpdatePasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resetPasswordCredentials = useAppSelector(
    (state) => state.auth.resetPasswordCredentials
  );

  const form = useForm<IUpdatePasswordForm>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: IUpdatePasswordForm) => {
      try {
        await dispatch(
          updatePasswordThunk({
            emailAddress: resetPasswordCredentials.email,
            newPassword: values.password,
            token: resetPasswordCredentials.token,
          })
        ).unwrap();

        toast.success("Please Check Your Email to Reset Password.");
        form.reset();

        navigate("/auth/login");
      } catch (error: any) {
        toast.error(error);
      }
    },
    [resetPasswordCredentials]
  );
  return (
    <div className="h-full flex flex-col justify-around items-center md:mt-40">
      <Card className="w-[350px] md:w-[600px]">
        <CardHeader className="space-y-2">
          <CardTitle>Update Password</CardTitle>
          <CardDescription>
            Please enter your new password for{" "}
            <span className="text-gray-900">
              {resetPasswordCredentials.email}
            </span>{" "}
            email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="password">Password</Label>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Please enter your new password"
                            autoComplete="off"
                            className={`text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                              form.formState.errors.password
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
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePasswordForm;
