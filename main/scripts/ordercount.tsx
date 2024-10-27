export const calculateTotalQuantity = (orderItems: any) => {
  let totalQuantity = 0;
  for (const item of orderItems) {
    totalQuantity += item.quantity;
  }
  return totalQuantity;
};
