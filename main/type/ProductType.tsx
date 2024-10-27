interface Variation {
  color: string;
  colorCode: string;
  colorImage: string;
  image: string;
}

// export interface ProductType {
//   id: string;
//   category: string;
//   type: string;
//   name: string;
//   gender: string;
//   new: boolean;
//   sale: boolean;
//   rate: number;
//   price: number;
//   originPrice: number;
//   brand: string;
//   sold: number;
//   quantity: number;
//   quantityPurchase: number;
//   sizes: Array<string>;
//   variation: Variation[];
//   thumbImage: Array<string>;
//   images: Array<string>;
//   description: string;
//   action: string;
//   slug: string;
// }

export interface ProductType {
  name: string;
  price: number;
  mrp: number;
  sellerId: {
    shopaddress: {
      pincode: string;
      address1: string;
      address2: string;
      landmark: string;
      city: string;
      state: string;
    };
    deliverypartner: {
      personal: {
        name: string;
        rate: string;
        have: boolean;
      };
      partner: {
        email: string;
        password: string;
        warehouses: {
          warehouse_name: string;
          name: string;
          address: string;
          address_2: string;
          city: string;
          state: string;
          pincode: string;
          phone: string;
          default: boolean;
          _id: string;
          id: string;
        }[];
      };
    };
    _id: string;
    shopname: string;
    username: string;
    id: string;
  };
  brand: string;
  category: string;
  images: string[];
  desc: string;
  stock: number;
  tags: string[];
  colors: {
    name: string;
    code: string;
    available: boolean;
  }[];
  sizes: {
    size: string;
    available: boolean;
  }[];
  quantity: number;
  instaId: string;
  weight: string;
  length: string;
  breadth: string;
  height: string;
  isDeleted: boolean;
  updatedAt: string;
  createdAt: string;
  id: string;
}
