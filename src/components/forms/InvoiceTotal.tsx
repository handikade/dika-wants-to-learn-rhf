import { currencyFormatter } from "@/utils/currency-utils.ts";
import { calculateItemTotal } from "@/utils/invoice-utils.ts";
import { useMemo } from "react";
import { useWatch, type Control } from "react-hook-form";
import type { InvoiceFormValues } from "../../InvoiceForm.tsx";

export type InvoiceTotalProps = {
  control: Control<InvoiceFormValues>;
};

const InvoiceTotal = ({ control }: InvoiceTotalProps) => {
  const items = useWatch({ control, name: "items" });

  const totalItems = useMemo(() => {
    const currentItems = items ?? [];
    return currentItems.reduce(
      (acc, item) =>
        acc +
        calculateItemTotal({
          price: item.price,
          quantity: item.quantity,
          discountRate: item.discount,
        }),
      0
    );
  }, [items]);

  const totalItemsFormatted = currencyFormatter.format(totalItems);

  return <p>Total: {totalItemsFormatted}</p>;
};

export default InvoiceTotal;
