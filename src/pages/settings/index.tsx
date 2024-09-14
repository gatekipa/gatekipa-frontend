import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";
import useSettings from "@/hooks/settings";

import React, { useCallback, useEffect } from "react";
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

const multiFactorAuthenticationFormSchema = z.object({
  isMultiFactorAuthEnabled: z.boolean(),
  multiFactorAuthMediums: z.array(z.string()),
});

export type IMultiFactorAuth = z.infer<
  typeof multiFactorAuthenticationFormSchema
>;

const SettingsPage: React.FC = () => {
  const { userSettings, loading } = useSettings();

  const form = useForm<IMultiFactorAuth>({
    resolver: zodResolver(multiFactorAuthenticationFormSchema),
    defaultValues: {
      isMultiFactorAuthEnabled: userSettings?.isMultiFactorAuthEnabled ?? false,
      multiFactorAuthMediums: userSettings?.multiFactorAuthMediums ?? [],
    },
  });

  const multiFactorAuthMediums = useWatch({
    control: form.control,
    name: "multiFactorAuthMediums",
  });

  useEffect(() => {
    // If the array is empty, disable the switch
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

  const onSubmit = useCallback((values: IMultiFactorAuth) => {
    console.log("values :>> ", values);
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
                    .includes("EMAIL")}
                  disabled={!form.watch("isMultiFactorAuthEnabled")}
                  onCheckedChange={(checked) =>
                    handleMediumChange("EMAIL", !!checked)
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
                  checked={form.watch("multiFactorAuthMediums").includes("SMS")}
                  disabled={!form.watch("isMultiFactorAuthEnabled")}
                  onCheckedChange={(checked) =>
                    handleMediumChange("SMS", !!checked)
                  }
                />
                <div className="grid gap-1 leading-none">
                  <FormLabel htmlFor="mobile" className="text-sm font-medium">
                    Mobile
                  </FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Use your mobile phone to receive verification codes via SMS.
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
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
