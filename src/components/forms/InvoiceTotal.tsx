import { currencyFormatter } from "@/utils/currency-utils";
import { calculateItemTotal } from "@/utils/invoice-utils";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import type { InvoiceFormValues } from "@/schemas/invoice-schema";

const InvoiceTotal = () => {
  const { control } = useFormContext<InvoiceFormValues>();
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
