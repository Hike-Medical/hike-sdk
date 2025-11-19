# @hike/sdk-stedi

> Type-safe TypeScript SDK for Stedi Healthcare API - Insurance eligibility verification and Medicare lookups made simple

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE.txt)

A production-ready SDK for interacting with [Stedi's Healthcare API](https://www.stedi.com/products/healthcare), providing real-time insurance eligibility verification and Medicare Beneficiary Identifier (MBI) lookups. Built with TypeScript, featuring comprehensive error handling, automatic retries, and full X12 EDI support.

---

## ✨ Features

- 🔒 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 🏥 **Healthcare-First**: Built specifically for healthcare eligibility and Medicare workflows
- 🔄 **Smart Retries**: Automatic exponential backoff for transient failures
- 📊 **Rich Error Handling**: Detailed error codes with actionable resolution steps
- 🎯 **Zero Config**: Sensible defaults with easy customization
- 📚 **X12 Compliant**: Full support for X12 005010 service type codes
- 🚀 **Production Ready**: Used in production healthcare applications

---

## 📦 Installation

```bash
# Using pnpm (recommended for monorepos)
pnpm add @hike/sdk-stedi

# Using npm
npm install @hike/sdk-stedi

# Using yarn
yarn add @hike/sdk-stedi
```

### Requirements

- Node.js 18 or later
- TypeScript 5.0+ (for TypeScript projects)
- A valid [Stedi API key](https://www.stedi.com/docs/accounts-and-billing/authentication)

---

## 🚀 Quick Start

### Basic Eligibility Check

```typescript
import { StediClient } from '@hike/sdk-stedi';

// Initialize the client
const stedi = new StediClient({
  apiKey: process.env.STEDI_API_KEY!
});

// Check patient eligibility
const result = await stedi.eligibility.check(
  {
    memberId: '123456789A',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1980-01-15',
    gender: 'M'
  },
  {
    npi: '1234567893',
    organizationName: 'Sample Medical Clinic'
  }
);

if (result.response.isEligible) {
  console.log('✓ Patient has active coverage');
  console.log('Insurance:', result.response.insuranceTypes);
  console.log('Member ID:', result.response.subscriber?.memberId);
} else {
  console.log('✗ No active coverage found');
  console.log('Reason:', result.response.summary);
}
```

### Medicare MBI Lookup

```typescript
// Look up Medicare Beneficiary Identifier
const mbiResult = await stedi.mbiLookup.lookup({
  lastName: 'Smith',
  dateOfBirth: '1950-06-20',
  ssn: '123456789',
  npi: '1234567893'
});

console.log('Medicare MBI:', mbiResult.response.mbi);
console.log('Name:', mbiResult.response.firstName, mbiResult.response.lastName);
```

### Payer Search

```typescript
// Search for a payer by name
const payer = await stedi.payer.fetchByName('Blue Cross');

console.log('Payer Name:', payer.displayName);
console.log('Payer ID:', payer.id);
console.log('Primary Payer ID:', payer.primaryPayerId);
console.log('Stedi ID:', payer.stediId);

// Get payer by ID
const payerById = await stedi.payer.fetchById('00710');
console.log('Payer:', payerById.displayName);
```

---

## 📖 API Reference

### StediClient

The main client for interacting with Stedi's Healthcare API.

#### Constructor Options

```typescript
interface StediClientConfig {
  apiKey: string; // Your Stedi API key (required)
  baseURL?: string; // Custom base URL (default: 'https://healthcare.us.stedi.com')
  timeout?: number; // Request timeout in ms (default: 20000)
  logger?: Logger; // Optional logger for debugging
}
```

#### Example with Custom Configuration

```typescript
const stedi = new StediClient({
  apiKey: process.env.STEDI_API_KEY!,
  timeout: 30000, // 30 seconds
  logger: customLogger
});
```

---

### Eligibility Client

Check insurance eligibility for patients.

#### `eligibility.check(patient, provider, options?)`

**Parameters:**

```typescript
// Patient information
interface PatientInput {
  memberId?: string; // Insurance member ID
  firstName?: string; // Patient first name
  lastName: string; // Patient last name (required)
  dateOfBirth?: string; // Format: YYYY-MM-DD
  gender?: 'M' | 'F' | 'U'; // Patient gender
  ssn?: string; // Social Security Number
  address?: {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
}

// Provider information
interface Provider {
  npi: string; // National Provider Identifier (required)
  organizationName?: string; // Provider organization name
}

// Optional parameters
interface EligibilityCheckOptions {
  tradingPartner?: string; // Default: 'CMS' (Medicare)
  serviceTypeCodes?: string[]; // X12 service type codes
  encounterDate?: string; // Format: YYYY-MM-DD
  icd10Codes?: string[]; // Diagnosis codes
}
```

**Response:**

```typescript
interface EligibilityCheckResult {
  response: {
    isEligible: boolean; // Overall eligibility status
    hasActiveCoverage: boolean; // Active coverage indicator
    summary: string; // Human-readable summary
    controlNumber: string; // Unique transaction ID
    eligibilitySearchId?: string; // Stedi search ID for tracking
    subscriber?: {
      memberId: string;
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      planNumber?: string;
      groupNumber?: string;
    };
    benefits?: Benefit[]; // Detailed benefits information
    insuranceTypes?: string; // Types of insurance coverage
    errors?: StediError[]; // Any errors encountered
  };
}
```

**Example with Service Types:**

```typescript
import { ServiceTypeCode } from '@hike/sdk-stedi';

const result = await stedi.eligibility.check(patient, provider, {
  tradingPartner: 'CMS',
  encounterDate: '2024-12-01',
  serviceTypeCodes: [
    ServiceTypeCode.DME_PURCHASE, // Durable Medical Equipment
    ServiceTypeCode.ORTHOPEDIC // Orthopedic services
  ]
});
```

---

### MBI Lookup Client

Look up Medicare Beneficiary Identifiers.

#### `mbiLookup.lookup(request)`

**Parameters:**

```typescript
interface MbiLookupRequest {
  lastName: string; // Patient last name (required)
  dateOfBirth: string; // Format: YYYY-MM-DD (required)
  ssn: string; // Social Security Number (required)
  npi?: string; // Provider NPI (optional)
  organizationName?: string; // Provider organization name (optional)
}
```

**Response:**

```typescript
interface MbiLookupResult {
  response: {
    mbi?: string; // Medicare Beneficiary Identifier
    firstName?: string; // Patient first name
    lastName?: string; // Patient last name
    dateOfBirth: string; // Patient date of birth
    controlNumber: string; // Unique transaction ID
    eligibilitySearchId?: string; // Stedi search ID
  };
}
```

---

### Payer Client

Search for payers and retrieve payer information.

#### `payer.fetchByName(name, options?)`

Search for a payer by name and return the first matching result.

**Parameters:**

```typescript
// Search by name
name: string; // Payer name (required)

// Optional search filters
interface PayerSearchOptions {
  eligibilityCheck?: 'SUPPORTED' | 'NOT_SUPPORTED' | 'ENROLLMENT_REQUIRED' | 'EITHER';
  claimStatus?: 'SUPPORTED' | 'NOT_SUPPORTED' | 'ENROLLMENT_REQUIRED' | 'EITHER';
  professionalClaimSubmission?: 'SUPPORTED' | 'NOT_SUPPORTED' | 'ENROLLMENT_REQUIRED' | 'EITHER';
  coverageTypes?: Array<'medical' | 'dental' | 'vision'>;
}
```

**Response:**

```typescript
interface Payer {
  id: string; // Same as primaryPayerId for convenience
  stediId: string; // Stedi's unique identifier for the payer
  displayName: string; // Payer display name
  primaryPayerId: string; // Primary payer ID
  avatarUrl?: string; // Payer logo/avatar URL
  aliases?: string[]; // Alternative names/IDs
  address?: {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  coverageTypes?: Array<'medical' | 'dental' | 'vision'>;
  services?: {
    eligibilityCheck?: string;
    claimStatus?: string;
    professionalClaimSubmission?: string;
    enrollment?: object;
  };
}
```

**Example with Filters:**

```typescript
const payer = await stedi.payer.fetchByName('Blue Cross', {
  eligibilityCheck: 'SUPPORTED',
  coverageTypes: ['medical', 'dental']
});

console.log('Payer:', payer.displayName);
console.log('Services:', payer.services);
console.log('Avatar:', payer.avatarUrl);
```

#### `payer.fetchById(payerId)`

Get a payer by Stedi ID or primary payer ID.

**Parameters:**

```typescript
payerId: string; // Stedi ID (e.g., "KRPCH") or Payer ID (e.g., "00710")
```

**Response:**

Same as `fetchByName` response.

**Example:**

```typescript
// Using Stedi ID
const payerByStediId = await stedi.payer.fetchById('KRPCH');

// Using primary payer ID
const payerByPayerId = await stedi.payer.fetchById('00710');

console.log('Payer:', payerByStediId.displayName);
console.log('ID:', payerByStediId.id);
console.log('Primary ID:', payerByStediId.primaryPayerId);
```

---

## 🏥 Service Type Codes

The SDK includes all X12 005010 service type codes as constants:

```typescript
import { ServiceTypeCode } from '@hike/sdk-stedi';

// Common healthcare service types
ServiceTypeCode.MEDICAL_CARE; // '1'
ServiceTypeCode.DME_PURCHASE; // '12'
ServiceTypeCode.DME_RENTAL; // '18'
ServiceTypeCode.HEALTH_BENEFIT_PLAN; // '30'
ServiceTypeCode.ORTHOPEDIC; // 'BK'
ServiceTypeCode.PHYSICAL_THERAPY; // 'PT'
ServiceTypeCode.DURABLE_MEDICAL_EQUIPMENT; // 'DM'
```

[View all service type codes →](src/types/serviceTypes.ts)

For detailed descriptions and use cases, see the [Stedi STC documentation](https://www.stedi.com/docs/healthcare/eligibility-stc-procedure-codes).

---

## 🚨 Error Handling

The SDK provides comprehensive error handling with actionable resolution steps.

### Error Structure

```typescript
interface HikeError {
  message: string;
  errorCode: string; // Error code from payer
  statusCode?: number; // HTTP status code
  data?: any; // Additional error details
}
```

### Common Error Codes

| Code | Error                | Retryable | Description                                  |
| ---- | -------------------- | --------- | -------------------------------------------- |
| `42` | Unable to Respond    | ✓         | Payer system temporarily unavailable         |
| `43` | Invalid Provider ID  | ✗         | Provider NPI not registered with payer       |
| `67` | Patient Not Found    | ✗         | Patient record not found in payer system     |
| `72` | Invalid Member ID    | ✗         | Member ID format incorrect or not found      |
| `73` | Invalid Name         | ✗         | Patient name doesn't match payer records     |
| `75` | Subscriber Not Found | ✗         | Subscriber not found (check coverage status) |
| `80` | No Response          | ✓         | Payer connection timeout                     |

### Error Handling Example

```typescript
import { fromStediError, getErrorInfo, formatErrorForDisplay } from '@hike/sdk-stedi';

try {
  const result = await stedi.eligibility.check(patient, provider);
} catch (error) {
  // Error is automatically formatted with resolution steps
  const hikeError = fromStediError(error);

  console.error('Error:', hikeError.message);
  console.error('Code:', hikeError.errorCode);

  // Get detailed error information
  if (hikeError.data?.errors) {
    hikeError.data.errors.forEach((err: any) => {
      const errorInfo = formatErrorForDisplay(err);

      console.log('Title:', errorInfo.title);
      console.log('Description:', errorInfo.description);
      console.log('Retryable:', errorInfo.retryable);
      console.log('Resolutions:');
      errorInfo.resolutions.forEach((resolution: string) => {
        console.log('  -', resolution);
      });
    });
  }
}
```

### Retry Strategy

The SDK automatically retries transient failures (5xx errors, network issues):

- **Max Retries:** 3
- **Strategy:** Exponential backoff (1s, 2s, 4s)
- **Max Delay:** 10 seconds

For payer connectivity errors (code `42`, `80`), implement custom retry logic:

```typescript
const retryWithBackoff = async (maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await stedi.eligibility.check(patient, provider);
    } catch (error) {
      const hikeError = fromStediError(error);
      const errorInfo = getErrorInfo(hikeError.errorCode);

      if (!errorInfo.retryable || i === maxRetries - 1) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
};
```

---

## 🔧 Advanced Usage

### Custom Logger

Implement custom logging for debugging and monitoring:

```typescript
import { Logger } from '@hike/sdk';

const customLogger: Logger = {
  log: (message: string, data?: any) => {
    console.log(`[Stedi] ${message}`, data);
  },
  error: (message: string, data?: any) => {
    console.error(`[Stedi ERROR] ${message}`, data);
  },
  debug: (message: string, data?: any) => {
    if (process.env.DEBUG) {
      console.debug(`[Stedi DEBUG] ${message}`, data);
    }
  }
};

const stedi = new StediClient({
  apiKey: process.env.STEDI_API_KEY!,
  logger: customLogger
});
```

### Trading Partners

Stedi supports multiple trading partners (payers). Common examples:

```typescript
// Medicare
await stedi.eligibility.check(patient, provider, {
  tradingPartner: 'CMS'
});

// Commercial payers
await stedi.eligibility.check(patient, provider, {
  tradingPartner: 'CIGNA'
});

await stedi.eligibility.check(patient, provider, {
  tradingPartner: 'AETNA'
});
```

For a complete list of trading partners, see the [Stedi documentation](https://www.stedi.com/docs/healthcare/eligibility-overview).

### Batch Processing

Process multiple eligibility checks efficiently:

```typescript
const patients = [
  { lastName: 'Smith', memberId: '123456789A' },
  { lastName: 'Johnson', memberId: '987654321B' }
  // ... more patients
];

const results = await Promise.allSettled(patients.map((patient) => stedi.eligibility.check(patient, provider)));

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`Patient ${index + 1}: Eligible`);
  } else {
    console.log(`Patient ${index + 1}: Error -`, result.reason.message);
  }
});
```

---

## 🧪 Testing

The SDK is designed to be easily testable. Mock the `StediClient` in your tests:

```typescript
// Using Jest
jest.mock('@hike/sdk-stedi', () => ({
  StediClient: jest.fn().mockImplementation(() => ({
    eligibility: {
      check: jest.fn().mockResolvedValue({
        response: {
          isEligible: true,
          hasActiveCoverage: true,
          summary: 'Patient has active coverage'
        }
      })
    }
  }))
}));
```

---

## 📚 Resources

- [Stedi Healthcare API Documentation](https://www.stedi.com/docs/healthcare)
- [Eligibility API Reference](https://www.stedi.com/docs/healthcare/eligibility-overview)
- [Service Type Codes](https://www.stedi.com/docs/healthcare/eligibility-stc-procedure-codes)
- [Error Troubleshooting Guide](https://www.stedi.com/docs/healthcare/eligibility-troubleshooting)
- [X12 EDI Standards](https://www.stedi.com/edi/x12)

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository** and create a feature branch
2. **Follow the coding standards**: Run ESLint and Prettier before committing
3. **Write tests** for complex logic (healthcare-critical code)
4. **Update documentation** for API changes
5. **Submit a PR** with a clear description of changes

### Development Setup

```bash
# Install dependencies
pnpm install

# Build the SDK
pnpm build

# Run linter
pnpm lint

# Format code
pnpm format
```

### Branch Naming Convention

```
codex/{short-description}
```

Example: `codex/add-batch-eligibility`

---

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE.txt).

---

## 🙏 Acknowledgments

Built with ❤️ by the Hike Medical team. Special thanks to [Stedi](https://www.stedi.com/) for their comprehensive healthcare API and excellent documentation.

---

## 💬 Support

- **Email:** support@hikemedical.com
- **Documentation:** [Hike SDK Docs](../../README.md)
- **Issues:** Report bugs or request features via GitHub Issues

---

## 🔐 Security

**Never commit your Stedi API key to version control.** Always use environment variables:

```bash
# .env
STEDI_API_KEY=your_api_key_here
```

For production deployments, use secure secret management services (AWS Secrets Manager, HashiCorp Vault, etc.).

---

Made with 🏥 for better healthcare technology.
