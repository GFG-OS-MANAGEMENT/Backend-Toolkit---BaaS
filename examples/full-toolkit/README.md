# Full Toolkit Example

This example demonstrates how to integrate multiple **Backend Toolkit - BaaS** packages into a cohesive backend service:

- **`@gfg-backend/config`**: Loads application configuration.
- **`@gfg-backend/validation`**: Validates request input data.
- **`@gfg-backend/auth`**: Enforces security policies and identity verification.
- **`@gfg-backend/database`**: Connects and manages data persistence via the database adapter.
- **`@gfg-backend/logger`**: Represents structured operational logging.
- **`@gfg-backend/errors`**: Standardizes error handling with custom application errors.

> **Note on Storage Implementation:**
> As `@gfg-backend/database` currently provides early scaffolding/stubs in the toolkit, database persistence in this example is demonstrated via simulated in-memory storage alongside the `DatabaseAdapter` connection interface.

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

1. **Install dependencies** from the repository root:
   ```bash
   npm install
   ```

2. **Run the example**:
   ```bash
   # From the project root:
   npx tsx examples/full-toolkit/src/index.ts

   # Or from this directory:
   npm start
   ```

3. **Typecheck**:
   ```bash
   npm run typecheck
   ```
