# Hike SDK

The Hike SDK provides developers with a robust set of APIs to interact with our healthcare manufacturing effectively. It is designed for both server-side and client-side TypeScript environments, ensuring flexible integration into various web applications.

## Repository Overview

- `@hike/auth`: Authentication-related logic and components. Handles user login, token management, authorization, and session handling.
- `@hike/eslint-config`: Shared ESLint configuration, defining consistent code-quality rules, standards, and linting guidelines across the monorepo.
- `@hike/sdk`: Core SDK functionality. Centralized client interfaces, API wrappers, helpers, and common utilities used across different applications and services.
- `@hike/sdk-next`: Provides shared components, hooks, and utilities specifically optimized for Next.js applications. Includes code reuse patterns for server-side rendering (SSR) and client-side rendering (CSR).
- `@hike/sdk-next-edge`: Contains specialized components and utilities compatible with Next.js edge runtimes, such as middleware functions and other restricted edge-specific logic suitable for serverless or edge environments.
- `@hike/sdk-stripe`: Stripe payment integrations and utilities, including type-safe wrappers around Stripe API interactions, checkout flows, and payment processing logic.
- `@hike/services`: Type-safe wrappers around HTTP endpoints and backend API integrations. Facilitates consistent data fetching, error handling, and interaction with APIs through strongly typed interfaces.
- `@hike/types`: Centralized, reusable TypeScript type definitions. Contains fundamental types and schemas that are shared across the entire repository to maintain consistency and type safety.
- `@hike/ui`: Cross-platform UI components, styling, and theming utilities. Includes reusable React components that maintain visual consistency and UX guidelines throughout applications.
- `@hike/utils`: Common utility functions, helpers, and small reusable modules that provide generic functionalities used across different packages in the repository.

## Getting Started

### Prerequisites

Before you begin, you need to have Node.js installed on your machine. Additionally, ensure you have an API key, which is essential for authenticating requests made through this SDK.

### Installation

Install the SDK via npm:

```bash
npm install @hike/sdk
```

Or using yarn:

```bash
yarn add @hike/sdk
```

Or using pnpm:

```bash
pnpm add @hike/sdk
```

### Initialization

For client-side applications, initialize the SDK on the server-side and then wrap your root application component with the `HikeProvider` to ensure all server and client sub-components have access to the configured SDK:

```javascript
// Inside your root App or Layout component
import hikeClient from '@/utils/hikeClient';
import { HikeProvider } from '@hike/ui';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HikeProvider config={hikeClient.safeConfig}>{children}</HikeProvider>
      </body>
    </html>
  );
}
```

### Accessing SDK Functions After Intialization

Once your application is wrapped in a `HikeProvider`, you can import and use SDK functions anywhere in your component tree.

```typescript
import { statsForEvaluations, type EvaluationsStats } from '@hike/sdk';

export const EvaluationStats = () => {
  const [stats, setStats] = useState<EvaluationsStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await statsForEvaluations();
      setStats(response);
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p>Loading evaluation stats...</p>;
  }

  return (
    <div>
        <h1>Evaluation Stats</h1>
        <p>Diabetic: {stats.diabeticCount}</p>
    </div>
  );
};
```

## Contributing

Contributions are welcomed and appreciated; whether it's fixing bugs, improving documentation, implementing new features, or sharing your ideas.

### Ways to Contribute

- **Report Bugs:** If you encounter any bugs or issues, please [open an issue](https://github.com/Hike-Medical/hike-sdk/issues) and provide detailed information to help us reproduce and resolve the problem.

- **Suggest Enhancements:** If you have an idea for a new feature or enhancement, we'd love to hear it! [Open an issue](https://github.com/Hike-Medical/hike-sdk/issues) and describe your proposal in detail.

- **Submit Pull Requests:** If you've implemented a bug fix or a new feature, feel free to [submit a pull request](https://github.com/Hike-Medical/hike-sdk/pulls). Make sure to provide a clear description of your changes.

- **Improve Documentation:** Documentation is crucial for any project. If you find areas where the documentation can be improved, please [submit a pull request](link-to-pulls) or [open an issue](link-to-issues) to let us know.

- **Share Your Expertise:** If you're knowledgeable about a particular aspect of the project, consider sharing your expertise by answering questions in the [issue section](https://github.com/Hike-Medical/hike-sdk/issues) or contributing by updating the [readme](https://github.com/Hike-Medical/hike-sdk).

## License

Distributed under the Apache License 2.0. See [LICENSE](https://github.com/Hike-Medical/hike-sdk/blob/main/packages/LICENSE.txt) for more information.
