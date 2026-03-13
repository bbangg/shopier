export type WebhookEvent = 
  | 'product.created'
  | 'product.updated'
  | 'order.created'
  | 'order.addressUpdated'
  | 'order.fulfilled'
  | 'refund.requested'
  | 'refund.updated';

export interface Webhook {
  id: string;
  url: string;
  event: WebhookEvent;
  status: 'active' | 'paused';
  dateCreated: string;
}

export interface CreateWebhookInput {
  url: string;
  event: WebhookEvent;
}
