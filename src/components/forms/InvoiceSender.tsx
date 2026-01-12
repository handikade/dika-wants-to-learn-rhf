import FormGrid from "@/components/FormGrid";
import FormSection from "@/components/FormSection";
import FormSectionTitle from "@/components/FormSectionTitle";
import { useFormContext } from "react-hook-form";

import type { InvoiceFormValues } from "@/schemas/invoice-schema";

const InvoiceSender = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<InvoiceFormValues>();

  return (
    <FormSection>
      <FormSectionTitle>Bill From</FormSectionTitle>
      <FormGrid>
        <div>
          <label htmlFor="senderName">Sender Name</label>
          <input id="senderName" {...register("senderName")} />
          <div className="error">{errors.senderName?.message}</div>
        </div>
        <div>
          <label htmlFor="senderEmail">Sender Email</label>
          <input id="senderEmail" {...register("senderEmail")} type="email" />
          <div className="error">{errors.senderEmail?.message}</div>
        </div>
        <div>
          <label htmlFor="senderPhone">Sender Phone</label>
          <input id="senderPhone" {...register("senderPhone")} type="tel" />
          <div className="error">{errors.senderPhone?.message}</div>
        </div>
      </FormGrid>
    </FormSection>
  );
};

export default InvoiceSender;
