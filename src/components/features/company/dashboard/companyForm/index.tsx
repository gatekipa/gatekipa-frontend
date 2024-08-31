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
import { getCompanyInfo } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const companyDetailsSchema = z.object({
  name: z.string(),
  address: z.string(),
  companyCode: z.string(),
});

export type ICompanyDetails = z.infer<typeof companyDetailsSchema>;

const CompanyDetailsForm: React.FC = () => {
  const companyInfo = getCompanyInfo();

  const form = useForm<ICompanyDetails>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: {
      name: companyInfo.name ?? "",
      address: companyInfo.address ?? "",
      companyCode: companyInfo.companyCode ?? "",
    },
  });

  const onSubmit = useCallback(async (values: ICompanyDetails) => {}, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Company Details
        </CardTitle>
        <CardDescription className="text-sm text-gray-700 dark:text-white">
          View and edit details about your company
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="name">Name</Label>
                        <FormControl>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Please enter your email address"
                            autoComplete="off"
                            className={`text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-700 dark:focus:border-white ${
                              form.formState.errors.name ? "border-red-500" : ""
                            }`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="companyCode"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="companyCode">Company Code</Label>
                        <FormControl>
                          <Input
                            id="companyCode"
                            placeholder="Please enter your company code"
                            autoComplete="off"
                            className={`text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-700 dark:focus:border-white ${
                              form.formState.errors.name ? "border-red-500" : ""
                            }`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="email">Address</Label>
                        <FormControl>
                          <Input
                            id="address"
                            placeholder="Please enter your company address"
                            autoComplete="off"
                            className={`text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-700 dark:focus:border-white ${
                              form.formState.errors.name ? "border-red-500" : ""
                            }`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="text-end my-3">
              <LoadingButton
                loading={false}
                className="w-full md:w-fit"
                type="submit"
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailsForm;
