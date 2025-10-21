# Supplier Catalogs

Next.js-specific supplier catalog implementations that can be shared across apps (insoles-web, consumer-web).

## Structure

Each supplier catalog follows this pattern:

```
suppliers/{supplier-name}/
├── components/           # React components
│   ├── {Supplier}Catalog.tsx
│   ├── {Supplier}Review.tsx
│   └── ... (sub-components)
├── utils/               # Supplier-specific utilities
│   └── attributeHelpers.ts
└── index.ts            # Public exports
```

## Dependencies

Supplier catalogs use existing SDK infrastructure:

- **Types**: `@hike/types` (platform-agnostic)
- **Services**: `@hike/services` (platform-agnostic)
- **Hooks**: `@hike/ui` (React-based, works with React Native)
- **UI Components**: `@hike/sdk-next` (Next.js-specific)

This separation allows:

- React Native apps to use types, services, and hooks
- Next.js apps to use high-level catalog components

## Standard Interface

All supplier catalogs implement:

```typescript
interface SupplierCatalogProps {
  supplierId: string;
  onAddToCart: (sku: string, name: string, metadata?: Record<string, unknown>) => void;
  multiplier?: number;
  isLoading?: boolean;
}

interface SupplierReviewProps {
  sku: string;
  supplierId: string;
  multiplier?: number;
}
```

## Orthofeet Example

### In insoles-web (Form Integration)

```typescript
import { OrthofeetCatalog } from '@hike/sdk-next';

<OrthofeetCatalog
  supplierId="orthofeet-id"
  orthofeetSupplierId={appConfig.orthofeetSupplierId}
  orthofeetInventoryBuffer={appConfig.orthofeetInventoryBuffer}
  onAddToCart={(sku, name, prefabQty) => {
    // Handle form submission
    upsertSubmission({ sku, name, prefabQty });
  }}
  prefabPrice={100}
  multiplier={0.25}
  isLoading={isSaving}
/>
```

### In consumer-web (Checkout Upsell)

```typescript
import { OrthofeetCatalog } from '@hike/sdk-next';

<OrthofeetCatalog
  supplierId="orthofeet-id"
  onAddToCart={(sku, name) => {
    // Add to checkout cart
    addItemToCart(sku, name);
  }}
  multiplier={0}
/>
```

### Review Component

```typescript
import { OrthofeetReview } from '@hike/sdk-next';

<OrthofeetReview
  sku="12345"
  supplierId="orthofeet-id"
  multiplier={0.25}
/>
```

## Adding a New Supplier

1. Create types in `@hike/types/src/dto/supplier/`
2. Create service methods in `@hike/services/src/api/supplier.service.ts`
3. Create React Query hooks in `@hike/ui/src/hooks/supplier/`
4. Create Next.js catalog in `@hike/sdk-next/src/suppliers/{supplier}/`
5. Export from `@hike/sdk-next/src/index.ts`

## Architecture Decisions

### Why Split Types/Services/Hooks from Components?

1. **Platform Independence**: Types, services, and hooks work with React Native
2. **Reusability**: Different UI implementations can share the same data layer
3. **Bundle Size**: Apps only using data layer don't need Next.js-specific components
4. **Testing**: Data layer can be tested independently of UI

### Why Isolate Supplier Logic?

Each supplier has unique:

- Attribute mappings (e.g., Orthofeet uses "style_name" for product families)
- Inventory systems (e.g., Orthofeet real-time inventory API)
- Pricing models (e.g., prefab insert bundles)
- UI requirements (e.g., color/width/size selectors)

Isolating this logic prevents coupling and makes it easy to add new suppliers.
