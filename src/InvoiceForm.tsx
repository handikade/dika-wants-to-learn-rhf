import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";
import FormDivider from "./components/FormDivider";
import FormSection from "./components/FormSection";
import FormSectionTitle from "./components/FormSectionTitle";
import FormTitle from "./components/FormTitle";
import FormVStack from "./components/FormVStack";

// #region SCHEMAS
const InvoiceItemsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be at least 1"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  discount: z
    .number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount must be at most 100"),
});
const InvoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.date().min(new Date(), "Invoice date must be in the future"),
  dueDate: z.date().min(new Date(), "Due date must be in the future"),

  senderName: z.string().min(1, "Sender name is required"),
  senderEmail: z.email("Sender email is invalid"),
  senderPhone: z.string().min(1, "Sender phone is required"),

  receiverName: z.string().min(1, "Receiver name is required"),
  receiverEmail: z.email("Receiver email is invalid"),
  receiverPhone: z.string().min(1, "Receiver phone is required"),

  items: z.array(InvoiceItemsSchema),
});
type InvoiceFormValues = z.infer<typeof InvoiceSchema>;
// #endregion

// #region helpers
const calculateDiscountAmount = ({
  subtotal,
  rate,
}: {
  subtotal: number;
  rate: number;
}) => {
  return subtotal * (rate / 100);
};

const calculateItemSubtotal = ({
  price,
  quantity,
}: {
  price: number;
  quantity: number;
}) => price * quantity;

const calculateItemTotal = ({
  price,
  quantity,
  discountRate,
}: {
  price: number;
  quantity: number;
  discountRate: number;
}) => {
  const subtotal = calculateItemSubtotal({ price, quantity });
  const discount = calculateDiscountAmount({ subtotal, rate: discountRate });
  return subtotal - discount;
};
// #endregion

// #region formatter
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
// #endregion

export default function InvoiceForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      items: [{ name: "", price: 0, quantity: 1, discount: 0 }],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const items = useWatch({ control, name: "items" }) ?? [];
  const totalItems = items.reduce(
    (acc, item) =>
      acc +
      calculateItemTotal({
        price: item.price,
        quantity: item.quantity,
        discountRate: item.discount,
      }),
    0
  );

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
          <FormSection>
            <FormSectionTitle>Bill From</FormSectionTitle>
            <div className="form-grid">
              <div>
                <label htmlFor="senderName">Sender Name</label>
                <input id="senderName" {...register("senderName")} />
                <div className="error">{errors.senderName?.message}</div>
              </div>
              <div>
                <label htmlFor="senderEmail">Sender Email</label>
                <input id="senderEmail" {...register("senderEmail")} />
                <div className="error">{errors.senderEmail?.message}</div>
              </div>
              <div>
                <label htmlFor="senderPhone">Sender Phone</label>
                <input id="senderPhone" {...register("senderPhone")} />
                <div className="error">{errors.senderPhone?.message}</div>
              </div>
            </div>
          </FormSection>

          <FormDivider />

          <FormSection>
            <FormSectionTitle>Bill To</FormSectionTitle>
            <div className="form-grid">
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
            </div>
          </FormSection>

          <FormDivider />

          <FormSection>
            <FormSectionTitle>Invoice Detail</FormSectionTitle>
            <div className="form-grid">
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
            </div>
          </FormSection>

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
                {fields.map((field, index) => {
                  const price = items[index]?.price ?? 0;
                  const quantity = items[index]?.quantity ?? 0;
                  const discountRate = items[index]?.discount ?? 0;
                  const rowTotal = calculateItemTotal({
                    price,
                    quantity,
                    discountRate,
                  });

                  return (
                    <tr key={field.id}>
                      <td>
                        <input
                          id={`items-${field.id}-name`}
                          {...register(`items.${index}.name`)}
                        />
                        <div className="error">
                          {errors.items?.[index]?.name?.message}
                        </div>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name={`items.${index}.price`}
                          render={({ field: priceField }) => (
                            <NumericFormat
                              id={`items-${field.id}-price`}
                              value={priceField.value ?? 0}
                              onValueChange={(values) => {
                                priceField.onChange(values.floatValue ?? 0);
                              }}
                              thousandSeparator="."
                              decimalSeparator=","
                              prefix="Rp"
                              decimalScale={2}
                              fixedDecimalScale
                              allowNegative={false}
                              inputMode="decimal"
                            />
                          )}
                        />
                        <div className="error">
                          {errors.items?.[index]?.price?.message}
                        </div>
                      </td>
                      <td>
                        <input
                          id={`items-${field.id}-quantity`}
                          {...register(`items.${index}.quantity`, {
                            valueAsNumber: true,
                          })}
                          type="number"
                        />
                        <div className="error">
                          {errors.items?.[index]?.quantity?.message}
                        </div>
                      </td>
                      <td>
                        <input
                          id="{`items-${field.id}-discount`}"
                          {...register(`items.${index}.discount`, {
                            valueAsNumber: true,
                          })}
                          type="number"
                        />
                        <div className="error">
                          {errors.items?.[index]?.discount?.message}
                        </div>
                      </td>
                      <td>{currencyFormatter.format(rowTotal)}</td>
                      <td>
                        <button type="button" onClick={() => remove(index)}>
                          x
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
        <p>Total: {currencyFormatter.format(totalItems)}</p>
        <hr />
        <div style={{ textAlign: "center" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />
    </div>
  );
}
