import { z } from "zod";

export const InvoiceFormItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be at least 1"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  discount: z
    .number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount must be at most 100"),
});
export const InvoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.date().min(new Date(), "Invoice date must be in the future"),
  dueDate: z.date().min(new Date(), "Due date must be in the future"),

  senderName: z.string().min(1, "Sender name is required"),
  senderEmail: z.email("Sender email is invalid"),
  senderPhone: z.string().min(1, "Sender phone is required"),

  receiverName: z.string().min(1, "Receiver name is required"),
  receiverEmail: z.email("Receiver email is invalid"),
  receiverPhone: z.string().min(1, "Receiver phone is required"),

  items: z.array(InvoiceFormItemSchema),
});

export type InvoiceFormItemValues = z.infer<typeof InvoiceFormItemSchema>;
export type InvoiceFormValues = z.infer<typeof InvoiceFormSchema>;
