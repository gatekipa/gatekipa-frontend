import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  applyCouponDiscount,
  confirmPayment,
  createDiscount,
  createPaymentIntent,
  createPricingPlan,
  deleteDiscount,
  editDiscount,
  fetchActiveDiscounts,
  fetchDiscountedCompanies,
  fetchDiscounts,
  fetchFeatures,
  fetchInvoices,
  fetchPricingPlanById,
  fetchPricingPlans,
  fetchSuperAdminPricingPlans,
  IActiveDiscount,
  ICouponDiscount,
  IDiscountedCompany,
  IDiscountModel,
  IFeature,
  IInvoice,
  IPaymentIntent,
  IPlan,
  IPlanDetail,
  IPricingPlanModel,
  ISuperAdminPricingPlan,
  sendDiscountMail,
  TransformedFeatureResponse,
} from "./thunk";
import { ICompanyResponse } from "../company/thunk";

enum PricingApiEndpoint {
  FETCH_PLANS = "FETCH_PLANS",
  FETCH_PLAN = "FETCH_PLAN",
  FETCH_DISCOUNTS = "FETCH_DISCOUNTS",
  CREATE_PAYMENT_INTENT = "CREATE_PAYMENT_INTENT",
  CONFIRM_PAYMENT = "CONFIRM_PAYMENT",
  INVOICE = "INVOICE",
  CREATE_PLAN = "CREATE_PLAN",
  FETCH_FEATURES = "FETCH_FEATURES",
  CREATE_DISCOUNT = "CREATE_DISCOUNT",
  EDIT_DISCOUNT = "EDIT_DISCOUNT",
  DELETE_DISCOUNT = "DELETE_DISCOUNT",
  FETCH_DISCOUNTED_COMPANIES = "FETCH_DISCOUNTED_COMPANIES",
  FETCH_ACTIVE_DISCOUNTS = "FETCH_ACTIVE_DISCOUNTS",
  SEND_DISCOUNT_MAIL = "SEND_DISCOUNT_MAIL",
  FETCH_SUPER_ADMIN_PRICING_PLANS = "FETCH_SUPER_ADMIN_PRICING_PLANS",
  APPLY_COUPON_DISCOUNT = "APPLY_COUPON_DISCOUNT",
}

export interface PricingState {
  selectedPlan: IPlan | null;
  paymentSuccessResponse: ICompanyResponse | null;
  paymentIntent: IPaymentIntent | null;
  loading: { [key in PricingApiEndpoint]?: boolean };
  plans: IPricingPlanModel[];
  plan: IPlanDetail | null;
  invoices: IInvoice[];
  modules: IFeature[];
  permissions: IFeature[];
  discounts: IDiscountModel[];
  discountedCompanies: IDiscountedCompany[];
  activeDiscounts: IActiveDiscount[];
  superAdminPricingPlans: ISuperAdminPricingPlan[];
  couponResponse: ICouponDiscount | null;
}

const initialState: PricingState = {
  plans: [],
  plan: null,
  selectedPlan: null,
  paymentIntent: null,
  paymentSuccessResponse: null,
  couponResponse: null,
  loading: {
    [PricingApiEndpoint.FETCH_PLANS]: false,
    [PricingApiEndpoint.FETCH_PLAN]: false,
    [PricingApiEndpoint.CREATE_PAYMENT_INTENT]: false,
    [PricingApiEndpoint.CONFIRM_PAYMENT]: false,
    [PricingApiEndpoint.INVOICE]: false,
    [PricingApiEndpoint.CREATE_PLAN]: false,
    [PricingApiEndpoint.FETCH_FEATURES]: false,
    [PricingApiEndpoint.FETCH_DISCOUNTS]: false,
    [PricingApiEndpoint.CREATE_DISCOUNT]: false,
    [PricingApiEndpoint.EDIT_DISCOUNT]: false,
    [PricingApiEndpoint.SEND_DISCOUNT_MAIL]: false,
    [PricingApiEndpoint.FETCH_SUPER_ADMIN_PRICING_PLANS]: false,
    [PricingApiEndpoint.APPLY_COUPON_DISCOUNT]: false,
  },
  invoices: [],
  modules: [],
  permissions: [],
  discounts: [],
  activeDiscounts: [],
  discountedCompanies: [],
  superAdminPricingPlans: [],
};

export const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    setSelectedPlan: (state, action: PayloadAction<IPlan>) => {
      state.selectedPlan = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchPricingPlans.fulfilled,
      (state, action: PayloadAction<IPricingPlanModel[]>) => {
        state.plans = action.payload;
        state.loading[PricingApiEndpoint.FETCH_PLANS] = false;
      }
    );
    builder.addCase(fetchPricingPlans.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_PLANS] = true;
    });
    builder.addCase(fetchPricingPlans.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_PLANS] = false;
    });
    builder.addCase(
      fetchInvoices.fulfilled,
      (state, action: PayloadAction<IInvoice[]>) => {
        state.invoices = action.payload;
        state.loading[PricingApiEndpoint.INVOICE] = false;
      }
    );
    builder.addCase(fetchInvoices.pending, (state) => {
      state.loading[PricingApiEndpoint.INVOICE] = true;
    });
    builder.addCase(fetchInvoices.rejected, (state) => {
      state.loading[PricingApiEndpoint.INVOICE] = false;
    });
    builder.addCase(
      fetchFeatures.fulfilled,
      (state, action: PayloadAction<TransformedFeatureResponse>) => {
        if (action.payload.type === "MODULE") {
          state.modules = action.payload.data;
        } else {
          state.permissions = action.payload.data;
        }
        state.loading[PricingApiEndpoint.FETCH_FEATURES] = false;
      }
    );
    builder.addCase(fetchFeatures.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_FEATURES] = true;
    });
    builder.addCase(fetchFeatures.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_FEATURES] = false;
    });
    builder.addCase(
      fetchPricingPlanById.fulfilled,
      (state, action: PayloadAction<IPlanDetail>) => {
        state.plan = action.payload;
        state.loading[PricingApiEndpoint.FETCH_PLAN] = false;
      }
    );
    builder.addCase(fetchPricingPlanById.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_PLAN] = true;
    });
    builder.addCase(fetchPricingPlanById.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_PLAN] = false;
    });
    builder.addCase(
      createPaymentIntent.fulfilled,
      (state, action: PayloadAction<IPaymentIntent>) => {
        state.paymentIntent = action.payload;
        state.loading[PricingApiEndpoint.CREATE_PAYMENT_INTENT] = false;
      }
    );
    builder.addCase(createPaymentIntent.pending, (state) => {
      state.loading[PricingApiEndpoint.CREATE_PAYMENT_INTENT] = true;
    });
    builder.addCase(createPaymentIntent.rejected, (state) => {
      state.loading[PricingApiEndpoint.CREATE_PAYMENT_INTENT] = false;
    });
    builder.addCase(
      createPricingPlan.fulfilled,
      (state, action: PayloadAction<any>) => {
        // state.paymentIntent = action.payload;
        console.log("action :>> ", action.payload);
        state.loading[PricingApiEndpoint.CREATE_PLAN] = false;
      }
    );
    builder.addCase(createPricingPlan.pending, (state) => {
      state.loading[PricingApiEndpoint.CREATE_PLAN] = true;
    });
    builder.addCase(createPricingPlan.rejected, (state) => {
      state.loading[PricingApiEndpoint.CREATE_PLAN] = false;
    });
    builder.addCase(
      confirmPayment.fulfilled,
      (state, action: PayloadAction<ICompanyResponse>) => {
        state.paymentSuccessResponse = action.payload;
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ data: action.payload })
        );
        localStorage.removeItem("selectedPlan");
        localStorage.removeItem("selectedPromotionalPricing");
        state.loading[PricingApiEndpoint.CONFIRM_PAYMENT] = false;
      }
    );
    builder.addCase(confirmPayment.pending, (state) => {
      state.loading[PricingApiEndpoint.CONFIRM_PAYMENT] = true;
    });
    builder.addCase(confirmPayment.rejected, (state) => {
      state.loading[PricingApiEndpoint.CONFIRM_PAYMENT] = false;
    });
    builder.addCase(
      fetchDiscounts.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.discounts = action.payload;
        state.loading[PricingApiEndpoint.FETCH_DISCOUNTS] = false;
      }
    );
    builder.addCase(fetchDiscounts.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_DISCOUNTS] = true;
    });
    builder.addCase(fetchDiscounts.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_DISCOUNTS] = false;
    });
    builder.addCase(
      createDiscount.fulfilled,
      (state, action: PayloadAction<IDiscountModel>) => {
        state.discounts = [...state.discounts, action.payload];
        state.loading[PricingApiEndpoint.CREATE_DISCOUNT] = false;
      }
    );
    builder.addCase(createDiscount.pending, (state) => {
      state.loading[PricingApiEndpoint.CREATE_DISCOUNT] = true;
    });
    builder.addCase(createDiscount.rejected, (state) => {
      state.loading[PricingApiEndpoint.CREATE_DISCOUNT] = false;
    });
    builder.addCase(
      editDiscount.fulfilled,
      (state, action: PayloadAction<IDiscountModel>) => {
        state.discounts = state.discounts.map((discount) => {
          if (discount.id === action.payload.id) {
            return action.payload;
          }
          return discount;
        });

        state.loading[PricingApiEndpoint.EDIT_DISCOUNT] = false;
      }
    );
    builder.addCase(editDiscount.pending, (state) => {
      state.loading[PricingApiEndpoint.EDIT_DISCOUNT] = true;
    });
    builder.addCase(editDiscount.rejected, (state) => {
      state.loading[PricingApiEndpoint.EDIT_DISCOUNT] = false;
    });
    builder.addCase(
      deleteDiscount.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.discounts = state.discounts.filter(
          (discount) => discount.id !== action.payload
        );

        state.loading[PricingApiEndpoint.DELETE_DISCOUNT] = false;
      }
    );
    builder.addCase(deleteDiscount.pending, (state) => {
      state.loading[PricingApiEndpoint.DELETE_DISCOUNT] = true;
    });
    builder.addCase(deleteDiscount.rejected, (state) => {
      state.loading[PricingApiEndpoint.DELETE_DISCOUNT] = false;
    });
    builder.addCase(
      fetchDiscountedCompanies.fulfilled,
      (state, action: PayloadAction<IDiscountedCompany[]>) => {
        state.discountedCompanies = action.payload;
        state.loading[PricingApiEndpoint.FETCH_DISCOUNTED_COMPANIES] = false;
      }
    );
    builder.addCase(fetchDiscountedCompanies.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_DISCOUNTED_COMPANIES] = true;
    });
    builder.addCase(fetchDiscountedCompanies.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_DISCOUNTED_COMPANIES] = false;
    });
    builder.addCase(
      fetchActiveDiscounts.fulfilled,
      (state, action: PayloadAction<IActiveDiscount[]>) => {
        state.activeDiscounts = action.payload;
        state.loading[PricingApiEndpoint.FETCH_ACTIVE_DISCOUNTS] = false;
      }
    );
    builder.addCase(fetchActiveDiscounts.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_ACTIVE_DISCOUNTS] = true;
    });
    builder.addCase(fetchActiveDiscounts.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_ACTIVE_DISCOUNTS] = false;
    });
    builder.addCase(sendDiscountMail.fulfilled, (state) => {
      state.loading[PricingApiEndpoint.SEND_DISCOUNT_MAIL] = false;
    });
    builder.addCase(sendDiscountMail.pending, (state) => {
      state.loading[PricingApiEndpoint.SEND_DISCOUNT_MAIL] = true;
    });
    builder.addCase(sendDiscountMail.rejected, (state) => {
      state.loading[PricingApiEndpoint.SEND_DISCOUNT_MAIL] = false;
    });
    builder.addCase(
      fetchSuperAdminPricingPlans.fulfilled,
      (state, action: PayloadAction<ISuperAdminPricingPlan[]>) => {
        state.superAdminPricingPlans = action.payload;
        state.loading[PricingApiEndpoint.FETCH_SUPER_ADMIN_PRICING_PLANS] =
          false;
      }
    );
    builder.addCase(fetchSuperAdminPricingPlans.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_SUPER_ADMIN_PRICING_PLANS] = true;
    });
    builder.addCase(fetchSuperAdminPricingPlans.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_SUPER_ADMIN_PRICING_PLANS] = false;
    });
    builder.addCase(
      applyCouponDiscount.fulfilled,
      (state, action: PayloadAction<ICouponDiscount>) => {
        state.couponResponse = action.payload;
        state.loading[PricingApiEndpoint.APPLY_COUPON_DISCOUNT] = false;
      }
    );
    builder.addCase(applyCouponDiscount.pending, (state) => {
      state.loading[PricingApiEndpoint.APPLY_COUPON_DISCOUNT] = true;
    });
    builder.addCase(applyCouponDiscount.rejected, (state) => {
      state.loading[PricingApiEndpoint.APPLY_COUPON_DISCOUNT] = false;
    });
  },
});

export const { setSelectedPlan } = pricingSlice.actions;

export default pricingSlice.reducer;
