# Shopier Node.js SDK

[![npm version](https://img.shields.io/npm/v/@bbangg/shopier.svg?style=flat-square)](https://www.npmjs.com/package/@bbangg/shopier)
[![npm downloads](https://img.shields.io/npm/dm/@bbangg/shopier.svg?style=flat-square)](https://www.npmjs.com/package/@bbangg/shopier)
[![license](https://img.shields.io/npm/l/@bbangg/shopier.svg?style=flat-square)](https://github.com/bbangg/shopier/blob/main/LICENSE)

Unofficial Shopier SDK for Node.js.

## Installation

```bash
npm install @bbangg/shopier
```

## Quick Start

```typescript
import { ShopierClient } from '@bbangg/shopier';

const client = new ShopierClient({
  accessToken: 'your_personal_access_token',
});

// Create a product
const product = await client.products.create({
  title: 'Awesome T-Shirt',
  type: 'physical',
  priceData: {
    currency: 'TRY',
    price: '299.90',
  },
  shippingPayer: 'buyerPays',
  media: [{ type: 'image', url: 'https://example.com/image.jpg', placement: 1 }]
});

console.log(`Product created with ID: ${product.id}`);
console.log(`Product link: ${product.url}`);
```

## Features

- **Type-Safe by Design**: Full TypeScript support for all API resources and models.
- **Resource-Oriented**: Logical organization mirroring Shopier's API structure.
- **Auto-Retry & Rate Limiting**: Intelligent handling of API limits and transient errors.
- **Webhook Utilities**: Built-in validation helper for secure payment notifications.
- **Zero Dependencies**: Lightweight and optimized for modern Node.js environments.

## Usage

### Resource Clients

The SDK provides sub-clients for every Shopier resource. For example, to manage products:

```typescript
import { ShopierClient } from '@bbangg/shopier';

const client = new ShopierClient({ accessToken: 'YOUR_PAT' });

const product = await client.products.create({
  title: 'Example Product',
  type: 'physical',
  priceData: { currency: 'TRY', price: '100.00' },
  shippingPayer: 'sellerPays',
  media: [{ type: 'image', url: 'https://...', placement: 1 }]
});

console.log(product.id, product.url);
```

### Webhook Validation

Shopier sends webhooks for payment events. Use the `Webhook` class to verify the authenticity of these requests:

```typescript
import { Webhook } from '@bbangg/shopier';

const webhook = new Webhook({ token: 'YOUR_WEBHOOK_TOKEN' });

// In your Express handler
const signature = req.headers['shopier-signature'];
const body = req.body; // Ensure raw body or parsed JSON

if (webhook.validate(body, signature)) {
  console.log('Valid webhook received!', body);
} else {
  console.error('Invalid signature');
}
```

## Known Issues

- **Resource Limitations**: Some resources (e.g., `products.list`) may return an "Access to this resource on the server is denied" error. This is likely due to account-specific API restrictions. We recommend contacting Shopier support if you encounter this.
- **Webhook Gateway Timeouts**: Creating duplicate webhook configurations for the same event type might cause Shopier's API to return a Gateway Timeout. We recommend checking existing webhooks before creating new ones.

## License

MIT
