import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPricingPlanSchema,
  ICreatePricingPlan,
  SubscriptionType,
} from "../create";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import useFeatures from "@/hooks/features";
import { usePricingPlanById } from "@/hooks/pricing";
import { useAppDispatch } from "@/app/hooks";
import { editPricingPlan } from "@/app/features/pricing/thunk";

const EditPricingPage: React.FC = () => {
  const { id } = useParams();

  const { plan, loading } = usePricingPlanById(id!);
  const navigate = useNavigate();

  const [assignedFeatures, setAssignedFeatures] = useState<
    { feature: string; subFeature: string[] }[]
  >([]);

  const [promotionalPrices, setPromotionalPrices] = useState<
    { noOfMonths: number; discountedPrice: number }[]
  >([]);

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loading && plan) {
      form.reset({
        name: plan.plan.planName,
        price: plan.plan.price,
        description: plan.plan.description,
        subscriptionType: plan.plan.subscriptionType as SubscriptionType,
        isPromotionalPlan: plan.plan.isPromotionalPlan,
        isActive: plan.plan.isActive,
      });

      setAssignedFeatures(
        plan.assignedFeatures.map((item) => ({
          feature: item.feature.featureId,
          subFeature: item.subFeature.map((sub) => sub.featureId),
        }))
      );

      setPromotionalPrices(plan.plan.promotionalPricing);
    }
  }, [plan, loading]);

  const { transformedModules } = useFeatures();

  const onSubmit = useCallback(
    async (values: ICreatePricingPlan) => {
      const _values = {
        ...values,
        promotionalPricing: promotionalPrices,
        assignedFeatures: assignedFeatures,
        id: id!,
      };

      if (_values.isPromotionalPlan && promotionalPrices.length === 0) {
        return toast.error("Please add promotional pricing");
      }

      if (_values.assignedFeatures.length === 0) {
        return toast.error("Please select features");
      }

      if (!_values.isPromotionalPlan) {
        _values.promotionalPricing = [];
      }

      try {
        // @ts-ignore
        await dispatch(editPricingPlan(_values)).unwrap();
        toast.success("Pricing plan created successfully");
        navigate("/dashboard/pricing");
        form.reset();
        setPromotionalPrices([]);
        setAssignedFeatures([]);
      } catch (err) {
        toast.error(err as string);
      }
    },
    [assignedFeatures, promotionalPrices]
  );

  const handleModuleChange = (moduleId: string) => {
    setAssignedFeatures((prev) => {
      const existingModule = prev.find((item) => item.feature === moduleId);
      if (existingModule) {
        // If the module is already selected, remove it
        return prev.filter((item) => item.feature !== moduleId);
      } else {
        // If the module is not selected, add it with empty subFeatures
        return [...prev, { feature: moduleId, subFeature: [] }];
      }
    });
  };

  const handlePermissionChange = (moduleId: string, permissionId: string) => {
    setAssignedFeatures((prev) =>
      prev.map((item) => {
        if (item.feature === moduleId) {
          const subFeatures = item.subFeature.includes(permissionId)
            ? item.subFeature.filter((sub) => sub !== permissionId)
            : [...item.subFeature, permissionId];
          return { ...item, subFeature: subFeatures };
        }
        return item;
      })
    );
  };

  const addPromotionalPricing = useCallback(() => {
    let { noOfMonths, discountedPrice } = form.getValues().promotionalPricing;

    // @ts-ignore
    noOfMonths = parseInt(noOfMonths);

    // @ts-ignore
    discountedPrice = parseInt(discountedPrice);

    setPromotionalPrices((prev) => [...prev, { noOfMonths, discountedPrice }]);
  }, [form]);

  return (
    <Card>
      <div className="flex items-center p-5 gap-4">
        <ArrowLeft
          className="cursor-pointer size-6 hover:opacity-70"
          onClick={() => navigate("/dashboard/pricing")}
        />
        <h2 className="text-2xl font-semibold">Edit Pricing Plan</h2>
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
                  <div className="flex flex-col space-y-1.5 w-1/2">
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

                  <div className="flex flex-col space-y-1.5 w-1/2">
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
                    type="button"
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

              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4">Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {transformedModules.map((module) => (
                    <div
                      key={module.id}
                      className="p-4 bg-white shadow rounded-lg"
                    >
                      <h5 className="text-lg font-semibold mb-2">
                        <Checkbox
                          checked={
                            // !!plan?.assignedFeatures.find(
                            //   (af) => af.feature.featureId === module.id
                            // ) ||
                            assignedFeatures.some(
                              (item) => item.feature === module.id
                            )
                          }
                          onCheckedChange={() => handleModuleChange(module.id)}
                        />
                        <span className="ml-2">{module.name}</span>
                      </h5>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {module.permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center"
                          >
                            <Checkbox
                              checked={
                                assignedFeatures
                                  .find((item) => item.feature === module.id)
                                  ?.subFeature.includes(permission.id) || false
                              }
                              onCheckedChange={() =>
                                handlePermissionChange(module.id, permission.id)
                              }
                            />
                            <p className="ml-2 text-sm">{permission.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-end">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditPricingPage;
