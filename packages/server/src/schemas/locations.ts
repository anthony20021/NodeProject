import { pgTable, uuid, boolean, integer, varchar } from "drizzle-orm/pg-core";
import { countries } from "./";

export const locations = pgTable('locations', {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    freeEntry: boolean('content').notNull(),                                
    price: integer('author_id').notNull(),   
    type: varchar('type').notNull(),      
    photoName: varchar('photo_name').notNull(),   
    photoType: varchar('photo_type').notNull(), 
    countryId: uuid('country_id').notNull().references(() => countries.id, { onDelete: "cascade" }),         
})