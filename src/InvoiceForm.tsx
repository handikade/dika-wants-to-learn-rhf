import FormDivider from "@/components/FormDivider";
import FormTitle from "@/components/FormTitle";
import FormVStack from "@/components/FormVStack";
import InvoiceDetail from "@/components/forms/InvoiceDetail";
import InvoiceItems from "@/components/forms/InvoiceItems";
import InvoiceReceiver from "@/components/forms/InvoiceReceiver";
import InvoiceSender from "@/components/forms/InvoiceSender";
import InvoiceTotal from "@/components/forms/InvoiceTotal";
import {
  InvoiceFormSchema,
  type InvoiceFormValues,
} from "@/schemas/invoice-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export default function InvoiceForm() {
  const methods = useForm<InvoiceFormValues>({
    resolver: zodResolver(InvoiceFormSchema),
    defaultValues: {
      items: [{ name: "", price: 0, quantity: 1, discount: 0 }],
    },
    mode: "onBlur",
  });
  const { handleSubmit } = methods;

  const onSubmit = async (values: InvoiceFormValues) => {
    console.log(values);
  };

  return (
    <div>
      <FormTitle>Invoice Form</FormTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormVStack>
            <InvoiceSender />
            <FormDivider />
            <InvoiceReceiver />
            <FormDivider />
            <InvoiceDetail />
            <FormDivider />
            <InvoiceItems />
          </FormVStack>
          <hr />
          <InvoiceTotal />
          <hr />
          <div style={{ textAlign: "center" }}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </FormProvider>
      <hr />
    </div>
  );
}
