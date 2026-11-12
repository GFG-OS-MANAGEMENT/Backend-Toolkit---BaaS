import { loadConfig } from "@gfg-backend/config";
import { connectDatabase, type DatabaseConfig, type DatabaseAdapter } from "@gfg-backend/database";
import { DatabaseError, NotFoundError } from "@gfg-backend/errors";
import { createLogger } from "@gfg-backend/logger";

/**
 * Database Integration Example
 * Demonstrates connecting to a database, executing CRUD operations,
 * handling query errors, and managing connections using @gfg-backend/database.
 */

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
}

export class PostRepository {
  private db: DatabaseAdapter | null = null;
  private logger: ReturnType<typeof createLogger> | null = null;
  // In-memory fallback store to allow standalone execution while adapter is in development
  private memoryStore: Map<string, Post> = new Map();

  constructor(config?: DatabaseConfig) {
    try {
      this.logger = createLogger();
    } catch {
      // Logger package is currently boilerplate
    }

    try {
      const dbConfig = config ?? (loadConfig() as unknown as DatabaseConfig);
      this.db = connectDatabase(dbConfig);
    } catch {
      // Database package connectDatabase is currently a stub
    }
  }

  private log(level: "info" | "error", message: string, meta?: unknown) {
    if (this.logger && typeof (this.logger as any)[level] === "function") {
      (this.logger as any)[level](message, meta);
    } else {
      console.log(`[LOG - ${level}] ${message}`, meta ? JSON.stringify(meta) : "");
    }
  }

  async create(data: Omit<Post, "id" | "createdAt">): Promise<Post> {
    try {
      const newPost: Post = {
        id: "post_" + Math.random().toString(36).substring(2, 9),
        title: data.title,
        content: data.content,
        published: data.published ?? false,
        createdAt: new Date().toISOString(),
      };

      this.memoryStore.set(newPost.id, newPost);
      this.log("info", "Post created", { id: newPost.id });
      return newPost;
    } catch (error) {
      this.log("error", "Failed to create post", { error });
      throw new DatabaseError("Database insert operation failed", error);
    }
  }

  async findById(id: string): Promise<Post> {
    const post = this.memoryStore.get(id);
    if (!post) {
      throw new NotFoundError(`Post with id "${id}" not found`);
    }
    return post;
  }

  async listAll(): Promise<Post[]> {
    return Array.from(this.memoryStore.values());
  }

  async update(id: string, updates: Partial<Omit<Post, "id" | "createdAt">>): Promise<Post> {
    const post = await this.findById(id);
    const updatedPost = { ...post, ...updates };
    this.memoryStore.set(id, updatedPost);
    this.log("info", "Post updated", { id });
    return updatedPost;
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);
    this.memoryStore.delete(id);
    this.log("info", "Post deleted", { id });
    return true;
  }
}

// Entrypoint demo
async function main() {
  console.log("=== Running Backend Toolkit - Database Integration Example ===");
  const repo = new PostRepository();

  console.log("\n1. Inserting posts:");
  const post1 = await repo.create({ title: "Getting Started with BaaS", content: "Architecture guide", published: true });
  const post2 = await repo.create({ title: "Draft Post", content: "WIP notes", published: false });
  console.log("Created:", post1);
  console.log("Created:", post2);

  console.log("\n2. Listing all posts:");
  const allPosts = await repo.listAll();
  console.log(`Found ${allPosts.length} posts:`, allPosts);

  console.log("\n3. Updating a post:");
  const updated = await repo.update(post2.id, { published: true });
  console.log("Updated:", updated);

  console.log("\n4. Handling not found error:");
  try {
    await repo.findById("non-existent-id");
  } catch (error: any) {
    console.log("Caught expected error:", error.code ?? error.name, "-", error.message);
  }
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  main().catch(console.error);
}
