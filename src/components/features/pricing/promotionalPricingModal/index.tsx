import { createPaymentIntent, IPlan } from "@/app/features/pricing/thunk";
import { useAppDispatch } from "@/app/hooks";
import LoadingButton from "@/components/shared/loadingButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PromotionalPricingModal: React.FC<{
  open: boolean;
  onClose: () => void;
  pricingPlan: IPlan;
}> = ({ open, onClose, pricingPlan }) => {
  const [selectedPricing, setSelectedPricing] = useState<string>(``);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    try {
      const [noOfMonths, discountedPrice] = selectedPricing.split("-");

      await dispatch(
        createPaymentIntent({
          actualAmount: parseInt(discountedPrice!),
          payableAmount: parseInt(discountedPrice!),
          noOfMonths: parseInt(noOfMonths!),
        })
      ).unwrap();

      localStorage.setItem(
        "selectedPromotionalPricing",
        JSON.stringify({ noOfMonths, discountedPrice })
      );

      navigate(`checkout/${pricingPlan.id}`);
    } catch (error) {
      toast.error(error as string);
    }
  }, [selectedPricing]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Promotional Pricing</DialogTitle>
          <DialogDescription className="text-xs">
            You can select the promotional pricing for this plan.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label id="subject" className="text-xs">
                Promotional Pricing
              </Label>
              <Select
                onValueChange={(value) => {
                  setSelectedPricing(value);
                }}
              >
                <SelectTrigger className="text-xs focus:outline-none focus-within:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <SelectValue placeholder="Please select your company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={`1-${pricingPlan.price}`}>
                    1 Month - ${pricingPlan.price}
                  </SelectItem>
                  {pricingPlan?.promotionalPricing?.map(
                    (record: any, index: number) => (
                      <SelectItem
                        key={index}
                        value={`${record.noOfMonths?.toString()}-${record.discountedPrice?.toString()}`}
                      >
                        {record.noOfMonths} Months - ${record.discountedPrice}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <LoadingButton
              loading={false}
              type="submit"
              className="w-full mt-4"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionalPricingModal;
