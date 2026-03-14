import * as nodeCrypto from 'node:crypto';
import type { WebhookPayload } from './types/webhook.ts';

export interface WebhookOptions {
  token: string;
}

/**
 * Webhook utility class for validating Shopier webhook signatures.
 */
export class Webhook {
  private readonly token: string;

  constructor(options: WebhookOptions) {
    this.token = options.token;
  }

  /**
   * Validates the webhook signature.
   * 
   * @param data The webhook payload (object or string)
   * @param expectedSignature The signature from the 'shopier-signature' header
   * @returns boolean True if the signature is valid
   */
  validate<T = WebhookPayload>(data: any, expectedSignature: string | undefined | null): data is T {
    if (!expectedSignature) {
      return false;
    }

    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    const hash = nodeCrypto
      .createHmac('sha256', this.token)
      .update(payload)
      .digest('hex');

    return hash === expectedSignature;
  }
}
