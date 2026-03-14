import type { HttpClient } from '../http.ts';
import type { CreateWebhookInput, WebhookResponse } from '../types/webhook.ts';

export class WebhooksResource {
  constructor(private http: HttpClient) {}

  async list(): Promise<WebhookResponse[]> {
    return this.http.get<WebhookResponse[]>('/webhooks');
  }

  async create(data: CreateWebhookInput): Promise<WebhookResponse> {
    return this.http.post<WebhookResponse>('/webhooks', data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete<void>(`/webhooks/${id}`);
  }
}
