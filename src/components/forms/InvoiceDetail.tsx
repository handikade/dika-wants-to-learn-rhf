import FormGrid from "@/components/FormGrid";
import FormSection from "@/components/FormSection";
import FormSectionTitle from "@/components/FormSectionTitle";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { InvoiceFormValues } from "@/schemas/invoice-schema";

export type InvoiceDetailProps = {
  register: UseFormRegister<InvoiceFormValues>;
  errors: FieldErrors<InvoiceFormValues>;
};

const InvoiceDetail = ({ register, errors }: InvoiceDetailProps) => {
  return (
    <FormSection>
      <FormSectionTitle>Invoice Detail</FormSectionTitle>
      <FormGrid>
        <div>
          <label htmlFor="invoiceNumber">Invoice Number</label>
          <input id="invoiceNumber" {...register("invoiceNumber")} />
          <div className="error">{errors.invoiceNumber?.message}</div>
        </div>
        <div></div>
        <div>
          <label htmlFor="invoiceDate">Invoice Date</label>
          <input
            id="invoiceDate"
            {...register("invoiceDate", { valueAsDate: true })}
            type="date"
          />
          <div className="error">{errors.invoiceDate?.message}</div>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            {...register("dueDate", { valueAsDate: true })}
            type="date"
          />
          <div className="error">{errors.dueDate?.message}</div>
        </div>
      </FormGrid>
    </FormSection>
  );
};

export default InvoiceDetail;
