# Hike SDK Agent Guide

This repository contains Hike's TypeScript SDK that is shared across the platform and ecosystem. Use this guide when working with Codex in this repo.

## Repository Overview

- `@hike/auth`: Authentication-related logic and components. Handles user login, token management, authorization, and session handling.
- `@hike/config`: Shared ESLint, Prettier, and TypeScript configuration, defining consistent code-quality rules, standards, and linting guidelines across the monorepo.
- `@hike/sdk`: Core SDK functionality. Centralized client interfaces, API wrappers, helpers, and common utilities used across different applications and services.
- `@hike/sdk-next`: Provides shared components, hooks, and utilities specifically optimized for Next.js applications. Includes code reuse patterns for server-side rendering (SSR) and client-side rendering (CSR).
- `@hike/sdk-next-edge`: Contains specialized components and utilities compatible with Next.js edge runtimes, such as middleware functions and other restricted edge-specific logic suitable for serverless or edge environments.
- `@hike/sdk-stripe`: Stripe payment integrations and utilities, including type-safe wrappers around Stripe API interactions, checkout flows, and payment processing logic.
- `@hike/services`: Type-safe wrappers around HTTP endpoints and backend API integrations. Facilitates consistent data fetching, error handling, and interaction with APIs through strongly typed interfaces.
- `@hike/types`: Centralized, reusable TypeScript type definitions. Contains fundamental types and schemas that are shared across the entire repository to maintain consistency and type safety.
- `@hike/ui`: Cross-platform UI components, styling, and theming utilities. Includes reusable React components that maintain visual consistency and UX guidelines throughout applications.
- `@hike/utils`: Common utility functions, helpers, and small reusable modules that provide generic functionalities used across different packages in the repository.

## Branching

- Use the `dev` branch as the base branch.
- When creating branches, nest under `codex` and use the following naming convention: `codex/{short-description}`.

## General Guidelines

- Write concise, elegant, and well‑tested TypeScript.
- Prefer functional patterns and higher‑order functions.
- Follow established code conventions and SOLID principles.
- Prioritize scalability, maintainability, and security.
- Do not use `any` or cast with `as` in TypeScript without good reason.
- Avoid adding third-party dependencies unless necessary; try to use existing packages.
- Create tests for new code added unless it's UI code or unnecessary; mostly for complex logic or highly used or low level utilities.
- When creating a PR, add the original prompt in the PR description.
- Do not make changes to `types/prisma/index.d.ts` as this is generated file from the Prisma schema.
- Follow the lint and formatting rules defined for the project.
