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
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordThunk } from "../../../../app/features/auth/thunk";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../app/features/auth/slice";
import LoadingButton from "@/components/shared/loadingButton";

const changePasswordFormSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export type IChangePasswordForm = z.infer<typeof changePasswordFormSchema>;

const ChangePasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<IChangePasswordForm>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const { loading } = useAppSelector((state) => state.auth);

  const onSubmit = useCallback((values: IChangePasswordForm) => {
    dispatch(changePasswordThunk(values));
    toast.success("Changed Password Successfull");
    form.reset();
    dispatch(logout());
    navigate("/auth/login");
  }, []);

  return (
    <div className="h-full flex flex-col justify-around items-center md:mt-40">
      <Card className="w-[350px] md:w-[600px]">
        <CardHeader className="space-y-2">
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Change your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel id="oldPassword">Current Password</FormLabel>
                        <FormControl>
                          <Input
                            id="oldPassword"
                            type="password"
                            placeholder="Please enter your current password"
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
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel id="newPassword">New Password</FormLabel>
                        <FormControl>
                          <Input
                            id="newPassword"
                            type="password"
                            placeholder="Please enter your new password"
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
                <LoadingButton
                  loading={loading}
                  type="submit"
                  className="w-full"
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordForm;
