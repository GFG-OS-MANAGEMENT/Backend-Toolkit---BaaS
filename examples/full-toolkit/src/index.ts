import { pathToFileURL } from "node:url";
import { loadConfig, type AppConfig } from "@gfg-backend/config";
import { authenticate } from "@gfg-backend/auth";
import { connectDatabase, type DatabaseConfig, type DatabaseAdapter } from "@gfg-backend/database";
import { BaseError, ValidationError } from "@gfg-backend/errors";
import { createLogger, type Logger } from "@gfg-backend/logger";
import { validate } from "@gfg-backend/validation";

/**
 * Full Toolkit Integration Service
 * Demonstrates combining configuration, validation, authentication,
 * database access, logging, and unified error handling across @gfg-backend/* packages.
 */

export interface CreateUserInput {
  email: string;
  name: string;
}

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export class UserService {
  private config: AppConfig;
  private db: DatabaseAdapter;
  private logger: Logger;
  // Simulated store used while @gfg-backend/database CRUD utilities are in development
  private simulatedStore: Map<string, UserRecord> = new Map();

  constructor(customConfig?: AppConfig) {
    // 1. Configuration: Load application configuration
    this.config = customConfig ?? loadConfig();

    // 2. Logger: Initialize application logger
    try {
      this.logger = createLogger();
    } catch {
      // Logger package is currently a skeleton in early development
      this.logger = {} as Logger;
    }

    // 3. Database: Initialize database connection adapter
    try {
      const dbConfig = this.config as unknown as DatabaseConfig;
      this.db = connectDatabase(dbConfig);
    } catch {
      // Database package is currently a skeleton in early development
      this.db = {} as DatabaseAdapter;
    }
  }

  /**
   * Register a new user workflow demonstrating toolkit packages working together.
   */
  async registerUser(rawInput: unknown): Promise<{ success: boolean; data?: UserRecord; error?: string }> {
    try {
      // 4. Validation: Verify payload structure using @gfg-backend/validation
      const validationResult = validate(rawInput);
      if (!validationResult.valid || !rawInput || typeof rawInput !== "object") {
        throw new ValidationError("Invalid registration payload: expected a valid user object");
      }

      const input = rawInput as CreateUserInput;
      if (!input.email || !input.name) {
        throw new ValidationError("Validation failed: email and name are required");
      }

      // 5. Authentication: Check credentials / access policy
      // Note: authenticate() is currently a parameterless stub in @gfg-backend/auth.
      // In production, this will enforce token/session validation or user credentials.
      authenticate();

      // 6. Database: Store the user entity via the database adapter
      // (Note: Currently simulated until @gfg-backend/database CRUD operations are implemented)
      const user: UserRecord = {
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        email: input.email,
        name: input.name,
        createdAt: new Date().toISOString(),
      };
      this.simulatedStore.set(user.id, user);

      // 7. Logging: Log successful operation
      console.log(`[INFO] Successfully registered user: ${user.id} (${user.email})`);

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      if (error instanceof BaseError) {
        console.error(`[WARN] Handled application error [${error.name}]: ${error.message}`);
        return {
          success: false,
          error: error.message,
        };
      }

      console.error(`[ERROR] Unexpected error during user registration:`, error);
      throw new BaseError("Unable to register user");
    }
  }

  getSimulatedStore(): Map<string, UserRecord> {
    return this.simulatedStore;
  }

  getDatabaseAdapter(): DatabaseAdapter {
    return this.db;
  }

  getLogger(): Logger {
    return this.logger;
  }
}

// Entrypoint execution
async function main() {
  console.log("=== Running Backend Toolkit - Full Toolkit Integration Example ===");
  const userService = new UserService();

  console.log("\n1. Testing with valid registration data:");
  const validResult = await userService.registerUser({
    email: "developer@example.com",
    name: "Open Source Contributor",
  });
  console.log("Response:", JSON.stringify(validResult, null, 2));

  console.log("\n2. Testing with invalid registration data (empty object):");
  const invalidResult = await userService.registerUser({});
  console.log("Response:", JSON.stringify(invalidResult, null, 2));
}

// Portable main check across Windows and POSIX platforms
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch(console.error);
}
