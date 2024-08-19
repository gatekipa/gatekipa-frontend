import { fetchInvoices } from "@/app/features/pricing/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

const useInvoices = () => {
  const dispatch = useAppDispatch();

  const {
    invoices,
    loading: { INVOICE },
  } = useAppSelector((state) => state.pricing);

  useEffect(() => {
    if (!invoices.length) dispatch(fetchInvoices());
  }, [invoices.length]);

  return { invoices, loading: INVOICE };
};

export default useInvoices;
