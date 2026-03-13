import type { HttpClient } from '../http.ts';
import type { CreateWebhookInput, Webhook } from '../types/webhook.ts';

export class WebhooksResource {
  constructor(private http: HttpClient) {}

  async list(): Promise<Webhook[]> {
    return this.http.get<Webhook[]>('/webhooks');
  }

  async create(data: CreateWebhookInput): Promise<Webhook> {
    return this.http.post<Webhook>('/webhooks', data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete<void>(`/webhooks/${id}`);
  }
}
