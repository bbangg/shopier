import type { Currency, PaginationParams } from './common.ts';

export interface Shipping {
  orderId: string;
  status: 'shipped' | 'notShipped';
  method: 'standard' | 'contracted';
  type: 'firstShipment' | 'secondShipment' | 'returnShipment';
  dateCreated: string;
  dateDispatched?: string;
  company: 'yurtici' | 'mng' | 'ptt' | 'aras' | 'surat' | 'ups' | 'fedex' | 'dhl' | 'tnt' | 'pts' | 'aramex' | 'interGlobal' | 'other';
  code: string;
  trackingNumber?: string;
  trackingUrl?: string;
  size?: string;
  sizeUnit?: 'deci';
  weight?: string;
  weightUnit?: 'gram' | 'kilogram';
  cost?: string;
  currency?: Currency;
}

export interface CreateShippingInput {
  orderId: string;
  company: string;
  type: 'firstShipment' | 'secondShipment';
}

export interface ListShippingsParams extends PaginationParams {}
