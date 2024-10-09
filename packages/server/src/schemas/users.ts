import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    name: varchar('name'),
    firstname: varchar('firstname'),
    email: varchar('email').unique().notNull(),
    password: varchar('password').notNull(),
    role: varchar('role').notNull(),  
});