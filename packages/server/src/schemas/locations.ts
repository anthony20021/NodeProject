import { pgTable, uuid, boolean, integer, varchar } from "drizzle-orm/pg-core";
import { countries } from "./";

export const locations = pgTable('locations', {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    name: varchar('name').notNull(),
    freeEntry: boolean('content').notNull(),                                
    price: integer('author_id').notNull(),   
    type: varchar('type').notNull(),      
    photoName: varchar('photo_name'),   
    photoType: varchar('photo_type'), 
    countryId: uuid('country_id').notNull().references(() => countries.id, { onDelete: "cascade" }),         
})