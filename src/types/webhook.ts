import type { Order, OrderBillingInfo } from './order.ts';

export type WebhookEvent = 
  | 'product.created'
  | 'product.updated'
  | 'order.created'
  | 'order.addressUpdated'
  | 'order.fulfilled'
  | 'refund.requested'
  | 'refund.updated';

export interface WebhookResponse {
  id: string;
  url: string;
  event: WebhookEvent;
  status: 'active' | 'paused';
  token?: string;
  dateCreated: string;
}

export interface CreateWebhookInput {
  url: string;
  event: WebhookEvent;
}

/**
 * The payload received from Shopier webhooks for order-related events.
 */
export interface WebhookOrderPayload extends Omit<Order, 'billingInfo'> {
  billingInfo: Partial<OrderBillingInfo>;
}

/**
 * Union type for all possible webhook payloads.
 */
export type WebhookPayload = WebhookOrderPayload;
