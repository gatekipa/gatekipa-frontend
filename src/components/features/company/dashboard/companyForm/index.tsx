import { ICompanyResponse } from "@/app/features/company/thunk";
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
import { z } from "zod";

const companyDetailsSchema = z.object({
  name: z.string(),
  address: z.string(),
  companyCode: z.string(),
  mobileNo: z.string(),
  ownerFirstName: z.string(),
  ownerLastName: z.string(),
});

export type ICompanyDetails = z.infer<typeof companyDetailsSchema>;

type CompanyDetailsFormProps = {
  company: ICompanyResponse;
};

const CompanyDetailsForm: React.FC<CompanyDetailsFormProps> = ({ company }) => {
  const form = useForm<ICompanyDetails>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: {
      name: company?.name ?? "",
      address: company?.address ?? "",
      companyCode: company?.companyCode ?? "",
      mobileNo: company?.mobileNo ?? "",
      ownerFirstName: company?.ownerFirstName ?? "",
      ownerLastName: company?.ownerLastName ?? "",
    },
  });

  const onSubmit = useCallback(async (values: ICompanyDetails) => {
    try {
      console.log(`values`, values);
    } catch (error) {}
  }, []);

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
                    name="ownerFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="ownerFirstName">Owner's First Name</Label>
                        <FormControl>
                          <Input
                            id="ownerFirstName"
                            placeholder="Please enter company's owner first name"
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
                    name="ownerLastName"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="ownerLastName">Owner's Last Name</Label>
                        <FormControl>
                          <Input
                            id="ownerLastName"
                            placeholder="Please enter company's owner last name"
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
                    name="mobileNo"
                    render={({ field }) => (
                      <FormItem>
                        <Label id="mobileNo">Mobile No</Label>
                        <FormControl>
                          <Input
                            id="mobileNo"
                            placeholder="Please enter your mobile number"
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
