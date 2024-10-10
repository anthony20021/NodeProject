import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { countries, locations } from "./";

export const accesses = pgTable('accesses', {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    locationId: uuid('location_id').notNull().references(() => locations.id, { onDelete: "cascade" }),    
    type: varchar('type').notNull(),                         
    countryId: uuid('country_id').notNull().references(() => countries.id, { onDelete: "cascade" }),         
});