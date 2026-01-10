import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const InvoiceSchema = z.object({
  price: z.number(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

type InvoiceFormValues = z.infer<typeof InvoiceSchema>;

export default function InvoiceForm() {
  const { register, control, handleSubmit } = useForm<InvoiceFormValues>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      price: 0,
      quantity: 0,
    },
    mode: "onBlur",
  });

  const price = useWatch({ control, name: "price" });
  const quantity = useWatch({ control, name: "quantity" });

  const onSubmit = async (values: InvoiceFormValues) => {
    console.log(values);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "grid", gap: 16 }}
      >
        <input {...register("price")} />
        <input {...register("quantity")} />
        <button type="submit">Submit</button>
      </form>
      <div>Total: {price * quantity}</div>
    </div>
  );
}
