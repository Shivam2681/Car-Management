import {
    pgTable,
    serial,
    text,
    varchar,
    timestamp,
    json,
  } from "drizzle-orm/pg-core";
  
  export const CarModel = pgTable('carModel', {
    id: serial('id').primaryKey(),
    modelName: varchar('modelName').notNull(),
    carName: varchar('carName').notNull(),
    description: text('description').notNull(),
    tags: text('tags').notNull(),
    images: json('images').notNull(),  // Store images as base64 strings in JSON
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  });