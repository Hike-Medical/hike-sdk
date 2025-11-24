# @hike/sdk-next-mantine

Mantine UI implementation of Hike SDK components for Next.js applications.

## Overview

This package provides Mantine-based UI components that use headless business logic from `@hike/sdk-next`. It's the Mantine-specific implementation layer for the Hike SDK.

## Installation

```bash
pnpm add @hike/sdk-next-mantine
```

## Dependencies

This package requires:

- `@hike/sdk-next` - For headless business logic
- `@hike/ui` - For React Query hooks
- Mantine v7 packages

## Usage

```tsx
import { Login } from "@hike/sdk-next-mantine";

export default function LoginPage() {
  return <Login company={{ id: "...", name: "...", slug: "..." }} />;
}
```

## Available Components

### Auth Components

- `Login` - Login form with email/password
- `AccountRecovery` - Account recovery flow
- `ResetPassword` - Password reset with token
- `UpdatePassword` - Change password form
- `TwoFaSetup` - Setup two-factor authentication
- `TwoFaVerify` - Verify 2FA code
- `MagicLink` - Magic link authentication
- `SendOtpInput` - OTP verification component
- `PasswordCriteria` - Password strength indicator
- `GoogleLoginButton` - Google OAuth button
- `TokenInvalid` - Invalid token message
- `TokenRefresher` - Auto-refresh tokens

### UI Components

- `CompanyDisabled` - Company disabled notice
- `CopyButton` - Copy to clipboard button
- `SelectCompany` - Company selection dropdown
- `SubmitButton` - Form submit button with loading state
- `UserProfile` - User profile display
- `PostHogPageView` - PostHog page tracking

### Supplier Components

- All Orthofeet catalog components
- Generic supplier components
- Product cards, details, reviews, etc.

### Theme Utilities

- `createTheme` - Theme generator
- `createColors` - Color palette generator
- `createComponents` - Component style overrides
- `themeIconColor` - Icon color utilities

## Architecture

Components in this package:

1. Import business logic from `@hike/sdk-next` hooks
2. Use Mantine UI components for presentation
3. Handle Mantine-specific form management
4. Export ready-to-use components

Example:

```tsx
import { useLoginLogic } from '@hike/sdk-next';
import { TextInput, Button } from '@mantine/core';

export const Login = () => {
  // Headless logic from @hike/sdk-next
  const { handleSubmit, isPending } = useLoginLogic({...});

  // Mantine UI
  return (
    <form onSubmit={...}>
      <TextInput {...} />
      <Button loading={isPending}>Login</Button>
    </form>
  );
};
```

## Migration from Old @hike/sdk-next

If you were using the old `@hike/sdk-next` package:

```tsx
// Before
import { Login, createTheme } from "@hike/sdk-next";

// After
import { Login, createTheme } from "@hike/sdk-next-mantine";
```

All component imports should be updated to use `@hike/sdk-next-mantine`.
Headless utilities (analytics, logger, contexts) remain in `@hike/sdk-next`.
