import { loadConfig } from "@gfg-backend/config";
import { authenticate } from "@gfg-backend/auth";
import { connectDatabase } from "@gfg-backend/database";
import { BaseError, ValidationError, serializeError } from "@gfg-backend/errors";
import { createLogger } from "@gfg-backend/logger";
import { validate } from "@gfg-backend/validation";

/**
 * Full Toolkit Integration Service
 * Demonstrates combining configuration, validation, authentication,
 * database access, logging, and unified error handling.
 */

export interface CreateUserInput {
  email: string;
  name: string;
  role?: string;
}

export class UserService {
  private config: ReturnType<typeof loadConfig>;
  private db: ReturnType<typeof connectDatabase> | null = null;
  private logger: ReturnType<typeof createLogger> | null = null;

  constructor() {
    // 1. Initialize configuration
    this.config = loadConfig();

    // 2. Initialize logger & database adapters safely
    try {
      this.logger = createLogger();
    } catch {
      // Logger package is currently a skeleton in early stages
    }

    try {
      this.db = connectDatabase(this.config);
    } catch {
      // Database package is currently a skeleton in early stages
    }
  }

  /**
   * Register a new user workflow demonstrating toolkit packages working together.
   */
  async registerUser(rawInput: unknown) {
    try {
      // 3. Validation
      const validationResult = validate(rawInput);
      if (!validationResult.valid) {
        throw new ValidationError("Invalid registration payload", validationResult.errors);
      }

      const input = rawInput as CreateUserInput;

      // 4. Authentication / Authorization check
      authenticate();

      // 5. Database operation (mock/actual adapter call)
      const user = {
        id: "usr_" + Date.now(),
        email: input.email,
        name: input.name,
        createdAt: new Date().toISOString(),
      };

      // 6. Logging
      if (this.logger && typeof (this.logger as any).info === "function") {
        (this.logger as any).info("User successfully registered", { userId: user.id });
      } else {
        console.log(`[LOG - info] User successfully registered: ${user.id}`);
      }

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      // 7. Standardized Error Handling
      if (this.logger && typeof (this.logger as any).error === "function") {
        (this.logger as any).error("Failed to register user", { error });
      } else {
        console.error(`[LOG - error] Failed to register user`, error);
      }

      return {
        success: false,
        error: serializeError(error),
      };
    }
  }
}

// Entrypoint demo run
async function main() {
  console.log("=== Running Backend Toolkit - Full Toolkit Integration Example ===");
  const userService = new UserService();

  console.log("\n1. Testing with valid registration data:");
  const validResult = await userService.registerUser({
    email: "developer@example.com",
    name: "Open Source Contributor",
  });
  console.log("Response:", JSON.stringify(validResult, null, 2));

  console.log("\n2. Testing with invalid registration data:");
  const invalidResult = await userService.registerUser(null);
  console.log("Response:", JSON.stringify(invalidResult, null, 2));
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  main().catch(console.error);
}
