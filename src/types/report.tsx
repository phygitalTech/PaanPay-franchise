export interface MerchantData {
  merchants: {
    merchantId: string;
    merchantDetails: {
      Fullname: string;
      email: string;
    };
    orders: {
      orderId: string;
      orderedAt: string;
      status: string;
      paymentType: string;
      price: number;
      customer: {
        Fullname: string;
      };
      orderProduct: {
        product: {
          name: string;
        };
        productSize: {
          name: string;
          price: number;
        };
        quantity: number;
        orderExtraItems: {
          ExtraItems: {
            name: string;
            price: number;
          };
        }[];
      }[];
    }[];
  }[];
}
