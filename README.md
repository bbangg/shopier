# Shopier Node.js SDK

A fully-typed TypeScript SDK for the Shopier REST API v1.

## Features

- **Zero Runtime Dependencies** — Uses native `fetch` (Node.js 18+).
- **Fully Typed** — Comprehensive TypeScript interfaces for all API resources.
- **Resource-Oriented** — Ergonomic sub-clients (e.g., `client.products.list()`).
- **Rate-Limit Handling** — Built-in auto-retry with `Retry-After` support.
- **Pagination Support** — Easy access to pagination metadata from headers.
- **Dual ESM/CJS Output** — Compatible with both modern and legacy Node.js projects.

## Installation

```bash
npm install shopier
```

## Quick Start

```typescript
import { ShopierClient } from 'shopier';

const client = new ShopierClient({
  accessToken: 'your_personal_access_token',
});

// List products
const response = await client.products.list({ limit: 10 });
console.log(response.data); // Array of products
console.log(response.pagination); // { page: 1, limit: 10, totalPages: 5, totalItems: 48 }

// Create a product
const product = await client.products.create({
  title: 'My New Product',
  type: 'physical',
  media: [{ type: 'image', url: 'https://example.com/image.jpg', placement: 1 }],
  priceData: {
    currency: 'TRY',
    price: '100.00',
  },
  shippingPayer: 'sellerPays',
});

// Handle errors
try {
  const order = await client.orders.get('invalid-id');
} catch (error) {
  if (error instanceof ShopierNotFoundError) {
    console.error('Order not found');
  }
}
```

## Resources

The SDK provides sub-clients for all Shopier API resources:

- `client.products`
- `client.orders`
- `client.categories`
- `client.variations`
- `client.selections`
- `client.discountCodes`
- `client.automaticDiscounts`
- `client.shippings`
- `client.webhooks`
- `client.balance`
- `client.payouts`
- `client.refunds`
- `client.shop`

## Configuration

```typescript
const client = new ShopierClient({
  accessToken: '...',
  baseUrl: 'https://api.shopier.com/v1', // Optional
  maxRetries: 3, // Optional: Number of automatic retries on rate limit (429)
});
```

## License

MIT
