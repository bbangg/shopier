import type { Currency, FulfillmentStatus, PaginationParams, PaymentMethod, ProductType } from './common.ts';

export interface OrderTotals {
  subtotal: string;
  shipping: string;
  discount: string;
  total: string;
}

export interface OrderDiscount {
  id: string;
  method: 'discountCode' | 'automaticDiscount';
}

export interface OrderShippingInfo {
  firstName: string;
  lastName: string;
  nationalId?: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  district: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface OrderBillingInfo extends OrderShippingInfo {
  taxOffice?: string;
  taxNumber?: string;
}

export interface OrderLineItem {
  productId: string;
  title: string;
  type: ProductType;
  selection?: Array<{
    id: string;
    title: string;
    variationTitle: string;
  }>;
  options?: Array<{
    id: string;
    title: string;
  }>;
  quantity: number;
  price: string;
  total: string;
}

export interface OrderShipping {
  orderId: string;
  status: 'shipped' | 'notShipped';
  method: 'standard' | 'contracted';
  type: 'firstShipment' | 'secondShipment' | 'returnShipment';
  dateCreated: string;
  dateDispatched?: string;
  company: string;
  code: string;
  trackingNumber?: string;
  trackingUrl?: string;
  size?: string;
  sizeUnit?: string;
  weight?: string;
  weightUnit?: string;
  cost?: string;
  currency?: Currency;
}

export interface OrderRefundSummary {
  id: string;
  type: 'full' | 'partial';
  status: 'pending' | 'failed' | 'succeeded';
  dateCreated: string;
  dateRefunded?: string;
  total: string;
}

export interface Order {
  id: string;
  status: FulfillmentStatus;
  paymentStatus: 'paid' | 'unpaid';
  installments: boolean;
  dateCreated: string;
  currency: Currency;
  paymentMethod: PaymentMethod;
  totals: OrderTotals;
  discounts: OrderDiscount[];
  shippingInfo: OrderShippingInfo;
  billingInfo: OrderBillingInfo;
  note: string;
  lineItems: OrderLineItem[];
  fulfillments: OrderShipping[];
  returns: OrderShipping[];
  refunds: OrderRefundSummary[];
}

export interface UpdateOrderInput {
  status: FulfillmentStatus;
}

export interface ListOrdersParams extends PaginationParams {
  dateStart?: string;
  dateEnd?: string;
  fulfillmentStatus?: FulfillmentStatus;
  refundType?: 'none' | 'partial' | 'full';
  customerEmail?: string;
  customerPhone?: string;
  productId?: string;
}
