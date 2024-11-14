/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:Q1jqbABvM4fh@ep-cold-darkness-a5y3zg3a.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
 };
