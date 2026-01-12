export const calculateDiscountAmount = ({
  subtotal,
  rate,
}: {
  subtotal: number;
  rate: number;
}) => {
  return subtotal * (rate / 100);
};

export const calculateItemSubtotal = ({
  price,
  quantity,
}: {
  price: number;
  quantity: number;
}) => price * quantity;

export const calculateItemTotal = ({
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
