# Full Toolkit Example

This example demonstrates how to integrate multiple **Backend Toolkit - BaaS** packages into a cohesive backend service:

- **`@gfg-backend/config`**: Loads application configuration.
- **`@gfg-backend/validation`**: Validates request input data and provides schema/field-level errors.
- **`@gfg-backend/auth`**: Enforces access policy and identity verification.
- **`@gfg-backend/database`**: Connects and manages data persistence via the database adapter.
- **`@gfg-backend/logger`**: Provides structured logging across the application workflow.
- **`@gfg-backend/errors`**: Standardizes error handling and serializes API error responses.

## Structure

```text
full-toolkit/
├── package.json
├── tsconfig.json
├── README.md
└── src/
    └── index.ts      # Integrated user service and workflow implementation
```

## Running the Example

Run the sample script using `tsx` or `npm`:

```bash
# From this directory:
npm start

# Or using tsx directly from project root:
npx tsx examples/full-toolkit/src/index.ts
```
