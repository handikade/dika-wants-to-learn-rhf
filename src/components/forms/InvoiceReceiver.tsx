import FormGrid from "@/components/FormGrid";
import FormSection from "@/components/FormSection";
import FormSectionTitle from "@/components/FormSectionTitle";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { InvoiceFormValues } from "@/schemas/invoice-schema";

export type InvoiceReceiverProps = {
  register: UseFormRegister<InvoiceFormValues>;
  errors: FieldErrors<InvoiceFormValues>;
};

const InvoiceReceiver = ({ register, errors }: InvoiceReceiverProps) => {
  return (
    <FormSection>
      <FormSectionTitle>Bill To</FormSectionTitle>
      <FormGrid>
        <div>
          <label htmlFor="receiverName">Receiver Name</label>
          <input id="receiverName" {...register("receiverName")} />
          <div className="error">{errors.receiverName?.message}</div>
        </div>
        <div>
          <label htmlFor="receiverEmail">Receiver Email</label>
          <input id="receiverEmail" {...register("receiverEmail")} />
          <div className="error">{errors.receiverEmail?.message}</div>
        </div>
        <div>
          <label htmlFor="receiverPhone">Receiver Phone</label>
          <input id="receiverPhone" {...register("receiverPhone")} />
          <div className="error">{errors.receiverPhone?.message}</div>
        </div>
      </FormGrid>
    </FormSection>
  );
};

export default InvoiceReceiver;
