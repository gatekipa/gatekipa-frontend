import { z } from "zod";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Card,
} from "../../../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../ui/form";
import { Label } from "../../../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import React, { useCallback, useState, useEffect } from "react";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../../ui/input-otp";
import { Link, useNavigate } from "react-router-dom";
import {
  forgotPasswordThunk,
  verifyTokenThunk,
} from "../../../../app/features/auth/thunk";
import LoadingButton from "@/components/shared/loadingButton";

const verifyTokenFormSchema = z.object({
  token: z.string(),
});

export type IVerifyTokenForm = z.infer<typeof verifyTokenFormSchema>;

const VerifyTokenForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { forgotPasswordUserEmail, loading } = useAppSelector(
    (state) => state.auth
  );

  const form = useForm<IVerifyTokenForm>({
    resolver: zodResolver(verifyTokenFormSchema),
    defaultValues: {
      token: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!forgotPasswordUserEmail) {
      navigate("/auth/forgot-password");
    }
  }, []);

  const [countdown, setCountdown] = useState<number>(10);
  const [shouldStartCountdown, setShouldStartCountdown] =
    useState<boolean>(false);

  const onSubmit = useCallback(async (values: IVerifyTokenForm) => {
    try {
      await dispatch(
        verifyTokenThunk({
          token: values.token,
          email: forgotPasswordUserEmail!,
        })
      ).unwrap();

      toast.success("Please Check Your Email to Reset Password.");
      form.reset();
      navigate("/auth/update-password");
    } catch (error: any) {
      toast.error(error);
    }
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(timerId);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [shouldStartCountdown]);

  const onResendEmailHandler = useCallback(async () => {
    try {
      await dispatch(
        forgotPasswordThunk({ emailAddress: forgotPasswordUserEmail! })
      ).unwrap();

      setCountdown(10);
      setShouldStartCountdown(true);

      toast.success("Please Check Your Email to Reset Password.");
    } catch (error: any) {
      toast.error(error);
    }
  }, [shouldStartCountdown]);

  return (
    <div className="h-full flex flex-col justify-around items-center md:mt-40">
      <Card className="w-[350px] md:w-[600px]">
        <CardHeader className="space-y-2">
          <CardTitle>Verify Token</CardTitle>
          <CardDescription>
            Please enter the token sent to your email to reset your password.
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
                <LoadingButton
                  loading={loading}
                  type="submit"
                  className="w-full"
                  label="Next"
                  disabled={!form.formState.isValid}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs">
                    Back to{" "}
                    <Link
                      to="/auth/login"
                      className="underline underline-offset-4 font-semibold transition-opacity hover:opacity-75"
                    >
                      Login
                    </Link>
                  </p>
                  {!countdown ? (
                    <p
                      className="text-xs transition-opacity cursor-pointer hover:opacity-75 underline underline-offset-4"
                      onClick={onResendEmailHandler}
                    >
                      Resend Token
                    </p>
                  ) : (
                    <div className="text-xs">Resend ({countdown})s</div>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyTokenForm;
