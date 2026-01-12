import { currencyFormatter } from "@/utils/currency-utils";
import { calculateItemTotal } from "@/utils/invoice-utils";
import { memo, useCallback } from "react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import type {
  InvoiceFormItemValues,
  InvoiceFormValues,
} from "@/schemas/invoice-schema";

export type InvoiceItemRowProps = {
  fieldId: string;
  register: UseFormRegister<InvoiceFormValues>;
  index: number;
  errors: FieldErrors<InvoiceFormValues>;
  control: Control<InvoiceFormValues>;
  onRemove: (index: number) => void;
};

const InvoiceItemRowBase = ({
  fieldId,
  register,
  index,
  errors,
  control,
  onRemove,
}: InvoiceItemRowProps) => {
  const item = useWatch({ control, name: `items.${index}` }) as
    | InvoiceFormItemValues
    | undefined;

  const price = item?.price ?? 0;
  const quantity = item?.quantity ?? 0;
  const discountRate = item?.discount ?? 0;
  const rowTotal = calculateItemTotal({ price, quantity, discountRate });

  const handleRemove = useCallback(() => onRemove(index), [onRemove, index]);

  return (
    <tr>
      {/* NAME */}
      <td>
        <input
          id={`items-${fieldId}-name`}
          {...register(`items.${index}.name`)}
        />
        <div className="error">{errors.items?.[index]?.name?.message}</div>
      </td>
      {/* end of NAME */}

      {/* PRICE    */}
      <td>
        <Controller
          control={control}
          name={`items.${index}.price`}
          render={({ field: priceField }) => (
            <NumericFormat
              id={`items-${fieldId}-price`}
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
              onBlur={priceField.onBlur}
              getInputRef={priceField.ref}
            />
          )}
        />
        <div className="error">{errors.items?.[index]?.price?.message}</div>
      </td>
      {/* end of PRICE */}

      {/* QUANTITY */}
      <td>
        <input
          id={`items-${fieldId}-quantity`}
          {...register(`items.${index}.quantity`, {
            valueAsNumber: true,
          })}
          type="number"
        />
        <div className="error">{errors.items?.[index]?.quantity?.message}</div>
      </td>

      {/* end of QUANTITY */}

      {/* DISCOUNT */}
      <td>
        <input
          id={`items-${fieldId}-discount`}
          {...register(`items.${index}.discount`, {
            valueAsNumber: true,
          })}
          type="number"
        />
        <div className="error">{errors.items?.[index]?.discount?.message}</div>
      </td>
      {/* end of DISCOUNT */}

      {/* ROW TOTAL */}
      <td>{currencyFormatter.format(rowTotal)}</td>
      {/* end of ROW TOTAL */}

      {/* REMOVE BUTTON */}
      <td>
        <button type="button" onClick={handleRemove}>
          x
        </button>
      </td>
      {/* end of REMOVE BUTTON */}
    </tr>
  );
};

const InvoiceItemRow = memo(InvoiceItemRowBase);

export default InvoiceItemRow;
