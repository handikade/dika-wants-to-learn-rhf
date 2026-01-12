import FormSection from "@/components/FormSection";
import FormSectionTitle from "@/components/FormSectionTitle";
import InvoiceItemRow from "@/components/forms/InvoiceItemRow";
import type { InvoiceFormValues } from "@/schemas/invoice-schema";
import { useFieldArray, useFormContext } from "react-hook-form";

const InvoiceItems = () => {
  const { control } = useFormContext<InvoiceFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

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
  );
};

export default InvoiceItems;
