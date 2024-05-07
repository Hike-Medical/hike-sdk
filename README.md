# Hike SDK

The Hike SDK provides developers with a robust set of APIs to interact with our healthcare manufacturing effectively. It is designed for both server-side and client-side TypeScript environments, ensuring flexible integration into various web applications.

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

To use the Hike SDK, you must first initialize it with your configuration. This is done by providing an API key, the application environment, application ID, and version as follows:

```javascript
// utils/hikeClient.ts
import hike from '@hike/sdk';

export default hike.init({
  apiKey: process.env.HIKE_API_KEY,
  appEnv: process.env.NODE_ENV,
  appId: '@hike/my-web', // or process.env.npm_package_name
  appVersion: '1.0.0' // or process.env.npm_package_version
  companyId: '***'
});
```

### Usage

Once initialized, you can use the SDK to perform various operations. For example, to find a patient by their ID:

```javascript
import hikeClient from '@/utils/hikeClient';
const patient = await hikeClient.services.findPatientById('Abc123');
```

Or using destructuring:

```javascript
const { findPatientById } = await hikeClient.services;
const patient = await findPatientById('Abc123');
```

### Client-Side Integration

For client-side applications, initialize the SDK on the server-side and then wrap your root application component with the `HikeProvider` to ensure all server and client sub-components have access to the configured SDK:

```javascript
// Inside your root App or Layout component
import hikeClient from '@/utils/hikeClient';
import { HikeProvider } from '@hike/sdk/ui';

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
