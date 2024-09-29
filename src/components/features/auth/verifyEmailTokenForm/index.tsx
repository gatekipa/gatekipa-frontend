import { verifyEmailWithTokenThunk } from "@/app/features/auth/thunk";
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
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const verifyEmailTokenFormSchema = z.object({
  token: z.string(),
});

export type IVerifyEmailTokenForm = z.infer<typeof verifyEmailTokenFormSchema>;

const VerifyEmailTokenForm: React.FC = () => {
  const {
    registerUser: { emailAddress },
  } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const form = useForm<IVerifyEmailTokenForm>({
    resolver: zodResolver(verifyEmailTokenFormSchema),
    defaultValues: {
      token: "",
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: IVerifyEmailTokenForm) => {
      try {
        await dispatch(
          verifyEmailWithTokenThunk({ ...data, emailAddress })
        ).unwrap();
        form.reset();
        toast.success(`Successfully Verified Email Address`);
      } catch (error) {
        toast.error(error as string);
      }
    },
    [emailAddress]
  );

  return (
    <Card className="w-[350px] md:w-[700px]">
      <CardHeader className="space-y-2">
        <CardTitle>Email Verification</CardTitle>
        <CardDescription className="text-xs">
          A verification code has been sent to your email. Please enter the code
          to complete verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <Label id="token">Token</Label>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="w-full">
                            <InputOTPSlot index={0} className="w-1/2" />
                            <InputOTPSlot index={1} className="w-1/2" />
                            <InputOTPSlot index={2} className="w-1/2" />
                            <InputOTPSlot index={3} className="w-1/2" />
                            <InputOTPSlot index={4} className="w-1/2" />
                            <InputOTPSlot index={5} className="w-1/2" />
                          </InputOTPGroup>
                        </InputOTP>
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
                  label="Verify"
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerifyEmailTokenForm;
