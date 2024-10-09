import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { users, rooms } from "./";

export const messages = pgTable('messages', {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    content: text('content').notNull(),
    authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: "cascade" }),
    roomId: uuid('room_id').notNull().references(() => rooms.id, { onDelete: "cascade" }),
    createdAt: timestamp('created_at').notNull().defaultNow() 
});