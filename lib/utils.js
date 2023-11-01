export const currencyFormatter = (amount) => {
 const formatter = Intl.NumberFormat("INR", {
  currency: "INR",
  style: "currency"
 })

 return formatter.format(amount);
}