import React, { useCallback, useState } from "react";
import { ArrowLeft, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const createPricingPlanSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  subscriptionType: z.enum(["MONTHLY", "YEARLY"]),
  isPromotionalPlan: z.boolean(),
  isActive: z.boolean(),
  promotionalPricing: z.object({
    noOfMonths: z.preprocess((val) => Number(val), z.number()),
    discountedPrice: z.preprocess((val) => Number(val), z.number()),
  }),
});

enum SubscriptionType {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export type ICreatePricingPlan = z.infer<typeof createPricingPlanSchema>;

const CreatePricingPage: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<ICreatePricingPlan>({
    resolver: zodResolver(createPricingPlanSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      subscriptionType: SubscriptionType.MONTHLY,
      isPromotionalPlan: false,
      isActive: false,
      promotionalPricing: {
        noOfMonths: 0,
        discountedPrice: 0,
      },
    },
  });

  const [promotionalPrices, setPromotionalPrices] = useState<
    { noOfMonths: number; discountedPrice: number }[]
  >([]);

  const addPromotionalPricing = useCallback(() => {
    let { noOfMonths, discountedPrice } = form.getValues().promotionalPricing;

    // @ts-ignore
    noOfMonths = parseInt(noOfMonths);

    // @ts-ignore
    discountedPrice = parseInt(discountedPrice);

    setPromotionalPrices((prev) => [...prev, { noOfMonths, discountedPrice }]);
  }, [form]);

  const onSubmit = useCallback((values: ICreatePricingPlan) => {
    try {
      console.log(values);
    } catch (err) {
      toast.error(err as string);
    }
  }, []);

  return (
    <Card>
      <div className="flex items-center p-5 gap-4">
        <ArrowLeft
          className="cursor-pointer size-6 hover:opacity-70"
          onClick={() => navigate("/dashboard/pricing")}
        />
        <h2 className="text-2xl font-semibold">Create Pricing Plan</h2>
      </div>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="name" className="text-xs">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Please enter plan's name"
                          autoComplete="off"
                          className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="description" className="text-xs">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Please enter description"
                          autoComplete="off"
                          className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full gap-3">
                <div className="flex flex-col space-y-1.5 w-1/2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel id="price" className="text-xs">
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="price"
                            type="number"
                            min={0}
                            placeholder="Please enter plan's price"
                            autoComplete="off"
                            className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col space-y-1.5 w-1/2">
                  <FormField
                    control={form.control}
                    name="subscriptionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel id="name" className="text-xs">
                          Subscription Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                              <SelectValue placeholder="Please select your subscription type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(SubscriptionType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex w-full gap-3">
                <div className="flex flex-col space-y-1.5 w-1/2">
                  <FormField
                    control={form.control}
                    name="isPromotionalPlan"
                    render={({ field }) => (
                      <FormItem className="space-x-2 items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel id="price">Promotional Plan</FormLabel>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col space-y-1.5 w-1/2">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="space-x-2 items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel id="isActive">Active</FormLabel>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold ml-8">
                  Promotional Pricing
                </h4>
                <div className="flex w-full gap-3 items-center my-5">
                  <div className="flex flex-col space-y-1.5 w-1/3">
                    <FormField
                      control={form.control}
                      name="promotionalPricing.noOfMonths"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel id="noOfMonths" className="text-xs">
                            Months
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="noOfMonths"
                              type="number"
                              min={0}
                              disabled={!form.watch("isPromotionalPlan")}
                              placeholder="Please enter number of months"
                              autoComplete="off"
                              className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5 w-1/3">
                    <FormField
                      control={form.control}
                      name="promotionalPricing.discountedPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel id="discountedPrice" className="text-xs">
                            Discounted Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="discountedPrice"
                              type="number"
                              min={0}
                              disabled={!form.watch("isPromotionalPlan")}
                              placeholder="Please enter plan's discounted price"
                              autoComplete="off"
                              className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    className="mt-7"
                    onClick={addPromotionalPricing}
                    disabled={!form.watch("isPromotionalPlan")}
                  >
                    Add
                  </Button>
                </div>

                {promotionalPrices.length > 0 &&
                  promotionalPrices.map((price, index) => (
                    <div
                      className="flex gap-x-3 items-end space-y-4"
                      key={index}
                    >
                      <p className="text-xs">
                        {price.noOfMonths} Months for ${price.discountedPrice}
                      </p>
                      <XCircle
                        className="cursor-pointer size-5 hover:opacity-70 text-red-600"
                        onClick={() =>
                          setPromotionalPrices((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                      />
                    </div>
                  ))}
              </div>

              <Separator />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreatePricingPage;
