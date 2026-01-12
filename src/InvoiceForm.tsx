import FormDivider from "@/components/FormDivider";
import FormSection from "@/components/FormSection";
import FormSectionTitle from "@/components/FormSectionTitle";
import FormTitle from "@/components/FormTitle";
import FormVStack from "@/components/FormVStack";
import InvoiceDetail from "@/components/forms/InvoiceDetail";
import InvoiceItemRow from "@/components/forms/InvoiceItemRow";
import InvoiceReceiver from "@/components/forms/InvoiceReceiver";
import InvoiceSender from "@/components/forms/InvoiceSender";
import InvoiceTotal from "@/components/forms/InvoiceTotal";
import {
  InvoiceFormSchema,
  type InvoiceFormValues,
} from "@/schemas/invoice-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

export default function InvoiceForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(InvoiceFormSchema),
    defaultValues: {
      items: [{ name: "", price: 0, quantity: 1, discount: 0 }],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (values: InvoiceFormValues) => {
    console.log(values);
  };

  const addNewRow = (
    {
      name,
      price,
      quantity,
      discount,
    }: { name: string; price: number; quantity: number; discount: number } = {
      name: "",
      price: 0,
      quantity: 1,
      discount: 0,
    }
  ) => {
    append({
      name,
      price,
      quantity,
      discount,
    });
  };

  return (
    <div>
      <FormTitle>Invoice Form</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormVStack>
          <InvoiceSender register={register} errors={errors} />

          <FormDivider />

          <InvoiceReceiver register={register} errors={errors} />

          <FormDivider />

          <InvoiceDetail register={register} errors={errors} />

          <FormDivider />

          <FormSection>
            <FormSectionTitle>Invoice Items</FormSectionTitle>
            <table border={1} className="mb-12">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>TOTAL</th>
                  <th style={{ width: 32 }}></th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <InvoiceItemRow
                    key={field.id}
                    index={index}
                    fieldId={field.id}
                    register={register}
                    control={control}
                    errors={errors}
                    onRemove={remove}
                  />
                ))}
              </tbody>
            </table>
            <div className="flex-end">
              <button type="button" onClick={() => addNewRow()}>
                Add Item
              </button>
            </div>
          </FormSection>
        </FormVStack>

        <hr />

        <InvoiceTotal control={control} />

        <hr />

        <div style={{ textAlign: "center" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />
    </div>
  );
}
