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

This example shows how an API could combine configuration, validation,
authentication, database access, logging, and shared error handling in one
request. It uses a user registration endpoint as the example:

1. Load the application's database configuration.
2. Validate the incoming registration data and return a validation error if it
   is invalid.
3. Authenticate the request before accessing protected resources.
4. Save the new user with the database package.
5. Log successful creation and convert unexpected failures to a shared error
   response.

The packages currently contain API scaffolding, and several functions are not
implemented yet. The following is an integration sketch showing the intended
responsibilities; it is not executable against the current package versions.

```ts
import { loadConfig } from "@gfg-backend/config";
import { authenticate } from "@gfg-backend/auth";
import { connectDatabase } from "@gfg-backend/database";
import { BaseError, ValidationError } from "@gfg-backend/errors";
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

    // Protect this operation according to the application's auth policy.
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

In a complete application, the database adapter and logger methods would be
provided by their respective packages, and authentication would enforce the
endpoint's access policy. See each package directory for its current API and
implementation status.
