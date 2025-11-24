# @hike/sdk-next-shadcn

Shadcn UI implementation of Hike SDK authentication components for Next.js applications.

## Overview

This package provides Shadcn UI-based components that use headless business logic from `@hike/sdk-next`. It demonstrates how the decoupled architecture allows using different UI frameworks while sharing the same business logic.

## Installation

```bash
pnpm add @hike/sdk-next-shadcn
```

## Dependencies

This package requires:

- `@hike/sdk-next` - For headless business logic
- `@hike/ui` - For React Query hooks
- Shadcn UI dependencies (automatically installed)

## Usage

```tsx
import { Login } from "@hike/sdk-next-shadcn";

export default function LoginPage() {
  return <Login company={{ id: "...", name: "...", slug: "..." }} />;
}
```

## Architecture

This package demonstrates the headless pattern:

- Business logic comes from `@hike/sdk-next` hooks (useLoginLogic, useResetPasswordLogic, etc.)
- UI components use Shadcn primitives
- Form validation uses React Hook Form + Zod
- Same props interface as `@hike/sdk-next-mantine`

## Components

Currently implemented:

- `Login` - Login form with email/password

To be implemented:

- AccountRecovery
- ResetPassword
- TwoFaSetup
- TwoFaVerify
- UpdatePassword
- MagicLink
- And more...

## Tailwind Configuration

Ensure your Next.js app includes this package in Tailwind's content array:

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@hike/sdk-next-shadcn/dist/**/*.{js,jsx}"],
  // ... rest of config
};
```
