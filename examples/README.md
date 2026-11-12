# Examples

This directory contains example projects demonstrating how Backend Toolkit - BaaS packages can be used.

## Planned Examples

### Basic Backend

TODO:
Create a basic backend example using the toolkit.

### Authentication

TODO:
Create an example demonstrating the authentication package.

### Database

TODO:
Create an example demonstrating database integration.

### Full Toolkit

A complete standalone example project is available in the [`full-toolkit`](./full-toolkit) directory.

It shows how an application combines configuration, validation, authentication, database access, logging, and shared error handling in one cohesive workflow:

1. **Config**: Load application and database configurations with `@gfg-backend/config`.
2. **Validation**: Validate incoming registration payloads using `@gfg-backend/validation`.
3. **Authentication**: Enforce security and authentication policies via `@gfg-backend/auth`.
4. **Database**: Store user records with `@gfg-backend/database`.
5. **Logger**: Log operations and failures using `@gfg-backend/logger`.
6. **Errors**: Handle domain errors and serialize responses using `@gfg-backend/errors`.

```ts
import { loadConfig } from "@gfg-backend/config";
import { authenticate } from "@gfg-backend/auth";
import { connectDatabase } from "@gfg-backend/database";
import { BaseError, ValidationError, serializeError } from "@gfg-backend/errors";
import { createLogger } from "@gfg-backend/logger";
import { validate } from "@gfg-backend/validation";

const config = loadConfig();
const db = connectDatabase(config);
const logger = createLogger();

async function registerUser(input: unknown) {
  try {
    const result = validate(input);
    if (!result.valid) {
      throw new ValidationError(result.errors.join(", "));
    }

    // Protect this operation according to the application's auth policy
    authenticate();

    const user = await db.users.create(input);
    logger.info("User registered", { userId: user.id });
    return user;
  } catch (error) {
    if (error instanceof BaseError) throw error;

    logger.error("User registration failed", { error });
    throw new BaseError("Unable to register user");
  }
}
```

For the complete standalone runnable project files, directory structure, and instructions, see [`examples/full-toolkit`](./full-toolkit/README.md).
