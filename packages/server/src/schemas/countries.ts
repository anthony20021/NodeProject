import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const countries = pgTable('countries', {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    name: varchar('name').notNull(),                                 
    capital: varchar('capital').notNull(), 
    languagesSpoken: varchar('languages_spoken'),  
    continent: varchar('continent').notNull()        
})