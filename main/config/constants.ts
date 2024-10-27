export const CART_KEY = "themediumcart";
export const POS_CART_KEY = "themediumcart-pos-cart";
export const DUMMY_ID = "FC6723757651DB74";
export const CHECKOUT = "themediumcart-checkout";
export const CURRENCY_CODE = "INR";
export const LOCALE = "en";
export const CURRENCY_OPTIONS = {
  formation: "en-US",
  fractions: 2,
};

export const ROW_PER_PAGE_OPTIONS = [
  {
    value: 5,
    name: "5",
  },
  {
    value: 10,
    name: "10",
  },
  {
    value: 15,
    name: "15",
  },
  {
    value: 20,
    name: "20",
  },
];

export const ROLES = {
  Administrator: "Administrator",
  Manager: "Manager",
  Sales: "Sales",
  Support: "Support",
  Developer: "Developer",
  HRD: "HR Department",
  RestrictedUser: "Restricted User",
  Customer: "Customer",
} as const;
