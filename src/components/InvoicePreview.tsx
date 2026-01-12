import type { InvoiceFormValues } from "@/schemas/invoice-schema";
import { useFormContext, useWatch } from "react-hook-form";

const InvoicePreview = () => {
  const { control } = useFormContext<InvoiceFormValues>();
  const formValues = useWatch({ control });

  return (
    <div>
      <h2>Invoice Preview</h2>
      <pre>{JSON.stringify(formValues ?? {}, null, 2)}</pre>
    </div>
  );
};

export default InvoicePreview;
