# Database Integration Example

This example demonstrates how to integrate the **`@gfg-backend/database`** package into a project alongside other toolkit modules:

- **`@gfg-backend/database`**: Connects to the database and provides the database adapter for queries.
- **`@gfg-backend/config`**: Supplies configuration parameters for database connection strings and credentials.
- **`@gfg-backend/logger`**: Logs database transactions and queries.
- **`@gfg-backend/errors`**: Standardizes error handling (such as `DatabaseError` and `NotFoundError`).

## Structure

```text
database/
├── package.json
├── tsconfig.json
├── README.md
└── src/
    └── index.ts      # PostRepository implementation and CRUD usage example
```

## Running the Example

Run the sample script using `tsx` or `npm`:

```bash
# From this directory:
npm start

# Or using tsx directly from project root:
npx tsx examples/database/src/index.ts
```
