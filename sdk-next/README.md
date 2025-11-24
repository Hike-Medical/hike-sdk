# @hike/sdk-next

Headless core package for Hike SDK Next.js applications. Provides framework-agnostic business logic, hooks, and utilities.

## Overview

This package has been refactored to be UI-framework agnostic. It contains:

- **Auth Logic**: Headless hooks for authentication flows (login, 2FA, password reset, etc.)
- **Contexts**: Framework-agnostic providers (DataDog, PostHog, Pylon, Network, Scan)
- **Hooks**: Behavioral hooks (useIsMobile, useMobilePlatform, useNetwork)
- **Utils**: Analytics, logging, and media utilities
- **Supplier Logic**: Headless adapters for product catalogs

## Architecture

The Hike SDK follows a headless pattern:

```
@hike/sdk-next (headless core)
    ├── Auth hooks & logic
    ├── Contexts & providers
    ├── Media utilities
    └── Supplier adapters
        ↓ Used by
    ┌────────────────────────────────┐
    │  @hike/sdk-next-mantine        │  ← Mantine UI components
    │  @hike/sdk-next-shadcn         │  ← Shadcn UI components
    └────────────────────────────────┘
```

## Installation

```bash
pnpm add @hike/sdk-next
```

## Usage

### Auth Hooks

```tsx
import { useLogin } from '@hike/sdk-next';
import { validateEmail } from '@hike/sdk';

function MyCustomLoginForm() {
  const { handleSubmit, isPending } = useLogin({
    onSuccess: async () => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    }
  });

  // Use with your own UI framework
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ email: '...', password: '...' });
      }}
    >
      {/* Your custom UI - use validateEmail directly from @hike/sdk */}
    </form>
  );
}
```

### Available Auth Hooks

- `useLogin` - Email/password login
- `useAccountRecovery` - Account recovery flow
- `useResetPassword` - Password reset with token
- `useUpdatePassword` - Change password
- `useTwoFaSetup` - Setup 2FA
- `useTwoFaVerify` - Verify 2FA code
- `useMagicLink` - Magic link authentication
- `useSendOtp` - OTP verification
- `usePasswordCriteria` - Password validation state
- `useGoogleLoginUrl` - Generate Google OAuth URL

**Note**: Validation functions (`validateEmail`, `validatePassword`, etc.) are available directly from `@hike/sdk` - no need for wrapper hooks.

## UI Implementations

This package provides headless logic only. For complete UI components, use:

- **@hike/sdk-next-mantine** - Mantine UI components (existing apps)
- **@hike/sdk-next-shadcn** - Shadcn UI components (new apps)

Both packages use the same business logic from this core package.

## Migration Guide

If you're upgrading from the old `@hike/sdk-next`:

1. UI components moved to `@hike/sdk-next-mantine`
2. Update your imports:

   ```tsx
   // Before
   import { Login } from '@hike/sdk-next';

   // After
   import { Login } from '@hike/sdk-next-mantine';
   ```

3. Headless logic remains in `@hike/sdk-next` (no change needed for contexts, hooks, utils)

## Benefits

- **Framework Agnostic**: Use any UI library (Mantine, Shadcn, custom)
- **Code Reuse**: Share business logic across different UI implementations
- **Type Safety**: Full TypeScript support with shared types
- **Testability**: Test business logic independent of UI
- **Flexibility**: Easy to add new UI frameworks
