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

A standalone example project is available in the [`database`](./database) directory.

It shows how an application connects to a database and runs CRUD operations using `@gfg-backend/database`, accompanied by `@gfg-backend/config`, `@gfg-backend/logger`, and `@gfg-backend/errors`:

1. **Configuration**: Load connection credentials using `@gfg-backend/config`.
2. **Connection**: Establish the database connection via `connectDatabase`.
3. **CRUD Operations**: Execute create, read, update, and delete operations on records.
4. **Error Handling**: Handle database operation failures and not-found records gracefully.

```ts
import { loadConfig } from "@gfg-backend/config";
import { connectDatabase } from "@gfg-backend/database";
import { BaseError } from "@gfg-backend/errors";
import { createLogger } from "@gfg-backend/logger";

const config = loadConfig();
const db = connectDatabase(config);
const logger = createLogger();

async function getPost(id: string) {
  try {
    // In a complete implementation, this invokes the database adapter:
    // const post = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    return { id, title: "Sample Post" };
  } catch (error) {
    if (error instanceof BaseError) throw error;
    throw new BaseError("Database query failed");
  }
}
```

For the standalone runnable project files and detailed setup instructions, see [`examples/database`](./database/README.md).

### Full Toolkit

TODO:
Create an example using multiple Backend Toolkit packages together.
