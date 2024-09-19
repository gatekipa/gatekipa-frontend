import {
  verifyEmailWithTokenThunk,
  verifySMSWithTokenThunk,
} from "@/app/features/auth/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LoadingButton from "@/components/shared/loadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const verify2FAFormSchema = z.object({
  token: z.string(),
});

export type IVerify2FAForm = z.infer<typeof verify2FAFormSchema>;

const Verify2FAForm = () => {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(verify2FAFormSchema),
    defaultValues: {
      token: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: IVerify2FAForm) => {
    try {
      if (
        user?.isMultiFactorAuthEnabled &&
        user?.multiFactorAuthMediums?.includes("EMAIL")
      ) {
        await dispatch(
          verifyEmailWithTokenThunk({
            token: values.token,
            emailAddress: user.emailAddress,
          })
        ).unwrap();
      } else if (
        user?.isMultiFactorAuthEnabled &&
        user?.multiFactorAuthMediums?.includes("SMS")
      ) {
        await dispatch(
          verifySMSWithTokenThunk({
            token: values.token,
            mobileNo: "+13014335857",
          })
        ).unwrap();
      }

      navigate("/dashboard");
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <p>Please check your email for verification code</p>
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="otp">OTP</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-4">
          <LoadingButton
            loading={false}
            type="submit"
            className="w-full"
            label="Login"
          />
          <div className="flex justify-between items-center mt-3"></div>
        </div>
      </form>
    </Form>
  );
};

export default Verify2FAForm;
