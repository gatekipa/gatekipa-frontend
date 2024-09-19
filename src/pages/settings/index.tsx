import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";
import useSettings from "@/hooks/settings";

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/shared/loadingButton";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch } from "@/app/hooks";
import { changeUserSettingsThunk } from "@/app/features/settings/thunk";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  verifyEmailThunk,
  verifyEmailWithTokenThunk,
  verifySMSThunk,
  verifySMSWithTokenThunk,
} from "@/app/features/auth/thunk";
import { Button } from "@/components/ui/button";
import { getUserEmail } from "@/utils";

const multiFactorAuthenticationFormSchema = z.object({
  isMultiFactorAuthEnabled: z.boolean(),
  multiFactorAuthMediums: z.array(z.string()),
});

const multiFactorAuthEmailFormSchema = z.object({
  token: z.string(),
});

enum MultiFactorAuthMedium {
  EMAIL = "EMAIL",
  SMS = "SMS",
}

enum Step {
  CONFIGURE = "CONFIGURE",
  EMAIL = "EMAIL",
  SMS = "SMS",
  BOTH = "BOTH",
  COMPLETE = "COMPLETE",
}

export type IMultiFactorAuth = z.infer<
  typeof multiFactorAuthenticationFormSchema
>;

export type IMultiFactorAuthEmail = z.infer<
  typeof multiFactorAuthEmailFormSchema
>;

const SettingsPage: React.FC = () => {
  const { userSettings, loading } = useSettings();

  const [step, setStep] = useState<Step>(Step.CONFIGURE);
  const [both, setBoth] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const form = useForm<IMultiFactorAuth>({
    resolver: zodResolver(multiFactorAuthenticationFormSchema),
    defaultValues: {
      isMultiFactorAuthEnabled: false,
      multiFactorAuthMediums: [],
    },
  });

  useEffect(() => {
    if (!loading) {
      form.reset({
        isMultiFactorAuthEnabled: userSettings?.isMultiFactorAuthEnabled,
        multiFactorAuthMediums: userSettings?.multiFactorAuthMediums ?? [],
      });
    }
  }, [loading]);

  const multiFactorAuthMediums = useWatch({
    control: form.control,
    name: "multiFactorAuthMediums",
  });

  useEffect(() => {
    if (multiFactorAuthMediums.length === 0) {
      form.setValue("isMultiFactorAuthEnabled", false);
    }
  }, [multiFactorAuthMediums, form]);

  const handleMediumChange = (medium: string, isChecked: boolean) => {
    const currentMediums = form.getValues("multiFactorAuthMediums");
    if (isChecked) {
      form.setValue("multiFactorAuthMediums", [...currentMediums, medium]);
    } else {
      form.setValue(
        "multiFactorAuthMediums",
        currentMediums.filter((m) => m !== medium)
      );
    }
  };

  const onSubmit = useCallback(async (values: IMultiFactorAuth) => {
    try {
      // CASE 1: User has disabled multi factor authentication

      const email = getUserEmail();

      if (!values.isMultiFactorAuthEnabled) {
        await dispatch(
          changeUserSettingsThunk({
            isMultiFactorAuthEnabled: false,
            multiFactorAuthMediums: [],
          })
        ).unwrap();

        toast.success("Multi factor authentication disabled successfully.");

        return;
      }

      // CASE 2: User has enabled multi factor authentication for email

      if (
        values.isMultiFactorAuthEnabled &&
        values.multiFactorAuthMediums.includes(MultiFactorAuthMedium.SMS) &&
        values.multiFactorAuthMediums.includes(MultiFactorAuthMedium.EMAIL)
      ) {
        // 1. HIT VERIFY EMAIL API
        await dispatch(verifyEmailThunk({ emailAddress: email })).unwrap();

        setBoth(true);
        setStep(Step.EMAIL);

        return;
      }

      if (
        values.isMultiFactorAuthEnabled &&
        values.multiFactorAuthMediums.includes(MultiFactorAuthMedium.EMAIL)
      ) {
        // 1. HIT VERIFY EMAIL API
        await dispatch(verifyEmailThunk({ emailAddress: email })).unwrap();

        setStep(Step.EMAIL);

        return;
      }

      // CASE 3: User has enabled multi factor authentication for sms

      if (
        values.isMultiFactorAuthEnabled &&
        values.multiFactorAuthMediums.includes(MultiFactorAuthMedium.SMS)
      ) {
        // 1. HIT VERIFY SMS API
        await dispatch(verifySMSThunk({ mobileNo: `+13014335857` })).unwrap();

        setStep(Step.SMS);

        return;
      }

      // CASE 4: User has enabled multi factor authentication for both email and sms
    } catch (e) {
      toast.error(e as string);
    }
  }, []);

  return (
    <Card className="mx-auto container max-w-screen-sm">
      <CardHeader className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Two Factor Authentication</h2>
        <p className="text-sm">
          Enable two factor authentication to secure your account.
        </p>
      </CardHeader>
      <CardDescription className="text-center">
        Gate Kipa is a secure platform. We take security seriously. Enable two
        factor authentication to secure your account.
      </CardDescription>
      <CardContent>
        {step === Step.CONFIGURE && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="isMultiFactorAuthEnabled"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center my-5">
                    <FormLabel id="isMultiFactorAuthEnabled">
                      Enable Two Factor Authentication
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <div className="flex items-start space-x-2 border rounded-md p-4">
                  <Checkbox
                    id="mobile"
                    checked={form
                      .watch("multiFactorAuthMediums")
                      .includes(MultiFactorAuthMedium.EMAIL)}
                    disabled={!form.watch("isMultiFactorAuthEnabled")}
                    onCheckedChange={(checked) =>
                      handleMediumChange(MultiFactorAuthMedium.EMAIL, !!checked)
                    }
                  />
                  <div className="grid gap-1 leading-none">
                    <FormLabel htmlFor="mobile" className="text-sm font-medium">
                      Email Address
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Use your email address to receive verification codes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 border rounded-md p-4">
                  <Checkbox
                    id="mobile"
                    checked={form
                      .watch("multiFactorAuthMediums")
                      .includes(MultiFactorAuthMedium.SMS)}
                    disabled={!form.watch("isMultiFactorAuthEnabled")}
                    onCheckedChange={(checked) =>
                      handleMediumChange(MultiFactorAuthMedium.SMS, !!checked)
                    }
                  />
                  <div className="grid gap-1 leading-none">
                    <FormLabel htmlFor="mobile" className="text-sm font-medium">
                      Mobile
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Use your mobile phone to receive verification codes via
                      SMS.
                    </p>
                  </div>
                </div>
              </div>
              <LoadingButton
                loading={loading}
                type="submit"
                className="w-full my-4"
              />
            </form>
          </Form>
        )}
        {step === Step.EMAIL && (
          <VerifyEmail2FA
            setStep={setStep}
            step={step}
            both={both}
            setBoth={setBoth}
          />
        )}
        {step === Step.SMS && (
          <VerifyMobile2FA
            setStep={setStep}
            step={step}
            both={both}
            setBoth={setBoth}
          />
        )}

        {step === Step.COMPLETE && (
          <div>
            <p>Two factor authentication has been enabled successfully. </p>
            <span>
              <Button variant="link" onClick={() => setStep(Step.CONFIGURE)}>
                Click here to revisit configuration.
              </Button>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const VerifyEmail2FA: React.FC<{
  step: Step;
  both: boolean;
  setStep: Dispatch<SetStateAction<Step>>;
  setBoth: Dispatch<SetStateAction<boolean>>;
}> = ({ setStep, step, both }) => {
  const dispatch = useAppDispatch();

  const emailTokenform = useForm<IMultiFactorAuthEmail>({
    resolver: zodResolver(multiFactorAuthEmailFormSchema),
    defaultValues: {
      token: "",
    },
  });

  const onSubmit = async (values: IMultiFactorAuthEmail) => {
    const email = getUserEmail();
    try {
      await dispatch(
        verifyEmailWithTokenThunk({
          emailAddress: email,
          token: values.token,
        })
      ).unwrap();

      if (step === Step.EMAIL && both) {
        await dispatch(verifySMSThunk({ mobileNo: `+13014335857` })).unwrap();
        setStep(Step.SMS);
        return;
      } else if (step === Step.BOTH && !both) {
        await dispatch(
          changeUserSettingsThunk({
            isMultiFactorAuthEnabled: true,
            multiFactorAuthMediums: [MultiFactorAuthMedium.EMAIL],
          })
        ).unwrap();

        setStep(Step.COMPLETE);

        toast.success("Email setup successfully for 2FA.");
      }
    } catch (e) {
      toast.error(e as string);
    }
  };

  return (
    <Form {...emailTokenform}>
      <form onSubmit={emailTokenform.handleSubmit(onSubmit)} className="my-4">
        <h3 className="text-sm">Verify Email</h3>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={emailTokenform.control}
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
  );
};

const VerifyMobile2FA: React.FC<{
  step: Step;
  setStep: Dispatch<SetStateAction<Step>>;
  both: boolean;
  setBoth: Dispatch<SetStateAction<boolean>>;
}> = ({ setStep, both, setBoth }) => {
  const dispatch = useAppDispatch();

  const emailTokenform = useForm<IMultiFactorAuthEmail>({
    resolver: zodResolver(multiFactorAuthEmailFormSchema),
    defaultValues: {
      token: "",
    },
  });

  const onSubmit = useCallback(async (values: IMultiFactorAuthEmail) => {
    try {
      await dispatch(
        verifySMSWithTokenThunk({
          mobileNo: `+13014335857`,
          token: values.token,
        })
      ).unwrap();

      const multiFactorAuthMediums = both
        ? [MultiFactorAuthMedium.SMS, MultiFactorAuthMedium.EMAIL]
        : [MultiFactorAuthMedium.SMS];

      await dispatch(
        changeUserSettingsThunk({
          isMultiFactorAuthEnabled: true,
          multiFactorAuthMediums,
        })
      ).unwrap();

      if (both) setBoth(false);

      setStep(Step.COMPLETE);

      toast.success("Email setup successfully for 2FA.");
    } catch (e) {
      toast.error(e as string);
    }
  }, []);

  return (
    <Form {...emailTokenform}>
      <form onSubmit={emailTokenform.handleSubmit(onSubmit)} className="my-4">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={emailTokenform.control}
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
  );
};

export default SettingsPage;
